#!/usr/bin/env python3
"""
Build deterministic PA-level events from Retrosheet organized CSVs.

Inputs:
  - Retrosheet daily logs `plays.csv` (year-partitioned)
  - Default glob: data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/*DAILY_LOGScsvs/*plays.csv

Backward compatibility:
  - Still supports older cwevent-derived CSV formats (headered or headerless) used earlier in the repo.

Outputs (under --out-dir):
  - raw/pa_events_raw.csv
  - processed/pa_events.csv
  - processed/pa_events_stats.json

Determinism:
  - same inputs → byte-identical processed CSV (stable sorting, stable column order, \\n line endings)
  - pa_id is deterministic: "{game_id}:{event_seq}" where event_seq is 1-based PA index per game.

No model training here.
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from dataclasses import dataclass
from glob import glob
from pathlib import Path
from typing import Dict, Iterable, Iterator, List, Optional, Sequence, Tuple

DEFAULT_INPUT_GLOB = "data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/*DAILY_LOGScsvs/*plays.csv"
DEFAULT_OUT_DIR = Path("scripts/ml/data")


def is_truthy(value: str) -> bool:
  return value.strip().upper() in {"1", "T", "Y", "YES", "TRUE"}


def parse_game_date_from_game_id(game_id: str) -> str:
  gid = game_id.strip()
  if len(gid) < 11:
    return ""
  date_part = gid[3:11]
  if len(date_part) != 8 or not date_part.isdigit():
    return ""
  return f"{date_part[0:4]}-{date_part[4:6]}-{date_part[6:8]}"


def parse_season(game_id: str, game_date: str) -> int:
  if game_date and len(game_date) >= 4 and game_date[0:4].isdigit():
    return int(game_date[0:4])
  gid = game_id.strip()
  if len(gid) >= 7 and gid[3:7].isdigit():
    return int(gid[3:7])
  return 0


def is_header_row(row: Sequence[str]) -> bool:
  return bool(row) and row[0].strip().upper() == "GAME_ID"


def is_plays_header_row(row: Sequence[str]) -> bool:
  # Daily logs plays.csv
  return bool(row) and row[0].strip().casefold() == "gid"


def _get_idx(row: Sequence[str], idx: int) -> str:
  return row[idx].strip() if idx < len(row) else ""


def _get_header(row: Sequence[str], header_map: Dict[str, int], keys: Sequence[str]) -> str:
  for k in keys:
    idx = header_map.get(k)
    if idx is not None and idx < len(row):
      val = row[idx].strip()
      if val != "":
        return val
  return ""


def _to_int_str(value: str) -> str:
  v = value.strip()
  if v == "":
    return ""
  try:
    return str(int(v))
  except ValueError:
    return ""


def _truthy(value: str) -> bool:
  return is_truthy(value) if value != "" else False


def derive_event_cd_from_plays_row(row: Sequence[str], header_map: Dict[str, int]) -> str:
  # Derive Retrosheet EVENT_CD using the daily logs `plays.csv` outcome flags.
  #
  # Mapping (validated against prior cwevent-derived outputs):
  #  23 HR, 22 3B, 21 2B, 20 1B, 15 IBB, 14 BB, 16 HBP, 3 K,
  #  18 ROE, 19 FC, 17 XI (catcher's interference), else 2 (generic out).
  def col(name: str) -> str:
    idx = header_map.get(name)
    return row[idx].strip() if idx is not None and idx < len(row) else ""

  if _truthy(col("hr")):
    return "23"
  if _truthy(col("triple")):
    return "22"
  if _truthy(col("double")):
    return "21"
  if _truthy(col("single")):
    return "20"
  if _truthy(col("iw")):
    return "15"
  if _truthy(col("walk")):
    return "14"
  if _truthy(col("hbp")):
    return "16"
  if _truthy(col("k")):
    return "3"
  if _truthy(col("roe")):
    return "18"
  if _truthy(col("fc")):
    return "19"
  if _truthy(col("xi")):
    return "17"
  return "2"


@dataclass(frozen=True)
class ParsedPaEvent:
  game_id: str
  game_date: str
  season: int
  event_seq: int
  pa_id: str
  bat_id: str
  pit_id: str
  bat_team_id: str
  pit_team_id: str
  ballpark_id: str
  pitcher_hand: str
  is_home: str
  pa_index_in_game: str
  event_cd: str
  inning: str
  outs: str
  bat_home: str
  event_tx: str
  source_file: str
  source_row: int


def iter_pa_events(paths: Sequence[Path]) -> Iterator[ParsedPaEvent]:
  seq_by_game: Dict[str, int] = {}

  for path in paths:
    with path.open(newline="", encoding="utf-8") as fh:
      reader = csv.reader(fh)
      first = next(reader, None)
      if first is None:
        continue

      if is_plays_header_row(first):
        header = [h.strip() for h in first]
        header_map = {h: i for i, h in enumerate(header) if h}
        yield from _iter_pa_events_for_plays_file(path, header_map, reader, seq_by_game)
        continue

      if is_header_row(first):
        header = [h.strip() for h in first]
        header_map = {h: i for i, h in enumerate(header) if h}
        yield from _iter_pa_events_for_file(path, header_map, None, reader, seq_by_game)
        continue

      yield from _iter_pa_events_for_file(path, None, first, reader, seq_by_game)


def _iter_pa_events_for_file(
  path: Path,
  header_map: Optional[Dict[str, int]],
  first_data_row: Optional[List[str]],
  reader: Iterable[List[str]],
  seq_by_game: Dict[str, int],
) -> Iterator[ParsedPaEvent]:
  def parse_row(row: Sequence[str]) -> Optional[Dict[str, str]]:
    if not row:
      return None

    if header_map is not None:
      game_id = _get_header(row, header_map, ["GAME_ID", "game_id"])
      if not game_id:
        return None

      bat_id = _get_header(row, header_map, ["BAT_ID", "bat_id", "batter_id"])
      pit_id = _get_header(row, header_map, ["PIT_ID", "pit_id", "pitcher_id"])
      away_team_id = _get_header(row, header_map, ["AWAY_TEAM_ID", "away_team_id"])
      inning = _to_int_str(_get_header(row, header_map, ["INN_CT", "inning", "inn_ct"]))
      outs = _to_int_str(_get_header(row, header_map, ["OUTS_CT", "outs_ct", "outs"]))
      bat_home = _to_int_str(_get_header(row, header_map, ["BAT_HOME_ID", "bat_home_id", "bat_home"]))
      event_cd = _to_int_str(_get_header(row, header_map, ["EVENT_CD", "event_cd"]))
      event_tx = _get_header(row, header_map, ["EVENT_TX", "event_tx", "event_text"]) or ""

      bat_event_fl = _get_header(row, header_map, ["BAT_EVENT_FL", "bat_event_fl"])
      pa_new_fl = _get_header(row, header_map, ["PA_NEW_FL", "pa_new_fl", "START_PA_FLAG", "start_pa_flag"])
      is_pa = is_truthy(bat_event_fl) if bat_event_fl != "" else (is_truthy(pa_new_fl) if pa_new_fl != "" else True)
      if not is_pa:
        return None

      home_team_id = game_id[:3] if len(game_id) >= 3 else ""
      bat_team_id, pit_team_id = derive_teams(home_team_id, away_team_id, bat_home)

      game_date = parse_game_date_from_game_id(game_id)
      season = parse_season(game_id, game_date)

      return {
        "game_id": game_id,
        "game_date": game_date,
        "season": str(season) if season else "",
        "bat_id": bat_id,
        "pit_id": pit_id,
        "bat_team_id": bat_team_id,
        "pit_team_id": pit_team_id,
        "ballpark_id": "",
        "pitcher_hand": "",
        "is_home": bat_home,
        "pa_index_in_game": "",
        "event_cd": event_cd,
        "inning": inning,
        "outs": outs,
        "bat_home": bat_home,
        "event_tx": event_tx,
      }

    # headerless
    if len(row) == 9:
      # Minimal format does not include enough info for teams/inning/outs.
      game_id = _get_idx(row, 0)
      if not game_id:
        return None
      bat_id = _get_idx(row, 2)
      pit_id = _get_idx(row, 3)
      event_tx = _get_idx(row, 4)
      event_cd = _to_int_str(_get_idx(row, 5))
      start_pa_flag = _get_idx(row, 6)
      pa_new_fl = _get_idx(row, 8)
      is_pa = is_truthy(pa_new_fl) if pa_new_fl != "" else (is_truthy(start_pa_flag) if start_pa_flag != "" else True)
      if not is_pa:
        return None

      game_date = parse_game_date_from_game_id(game_id)
      season = parse_season(game_id, game_date)

      return {
        "game_id": game_id,
        "game_date": game_date,
        "season": str(season) if season else "",
        "bat_id": bat_id,
        "pit_id": pit_id,
        "bat_team_id": "",
        "pit_team_id": "",
        "ballpark_id": "",
        "pitcher_hand": "",
        "is_home": "",
        "pa_index_in_game": "",
        "event_cd": event_cd,
        "inning": "",
        "outs": "",
        "bat_home": "",
        "event_tx": event_tx,
      }

    # cwevent-derived format (indices based on cwevent default ordering)
    game_id = _get_idx(row, 0)
    if not game_id:
      return None

    away_team_id = _get_idx(row, 1)
    inning = _to_int_str(_get_idx(row, 2))
    bat_home = _to_int_str(_get_idx(row, 3))
    outs = _to_int_str(_get_idx(row, 4))
    bat_id = _get_idx(row, 10)
    pit_id = _get_idx(row, 14)
    event_tx = _get_idx(row, 29)
    event_cd = _to_int_str(_get_idx(row, 34))
    bat_event_fl = _get_idx(row, 35)
    if bat_event_fl != "" and not is_truthy(bat_event_fl):
      return None

    home_team_id = game_id[:3] if len(game_id) >= 3 else ""
    bat_team_id, pit_team_id = derive_teams(home_team_id, away_team_id, bat_home)

    game_date = parse_game_date_from_game_id(game_id)
    season = parse_season(game_id, game_date)

    return {
      "game_id": game_id,
      "game_date": game_date,
      "season": str(season) if season else "",
      "bat_id": bat_id,
      "pit_id": pit_id,
      "bat_team_id": bat_team_id,
      "pit_team_id": pit_team_id,
      "ballpark_id": "",
      "pitcher_hand": "",
      "is_home": bat_home,
      "pa_index_in_game": "",
      "event_cd": event_cd,
      "inning": inning,
      "outs": outs,
      "bat_home": bat_home,
      "event_tx": event_tx,
    }

  def emit(row: Sequence[str], source_row: int) -> Optional[ParsedPaEvent]:
    parsed = parse_row(row)
    if not parsed:
      return None

    game_id = parsed["game_id"]
    next_seq = seq_by_game.get(game_id, 0) + 1
    seq_by_game[game_id] = next_seq
    pa_id = f"{game_id}:{next_seq}"

    return ParsedPaEvent(
      game_id=game_id,
      game_date=parsed["game_date"],
      season=int(parsed["season"]) if parsed["season"] else 0,
      event_seq=next_seq,
      pa_id=pa_id,
      bat_id=parsed["bat_id"],
      pit_id=parsed["pit_id"],
      bat_team_id=parsed["bat_team_id"],
      pit_team_id=parsed["pit_team_id"],
      ballpark_id=parsed["ballpark_id"],
      pitcher_hand=parsed["pitcher_hand"],
      is_home=parsed["is_home"],
      pa_index_in_game=parsed["pa_index_in_game"] or str(next_seq),
      event_cd=parsed["event_cd"],
      inning=parsed["inning"],
      outs=parsed["outs"],
      bat_home=parsed["bat_home"],
      event_tx=parsed["event_tx"],
      source_file=path.name,
      source_row=source_row,
    )

  row_idx = 0
  if first_data_row is not None:
    out = emit(first_data_row, 0)
    if out is not None:
      yield out
    row_idx = 1

  for row in reader:
    out = emit(row, row_idx)
    if out is not None:
      yield out
    row_idx += 1


def _iter_pa_events_for_plays_file(
  path: Path,
  header_map: Dict[str, int],
  reader: Iterable[List[str]],
  seq_by_game: Dict[str, int],
) -> Iterator[ParsedPaEvent]:
  required = {
    "gid",
    "pn",
    "pa",
    "batter",
    "pitcher",
    "pithand",
    "inning",
    "outs_pre",
    "vis_home",
    "batteam",
    "pitteam",
    "event",
    "site",
  }
  missing = sorted(required - set(header_map.keys()))
  if missing:
    raise RuntimeError(f"{path}: plays.csv missing required columns: {missing}")

  idx_gid = header_map["gid"]
  idx_pn = header_map["pn"]
  idx_pa = header_map["pa"]

  def flush(gid: str, rows: List[Tuple[int, int, List[str]]]) -> Iterator[ParsedPaEvent]:
    # rows: (pn, source_row_idx, row)
    rows.sort(key=lambda t: (t[0], t[1]))
    for pn, source_row, row in rows:
      next_seq = seq_by_game.get(gid, 0) + 1
      seq_by_game[gid] = next_seq
      pa_id = f"{gid}:{next_seq}"

      game_date = parse_game_date_from_game_id(gid)
      season = parse_season(gid, game_date)

      bat_id = _get_idx(row, header_map["batter"])
      pit_id = _get_idx(row, header_map["pitcher"])
      pitcher_hand = _get_idx(row, header_map["pithand"]).upper() or "?"
      bat_team_id = _get_idx(row, header_map["batteam"])
      pit_team_id = _get_idx(row, header_map["pitteam"])
      ballpark_id = _get_idx(row, header_map["site"])
      inning = _to_int_str(_get_idx(row, header_map["inning"]))
      outs = _to_int_str(_get_idx(row, header_map["outs_pre"]))
      bat_home = _to_int_str(_get_idx(row, header_map["vis_home"]))
      pa_index_in_game = _to_int_str(_get_idx(row, header_map["pn"]))
      event_tx = _get_idx(row, header_map["event"])
      event_cd = derive_event_cd_from_plays_row(row, header_map)

      if not bat_id or not pit_id:
        raise RuntimeError(f"{path}: missing batter/pitcher for gid={gid}, pn={pn}")
      if not ballpark_id:
        raise RuntimeError(f"{path}: missing site for gid={gid}, pn={pn}")
      if not pa_index_in_game:
        raise RuntimeError(f"{path}: missing pn for gid={gid}")

      yield ParsedPaEvent(
        game_id=gid,
        game_date=game_date,
        season=season,
        event_seq=next_seq,
        pa_id=pa_id,
        bat_id=bat_id,
        pit_id=pit_id,
        bat_team_id=bat_team_id,
        pit_team_id=pit_team_id,
        ballpark_id=ballpark_id,
        pitcher_hand=pitcher_hand,
        is_home=bat_home,
        pa_index_in_game=pa_index_in_game,
        event_cd=event_cd,
        inning=inning,
        outs=outs,
        bat_home=bat_home,
        event_tx=event_tx,
        source_file=path.name,
        source_row=source_row,
      )

  current_gid: Optional[str] = None
  buffer: List[Tuple[int, int, List[str]]] = []

  # source_row_idx is 1-based data row index for this file (header is row 0)
  source_row_idx = 1
  for row in reader:
    if not row:
      source_row_idx += 1
      continue

    gid = row[idx_gid].strip() if idx_gid < len(row) else ""
    if not gid:
      source_row_idx += 1
      continue

    pa_flag = row[idx_pa].strip() if idx_pa < len(row) else ""
    if not _truthy(pa_flag):
      source_row_idx += 1
      continue

    pn_raw = row[idx_pn].strip() if idx_pn < len(row) else ""
    try:
      pn = int(pn_raw)
    except ValueError:
      raise RuntimeError(f"{path}: invalid pn for gid={gid}: {pn_raw!r}")

    if current_gid is None:
      current_gid = gid
    if gid != current_gid:
      yield from flush(current_gid, buffer)
      buffer = []
      current_gid = gid

    buffer.append((pn, source_row_idx, row))
    source_row_idx += 1

  if current_gid is not None and buffer:
    yield from flush(current_gid, buffer)


def derive_teams(home_team_id: str, away_team_id: str, bat_home: str) -> Tuple[str, str]:
  if not home_team_id or not away_team_id:
    return ("", "")
  if bat_home == "1":
    return (home_team_id, away_team_id)
  if bat_home == "0":
    return (away_team_id, home_team_id)
  return ("", "")


def write_csv(path: Path, fieldnames: Sequence[str], rows: Sequence[Dict[str, str]]) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(fh, fieldnames=list(fieldnames), lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)


def write_json(path: Path, data: Dict[str, object]) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", encoding="utf-8") as fh:
    json.dump(data, fh, indent=2, sort_keys=True)
    fh.write("\n")


def main() -> int:
  parser = argparse.ArgumentParser(description="Build deterministic PA events from Retrosheet CSVs.")
  parser.add_argument(
    "--input-glob",
    default=DEFAULT_INPUT_GLOB,
    help=f"Input glob for plays/events CSVs (default: {DEFAULT_INPUT_GLOB})",
  )
  parser.add_argument(
    "--out-dir",
    default=str(DEFAULT_OUT_DIR),
    help=f"Output directory (default: {DEFAULT_OUT_DIR.as_posix()})",
  )
  parser.add_argument(
    "--fail-on-invalid",
    action="store_true",
    help="Exit non-zero if PA id validation fails (duplicates/null ids).",
  )
  parser.add_argument(
    "--sample",
    type=int,
    default=0,
    help="Print N sample processed rows to stdout.",
  )
  args = parser.parse_args()

  input_paths = sorted({Path(p) for p in glob(args.input_glob)})
  if not input_paths:
    print(f"No input files matched {args.input_glob!r}; nothing to do.")
    return 0

  out_dir = Path(args.out_dir)
  out_raw = out_dir / "raw" / "pa_events_raw.csv"
  out_processed = out_dir / "processed" / "pa_events.csv"
  out_stats = out_dir / "processed" / "pa_events_stats.json"

  events = list(iter_pa_events(input_paths))
  events.sort(key=lambda r: (r.season, r.game_date, r.game_id, r.event_seq))

  processed_fieldnames = [
    "pa_id",
    "season",
    "game_date",
    "game_id",
    "event_seq",
    "bat_id",
    "pit_id",
    "bat_team_id",
    "pit_team_id",
    "event_cd",
    "inning",
    "outs",
    "bat_home",
    "player_id",
    "team_id",
    "opponent_team_id",
    "ballpark_id",
    "pitcher_id",
    "pitcher_hand",
    "is_home",
    "pa_index_in_game",
  ]
  raw_fieldnames = [
    "pa_id",
    "season",
    "game_date",
    "game_id",
    "event_seq",
    "bat_id",
    "pit_id",
    "bat_team_id",
    "pit_team_id",
    "event_cd",
    "inning",
    "outs",
    "bat_home",
    "player_id",
    "team_id",
    "opponent_team_id",
    "ballpark_id",
    "pitcher_id",
    "pitcher_hand",
    "is_home",
    "pa_index_in_game",
    "event_tx",
    "source_file",
    "source_row",
  ]

  processed_rows: List[Dict[str, str]] = []
  raw_rows: List[Dict[str, str]] = []
  for r in events:
    season_str = str(r.season) if r.season else ""
    is_home = r.is_home or r.bat_home
    pa_index_in_game = r.pa_index_in_game or str(r.event_seq)
    processed_rows.append(
      {
        "pa_id": r.pa_id,
        "season": season_str,
        "game_date": r.game_date,
        "game_id": r.game_id,
        "event_seq": str(r.event_seq),
        "bat_id": r.bat_id,
        "pit_id": r.pit_id,
        "bat_team_id": r.bat_team_id,
        "pit_team_id": r.pit_team_id,
        "event_cd": r.event_cd,
        "inning": r.inning,
        "outs": r.outs,
        "bat_home": r.bat_home,
        "player_id": r.bat_id,
        "team_id": r.bat_team_id,
        "opponent_team_id": r.pit_team_id,
        "ballpark_id": r.ballpark_id,
        "pitcher_id": r.pit_id,
        "pitcher_hand": r.pitcher_hand,
        "is_home": is_home,
        "pa_index_in_game": pa_index_in_game,
      }
    )
    raw_rows.append(
      {
        "pa_id": r.pa_id,
        "season": season_str,
        "game_date": r.game_date,
        "game_id": r.game_id,
        "event_seq": str(r.event_seq),
        "bat_id": r.bat_id,
        "pit_id": r.pit_id,
        "bat_team_id": r.bat_team_id,
        "pit_team_id": r.pit_team_id,
        "event_cd": r.event_cd,
        "inning": r.inning,
        "outs": r.outs,
        "bat_home": r.bat_home,
        "player_id": r.bat_id,
        "team_id": r.bat_team_id,
        "opponent_team_id": r.pit_team_id,
        "ballpark_id": r.ballpark_id,
        "pitcher_id": r.pit_id,
        "pitcher_hand": r.pitcher_hand,
        "is_home": is_home,
        "pa_index_in_game": pa_index_in_game,
        "event_tx": r.event_tx,
        "source_file": r.source_file,
        "source_row": str(r.source_row),
      }
    )

  write_csv(out_raw, raw_fieldnames, raw_rows)
  write_csv(out_processed, processed_fieldnames, processed_rows)

  total_rows = len(processed_rows)
  pa_ids = [r["pa_id"] for r in processed_rows]
  unique_pa_ids = set(pa_ids)
  null_pa_id_count = sum(1 for x in pa_ids if not x)
  duplicates_count = total_rows - len(unique_pa_ids)

  seasons_present = sorted({r["season"] for r in processed_rows if r.get("season")})
  dates = sorted({r["game_date"] for r in processed_rows if r.get("game_date")})
  min_date = dates[0] if dates else None
  max_date = dates[-1] if dates else None

  event_cd_counts: Dict[str, int] = {}
  for r in processed_rows:
    cd = r.get("event_cd") or ""
    if cd:
      event_cd_counts[cd] = event_cd_counts.get(cd, 0) + 1
  top_event_cds = sorted(event_cd_counts.items(), key=lambda kv: (-kv[1], kv[0]))[:10]

  stats: Dict[str, object] = {
    "total_rows": total_rows,
    "unique_pa_id_count": len(unique_pa_ids),
    "duplicates_count": duplicates_count,
    "null_pa_id_count": null_pa_id_count,
    "seasons_present": seasons_present,
    "min_date": min_date,
    "max_date": max_date,
    "top_event_cd_counts": [{"event_cd": k, "count": v} for k, v in top_event_cds],
  }
  write_json(out_stats, stats)

  if args.sample and total_rows:
    print("Sample rows (processed/pa_events.csv):")
    for row in processed_rows[: max(0, args.sample)]:
      print(row)

  print(f"Wrote {total_rows} rows → {out_processed}")
  print(f"Wrote raw events → {out_raw}")
  print(f"Wrote stats → {out_stats}")
  print(
    "Validation: "
    + f"rows={total_rows}, unique_pa_id={stats['unique_pa_id_count']}, "
    + f"duplicates={duplicates_count}, null_pa_id={null_pa_id_count}"
  )

  if args.fail_on_invalid and (duplicates_count > 0 or null_pa_id_count > 0 or len(unique_pa_ids) != total_rows):
    print("ERROR: PA id validation failed (duplicates/null ids).", file=sys.stderr)
    return 1

  return 0


if __name__ == "__main__":
  raise SystemExit(main())
