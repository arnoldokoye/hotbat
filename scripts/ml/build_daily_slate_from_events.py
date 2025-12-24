#!/usr/bin/env python3
"""
Build a REAL deterministic daily slate from organized Retrosheet CSVs.

Why this exists
---------------
The HotBat baseline pipeline needs real per-game context:
  - game_date
  - park_id
  - opposing_pitcher_id (starting pitcher of opposing team)

This script consumes year-partitioned Retrosheet **daily logs** + **game logs** and materializes:
  scripts/ml/data/daily_slate.csv

Schema (STRICT)
---------------
player_id,game_date,park_id,opposing_pitcher_id

Input sources (authoritative)
-----------------------------
- Daily logs:
  - `{YEAR}batting.csv` (batter list + home/visitor context)
  - `{YEAR}gameinfo.csv` (starttime for deterministic tie-breaks)
- Game logs:
  - `gl{YEAR}.txt` (authoritative park_id + starting pitchers)

Identity rules (non-negotiable)
-------------------------------
  - Uses ONLY Retrosheet player_id (no names are inferred here).
  - Validates player_id and opposing_pitcher_id against canonical player_registry.csv.
  - Does NOT infer identity from display names.

Notes
-----
  - Output grain is one row per (player_id, game_date).
    If a player appears in multiple games on the same date (doubleheaders),
    rows are deterministically de-duplicated by earliest starttime (if available via gameinfo.csv),
    otherwise by lowest gid.
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Sequence, Set, Tuple


DEFAULT_DAILY_LOGS_DIR = Path("data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS")
DEFAULT_GAMELOGS_DIR = Path("data_sources/NEW_DATA_SETS/2020-25 GAMELOGS")
DEFAULT_PLAYER_REGISTRY = Path("scripts/ml/data/player_registry.csv")
DEFAULT_LABELS_FOR_SEASONS = Path("scripts/ml/data/processed/pa_labels.csv")
DEFAULT_OUT = Path("scripts/ml/data/daily_slate.csv")


def is_valid_date(date_str: str) -> bool:
  d = (date_str or "").strip()
  return len(d) == 10 and d[4] == "-" and d[7] == "-" and d[0:4].isdigit() and d[5:7].isdigit() and d[8:10].isdigit()


def parse_yyyymmdd(value: str) -> str:
  v = (value or "").strip()
  if len(v) == 8 and v.isdigit():
    return f"{v[0:4]}-{v[4:6]}-{v[6:8]}"
  return v


STARTTIME_RE = re.compile(r"^(\d{1,2}):(\d{2})(AM|PM)$", re.IGNORECASE)


def parse_starttime_minutes(value: str) -> Optional[int]:
  v = (value or "").strip().upper()
  m = STARTTIME_RE.match(v)
  if not m:
    return None
  hour = int(m.group(1))
  minute = int(m.group(2))
  ampm = m.group(3)
  if hour == 12:
    hour = 0
  if ampm == "PM":
    hour += 12
  return hour * 60 + minute


def read_player_registry_ids(path: Path) -> Set[str]:
  if not path.exists():
    raise FileNotFoundError(f"Player registry not found: {path}")
  ids: Set[str] = set()
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    if not reader.fieldnames:
      raise RuntimeError(f"Player registry has no header: {path}")
    if "player_id" not in reader.fieldnames:
      raise RuntimeError(f"Player registry missing player_id column: {path}")
    for row in reader:
      pid = (row.get("player_id") or "").strip()
      if pid:
        ids.add(pid)
  if not ids:
    raise RuntimeError(f"Player registry is empty: {path}")
  return ids


def infer_seasons_from_labels(path: Path) -> Set[int]:
  if not path.exists():
    return set()
  seasons: Set[int] = set()
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    for row in reader:
      season_str = (row.get("season") or "").strip()
      if season_str.isdigit():
        seasons.add(int(season_str))
        continue
      date_str = (row.get("game_date") or row.get("date") or "").strip()
      if len(date_str) >= 4 and date_str[0:4].isdigit():
        seasons.add(int(date_str[0:4]))
  return seasons


def to_int(value: str) -> Optional[int]:
  v = (value or "").strip()
  if not v:
    return None
  try:
    return int(v)
  except ValueError:
    return None


@dataclass
class GameLogMeta:
  gid: str
  game_date_yyyymmdd: str
  game_number: str
  visiting_team_id: str
  home_team_id: str
  park_id: str
  visiting_starting_pitcher_id: str
  home_starting_pitcher_id: str


@dataclass(frozen=True)
class CandidateSlateRow:
  player_id: str
  game_date: str
  park_id: str
  opposing_pitcher_id: str
  game_id: str
  starttime_sort: int  # unknown -> large number


def parse_gamelogs(gl_path: Path, player_ids: Set[str]) -> Dict[str, GameLogMeta]:
  if not gl_path.exists():
    raise FileNotFoundError(f"Game logs not found: {gl_path}")

  # Retrosheet game logs: 161 fields, no header.
  # We rely on the standard field indices:
  #  1   date (idx 0)                         yyyymmdd
  #  2   game number (idx 1)                  0/1/2/3/A/B...
  #  4   visiting team id (idx 3)
  #  7   home team id (idx 6)
  # 17   park_id (idx 16)
  # 102  visiting starting pitcher ID (idx 101), name (idx 102)
  # 104  home starting pitcher ID (idx 103), name (idx 104)
  #
  # This mapping is validated implicitly because we require the extracted pitcher IDs to exist
  # in player_registry.csv; if we accidentally read the name fields, validation fails loudly.
  out: Dict[str, GameLogMeta] = {}
  seen_game_keys: Set[Tuple[str, str, str, str]] = set()
  with gl_path.open(newline="", encoding="utf-8", errors="replace") as fh:
    reader = csv.reader(fh)
    for row in reader:
      if not row:
        continue
      if len(row) != 161:
        raise RuntimeError(f"{gl_path}: expected 161 fields per row; got {len(row)}")
      date_raw = (row[0] or "").strip()
      game_num = (row[1] or "").strip()
      visiting_team = (row[3] or "").strip()
      home_team = (row[6] or "").strip()
      park_id = (row[16] or "").strip()
      visiting_sp = (row[101] or "").strip()
      visiting_sp_name = (row[102] or "").strip()
      home_sp = (row[103] or "").strip()
      home_sp_name = (row[104] or "").strip()

      if not date_raw or not date_raw.isdigit() or len(date_raw) != 8:
        raise RuntimeError(f"{gl_path}: invalid date field in row: {row[0]!r}")
      if not visiting_team:
        raise RuntimeError(f"{gl_path}: missing visiting team in row for date={date_raw}")
      if not home_team:
        raise RuntimeError(f"{gl_path}: missing home team in row for date={date_raw}")
      if not game_num:
        raise RuntimeError(f"{gl_path}: missing game number in row for date={date_raw}, home={home_team}")
      if not park_id:
        raise RuntimeError(f"{gl_path}: missing park_id in row for date={date_raw}, home={home_team}, num={game_num}")
      if not visiting_sp or not home_sp:
        raise RuntimeError(f"{gl_path}: missing starting pitcher(s) for date={date_raw}, home={home_team}, num={game_num}")
      if visiting_sp not in player_ids:
        raise RuntimeError(f"{gl_path}: visiting starting pitcher not in registry: {visiting_sp}")
      if home_sp not in player_ids:
        raise RuntimeError(f"{gl_path}: home starting pitcher not in registry: {home_sp}")

      # Sanity: the name fields should not look like IDs.
      if visiting_sp_name in player_ids or home_sp_name in player_ids:
        raise RuntimeError(f"{gl_path}: unexpected starting pitcher field mapping for date={date_raw}, home={home_team}, num={game_num}")

      game_key = (date_raw, home_team, visiting_team, game_num)
      if game_key in seen_game_keys:
        raise RuntimeError(f"{gl_path}: duplicate (date,home,away,number) game key: {game_key}")
      seen_game_keys.add(game_key)

      gid = f"{home_team}{date_raw}{game_num}"
      meta = GameLogMeta(
        gid=gid,
        game_date_yyyymmdd=date_raw,
        game_number=game_num,
        visiting_team_id=visiting_team,
        home_team_id=home_team,
        park_id=park_id,
        visiting_starting_pitcher_id=visiting_sp,
        home_starting_pitcher_id=home_sp,
      )
      if gid in out:
        existing = out[gid]
        if (
          existing.park_id != meta.park_id
          or existing.visiting_starting_pitcher_id != meta.visiting_starting_pitcher_id
          or existing.home_starting_pitcher_id != meta.home_starting_pitcher_id
        ):
          raise RuntimeError(f"{gl_path}: duplicate gid with conflicting metadata: {gid}")
        continue
      out[gid] = meta
  if not out:
    raise RuntimeError(f"{gl_path}: parsed 0 games")
  return out


def parse_gameinfo_starttimes(path: Path) -> Dict[str, int]:
  if not path.exists():
    return {}
  out: Dict[str, int] = {}
  with path.open(newline="", encoding="utf-8", errors="replace") as fh:
    reader = csv.DictReader(fh)
    for row in reader:
      gid = (row.get("gid") or "").strip()
      if not gid:
        continue
      starttime = parse_starttime_minutes(row.get("starttime") or "")
      if starttime is None:
        continue
      # Keep the earliest starttime if duplicates exist.
      out[gid] = min(out.get(gid, 10_000), starttime)
  return out


def build_candidates_from_batting(
  batting_path: Path,
  gamelog_by_gid: Dict[str, GameLogMeta],
  starttime_by_gid: Dict[str, int],
  player_ids: Set[str],
) -> Tuple[int, List[CandidateSlateRow]]:
  if not batting_path.exists():
    raise FileNotFoundError(f"Batting daily log not found: {batting_path}")

  rows_seen = 0
  candidates: List[CandidateSlateRow] = []
  seen_player_gid: Dict[Tuple[str, str], Tuple[str, str]] = {}

  with batting_path.open(newline="", encoding="utf-8", errors="replace") as fh:
    reader = csv.DictReader(fh)
    for row in reader:
      rows_seen += 1
      stattype = (row.get("stattype") or "").strip().lower()
      if stattype and stattype != "value":
        continue

      # Game logs glYYYY.txt in this repo cover regular season games; daily logs may include
      # postseason/exhibition rows. Avoid hard failures by filtering here deterministically.
      gametype = (row.get("gametype") or "").strip().lower()
      if gametype and gametype != "regular":
        continue

      # We want "appeared", not "had an HR": batting.csv provides one row per batter-game.
      # Requiring b_pa > 0 includes pinch hitters and any batter who recorded a plate appearance.
      b_pa = to_int(row.get("b_pa") or "")
      if not b_pa or b_pa <= 0:
        continue

      gid = (row.get("gid") or "").strip()
      player_id = (row.get("id") or "").strip()
      date_raw = (row.get("date") or "").strip()
      vishome = (row.get("vishome") or "").strip().lower()
      team_id = (row.get("team") or "").strip()
      opp_id = (row.get("opp") or "").strip()

      if not gid or not player_id:
        continue

      game_date = parse_yyyymmdd(date_raw)
      if not is_valid_date(game_date):
        raise RuntimeError(f"{batting_path}: invalid date for gid={gid}, player_id={player_id}: {date_raw!r}")

      meta = gamelog_by_gid.get(gid)
      if meta is None:
        raise RuntimeError(f"{batting_path}: gid not found in game logs: {gid}")

      # Verify we are matching the correct game (doubleheaders rely on the game number inside gid).
      if meta.game_date_yyyymmdd != date_raw:
        raise RuntimeError(f"{batting_path}: gid/date mismatch for gid={gid} (batting.date={date_raw}, gamelog.date={meta.game_date_yyyymmdd})")
      if vishome == "v":
        if team_id and team_id != meta.visiting_team_id:
          raise RuntimeError(f"{batting_path}: team mismatch for gid={gid}, player_id={player_id} (expected visiting={meta.visiting_team_id}, got {team_id})")
        if opp_id and opp_id != meta.home_team_id:
          raise RuntimeError(f"{batting_path}: opp mismatch for gid={gid}, player_id={player_id} (expected home={meta.home_team_id}, got {opp_id})")
      elif vishome == "h":
        if team_id and team_id != meta.home_team_id:
          raise RuntimeError(f"{batting_path}: team mismatch for gid={gid}, player_id={player_id} (expected home={meta.home_team_id}, got {team_id})")
        if opp_id and opp_id != meta.visiting_team_id:
          raise RuntimeError(f"{batting_path}: opp mismatch for gid={gid}, player_id={player_id} (expected visiting={meta.visiting_team_id}, got {opp_id})")

      if player_id not in player_ids:
        raise RuntimeError(f"{batting_path}: batter id not in registry: {player_id}")

      if vishome == "v":
        opposing_pitcher_id = meta.home_starting_pitcher_id
      elif vishome == "h":
        opposing_pitcher_id = meta.visiting_starting_pitcher_id
      else:
        raise RuntimeError(f"{batting_path}: invalid vishome={vishome!r} for gid={gid}, player_id={player_id}")

      if opposing_pitcher_id not in player_ids:
        raise RuntimeError(f"{batting_path}: opposing starting pitcher id not in registry: {opposing_pitcher_id}")

      starttime_sort = starttime_by_gid.get(gid, 10_000)

      # Deduplicate within the same game (batting.csv can contain multiple rows per player due to stattype/sequence).
      k = (player_id, gid)
      prev = seen_player_gid.get(k)
      if prev is not None:
        prev_date, prev_pitcher = prev
        if prev_date != game_date or prev_pitcher != opposing_pitcher_id:
          raise RuntimeError(f"{batting_path}: conflicting rows for player_id={player_id}, gid={gid}")
        continue
      seen_player_gid[k] = (game_date, opposing_pitcher_id)

      candidates.append(
        CandidateSlateRow(
          player_id=player_id,
          game_date=game_date,
          park_id=meta.park_id,
          opposing_pitcher_id=opposing_pitcher_id,
          game_id=gid,
          starttime_sort=starttime_sort,
        )
      )

  return rows_seen, candidates


def write_daily_slate_csv(path: Path, rows: Sequence[Dict[str, str]]) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(
      fh,
      fieldnames=["player_id", "game_date", "park_id", "opposing_pitcher_id"],
      lineterminator="\n",
    )
    writer.writeheader()
    writer.writerows(rows)


def main() -> int:
  parser = argparse.ArgumentParser(
    description="Build scripts/ml/data/daily_slate.csv from Retrosheet daily logs + game logs (no raw event parsing)."
  )
  parser.add_argument(
    "--daily-logs-dir",
    default=str(DEFAULT_DAILY_LOGS_DIR),
    help="Base directory containing {YEAR}DAILY_LOGScsvs folders.",
  )
  parser.add_argument(
    "--gamelogs-dir",
    default=str(DEFAULT_GAMELOGS_DIR),
    help="Directory containing Retrosheet game logs glYYYY.txt (authoritative park_id + starting pitchers).",
  )
  parser.add_argument(
    "--player-registry",
    default=str(DEFAULT_PLAYER_REGISTRY),
    help="Path to canonical player_registry.csv (used for ID validation only).",
  )
  parser.add_argument(
    "--seasons",
    default="",
    help="Optional comma-separated seasons to include (e.g. 2020,2021). If omitted, inferred from processed pa_labels.csv when present.",
  )
  parser.add_argument(
    "--labels-for-seasons",
    default=str(DEFAULT_LABELS_FOR_SEASONS),
    help="Path to processed pa_labels.csv used only to infer seasons when --seasons is not provided.",
  )
  parser.add_argument("--out", default=str(DEFAULT_OUT), help="Output CSV path (default: scripts/ml/data/daily_slate.csv).")
  args = parser.parse_args()

  registry_path = Path(args.player_registry)
  try:
    player_ids = read_player_registry_ids(registry_path)
  except Exception as e:
    print(f"ERROR: failed to load player registry: {e}", file=sys.stderr)
    return 1

  allowed_seasons: Optional[Set[int]] = None
  if args.seasons.strip():
    allowed_seasons = {int(s.strip()) for s in args.seasons.split(",") if s.strip().isdigit()}
  else:
    inferred = infer_seasons_from_labels(Path(args.labels_for_seasons))
    if inferred:
      allowed_seasons = inferred

  if not allowed_seasons:
    print("ERROR: no seasons selected. Provide --seasons or ensure pa_labels.csv exists for inference.", file=sys.stderr)
    return 1

  daily_logs_dir = Path(args.daily_logs_dir)
  gamelogs_dir = Path(args.gamelogs_dir)

  games_seen = 0
  candidates: List[CandidateSlateRow] = []
  batting_rows_seen = 0

  try:
    for season in sorted(allowed_seasons):
      gl_path = gamelogs_dir / f"gl{season}.txt"
      gameinfo_path = daily_logs_dir / f"{season}DAILY_LOGScsvs" / f"{season}gameinfo.csv"
      batting_path = daily_logs_dir / f"{season}DAILY_LOGScsvs" / f"{season}batting.csv"

      gamelog_by_gid = parse_gamelogs(gl_path, player_ids)
      starttime_by_gid = parse_gameinfo_starttimes(gameinfo_path)
      rows_seen, season_candidates = build_candidates_from_batting(batting_path, gamelog_by_gid, starttime_by_gid, player_ids)

      games_seen += len(gamelog_by_gid)
      batting_rows_seen += rows_seen
      candidates.extend(season_candidates)
  except Exception as e:
    print(f"ERROR: failed while building slate from daily logs: {e}", file=sys.stderr)
    return 1

  if not candidates:
    print("ERROR: parsed zero slate candidates (no batting rows with b_pa > 0).", file=sys.stderr)
    return 1

  # De-duplicate to one row per (player_id, game_date).
  by_key: Dict[Tuple[str, str], List[CandidateSlateRow]] = {}
  for c in candidates:
    by_key.setdefault((c.player_id, c.game_date), []).append(c)

  collisions = 0
  out_rows: List[Dict[str, str]] = []
  for (player_id, game_date), cand_list in by_key.items():
    if len(cand_list) > 1:
      collisions += 1
    chosen = sorted(
      cand_list,
      key=lambda x: (x.starttime_sort, x.game_id, x.park_id, x.opposing_pitcher_id),
    )[0]
    out_rows.append(
      {
        "player_id": player_id,
        "game_date": game_date,
        "park_id": chosen.park_id,
        "opposing_pitcher_id": chosen.opposing_pitcher_id,
      }
    )

  # Deterministic ordering.
  out_rows.sort(key=lambda r: (r["game_date"], r["player_id"]))

  # Validation.
  duplicates_count = len(out_rows) - len({(r["player_id"], r["game_date"]) for r in out_rows})
  null_player_id = sum(1 for r in out_rows if not r["player_id"])
  null_game_date = sum(1 for r in out_rows if not is_valid_date(r["game_date"]))
  null_park_id = sum(1 for r in out_rows if not r["park_id"])
  null_pitcher_id = sum(1 for r in out_rows if not r["opposing_pitcher_id"])

  dates = sorted({r["game_date"] for r in out_rows if is_valid_date(r["game_date"])})
  min_date = dates[0] if dates else ""
  max_date = dates[-1] if dates else ""

  players_per_date: Dict[str, int] = {}
  for r in out_rows:
    players_per_date[r["game_date"]] = players_per_date.get(r["game_date"], 0) + 1
  per_date_counts = list(players_per_date.values())
  min_players = min(per_date_counts) if per_date_counts else 0
  max_players = max(per_date_counts) if per_date_counts else 0
  avg_players = (sum(per_date_counts) / len(per_date_counts)) if per_date_counts else 0.0

  out_path = Path(args.out)
  write_daily_slate_csv(out_path, out_rows)

  print("Inputs:")
  print(f"  daily_logs_dir:    {daily_logs_dir}")
  print(f"  gamelogs_dir:      {gamelogs_dir}")
  print(f"  seasons_included:  {sorted(allowed_seasons)}")
  print(f"  player_registry:   {registry_path} (ids={len(player_ids)})")
  print("")
  print("Parsing:")
  print(f"  gamelog_games:     {games_seen}")
  print(f"  batting_rows_seen: {batting_rows_seen}")
  print(f"  candidate_rows:    {len(candidates)} (from batting rows with b_pa > 0)")
  print(f"  collisions_dropped:{collisions} (multi-game same-day player collisions)")
  print("")
  print("Output:")
  print(f"  {out_path} (rows={len(out_rows)}, date_range={min_date}..{max_date})")
  print(f"  players_per_date:  min={min_players}, avg={avg_players:.1f}, max={max_players}")
  print("")
  print("Validation:")
  print(f"  duplicates(player_id,game_date)={duplicates_count}")
  print(f"  null_player_id={null_player_id}, invalid_game_date={null_game_date}")
  print(f"  null_park_id={null_park_id}, null_opposing_pitcher_id={null_pitcher_id}")

  if duplicates_count or null_player_id or null_game_date or null_park_id:
    print("ERROR: validation failed.", file=sys.stderr)
    return 1
  if null_pitcher_id:
    print(
      "ERROR: missing opposing_pitcher_id for one or more rows. "
      "This should not happen with valid game logs.",
      file=sys.stderr,
    )
    return 1

  return 0


if __name__ == "__main__":
  raise SystemExit(main())
