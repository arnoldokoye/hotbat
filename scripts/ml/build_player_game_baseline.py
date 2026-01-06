#!/usr/bin/env python3
"""
Build Player-Game baseline table for frontend consumption (NO ML).

Context (non-negotiable):
- PA ingestion + labeling + baseline eval are complete and stable.
- Player-Day feature tables exist and must NOT be modified:
  - scripts/ml/data/features_v1/batter_daily_features.csv
  - scripts/ml/data/features_v1/pitcher_daily_features.csv

This script:
- Joins a daily slate (player-game matchups) to player-day features (time-aware),
- Uses real park_id values from the slate; park HR factor is currently a neutral placeholder (1.00),
- Materializes one row per (player_id, game_date) with explainable baseline score.

Baseline HR Score formula (exact):
baseline_hr_score = hr_rate_last_50 * park_hr_factor * avg_pa_per_game

Where avg_pa_per_game = season_pa / season_games (player-specific, not a constant).

Hard constraints:
- Do NOT modify existing PA or player-day scripts
- Do NOT train models
- Do NOT build APIs
- Do NOT introduce new feature engineering
- Favor correctness, determinism, explainability
"""

from __future__ import annotations

import argparse
import csv
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Tuple


DEFAULT_BATTER_FEATURES = Path("scripts/ml/data/features_v1/batter_daily_features.csv")
DEFAULT_PITCHER_FEATURES = Path("scripts/ml/data/features_v1/pitcher_daily_features.csv")
DEFAULT_PLAYER_REGISTRY = Path("scripts/ml/data/player_registry.csv")
DEFAULT_OUT_CSV = Path("scripts/ml/data/player_game_baseline.csv")

# Required real inputs.
DEFAULT_SLATE = Path("scripts/ml/data/daily_slate.csv")


def is_valid_date(date_str: str) -> bool:
  d = (date_str or "").strip()
  # Minimal validation for YYYY-MM-DD (lexicographically sortable).
  return len(d) == 10 and d[4] == "-" and d[7] == "-" and d[0:4].isdigit() and d[5:7].isdigit() and d[8:10].isdigit()


def to_float(value: str) -> float:
  v = (value or "").strip()
  if v == "":
    return 0.0
  try:
    return float(v)
  except ValueError:
    return 0.0


def fmt_float(x: float) -> str:
  # UI-friendly stable formatting; no NaN/inf.
  if x != x or x == float("inf") or x == float("-inf"):
    return "0.000000"
  return f"{x:.6f}"


@dataclass(frozen=True)
class SlateRow:
  player_id: str
  game_date: str
  park_id: str
  opposing_pitcher_id: str


def read_batter_features(path: Path) -> Dict[Tuple[str, str], Dict[str, float]]:
  # key: (batter_id, date) -> {hr_rate_last_50, season_hr_rate, season_hr, season_pa}
  out: Dict[Tuple[str, str], Dict[str, float]] = {}
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    for r in reader:
      batter_id = (r.get("batter_id") or "").strip()
      date = (r.get("date") or "").strip()
      if not batter_id or not is_valid_date(date):
        continue
      out[(batter_id, date)] = {
        "hr_rate_last_50": to_float(r.get("hr_rate_last_50") or "0"),
        "season_hr_rate": to_float(r.get("season_hr_rate") or "0"),
        "season_hr": to_float(r.get("season_hr") or "0"),
        "season_pa": to_float(r.get("season_pa") or "0"),
      }
  return out


def read_pitcher_features(path: Path) -> Dict[Tuple[str, str], Dict[str, float]]:
  # key: (pitcher_id, date) -> {pitcher_hr_allowed_rate_last_50}
  out: Dict[Tuple[str, str], Dict[str, float]] = {}
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    for r in reader:
      pitcher_id = (r.get("pitcher_id") or "").strip()
      date = (r.get("date") or "").strip()
      if not pitcher_id or not is_valid_date(date):
        continue
      out[(pitcher_id, date)] = {
        "pitcher_hr_allowed_rate_last_50": to_float(r.get("hr_allowed_rate_last_50") or "0"),
      }
  return out


def read_slate(path: Path) -> List[SlateRow]:
  rows: List[SlateRow] = []
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    for r in reader:
      player_id = (r.get("player_id") or r.get("batter_id") or r.get("bat_id") or "").strip()
      game_date = (r.get("game_date") or r.get("date") or "").strip()
      park_id = (r.get("park_id") or "").strip()
      opposing_pitcher_id = (r.get("opposing_pitcher_id") or r.get("pitcher_id") or r.get("pit_id") or "").strip()

      if not player_id or not is_valid_date(game_date):
        continue
      if not park_id:
        raise RuntimeError(f"Slate row missing park_id for player_id={player_id}, game_date={game_date}")
      if not opposing_pitcher_id:
        raise RuntimeError(f"Slate row missing opposing_pitcher_id for player_id={player_id}, game_date={game_date}")

      rows.append(
        SlateRow(
          player_id=player_id,
          game_date=game_date,
          park_id=park_id,
          opposing_pitcher_id=opposing_pitcher_id,
        )
      )
  return rows


def compute_season_games_by_player_date(slate: List[SlateRow]) -> Dict[Tuple[str, str], int]:
  """
  Compute cumulative season games played per player up to (but not including) each date.

  For a row on date D, season_games = count of distinct game dates for this player
  in the same season where game_date < D.

  This is time-aware: no future leakage.
  """
  # Group slate rows by (player_id, season)
  player_season_dates: Dict[Tuple[str, str], List[str]] = {}
  for s in slate:
    season = s.game_date[:4]  # YYYY from YYYY-MM-DD
    key = (s.player_id, season)
    player_season_dates.setdefault(key, []).append(s.game_date)

  # For each player-season, sort dates and compute cumulative games
  result: Dict[Tuple[str, str], int] = {}
  for (player_id, season), dates in player_season_dates.items():
    sorted_dates = sorted(set(dates))  # Unique dates, sorted
    for i, date in enumerate(sorted_dates):
      # Games played before this date = index (0-based count of prior dates)
      result[(player_id, date)] = i

  return result


def read_player_registry(path: Path) -> Dict[str, str]:
  # key: player_id -> full_name
  out: Dict[str, str] = {}
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    if not reader.fieldnames:
      raise RuntimeError(f"Player registry has no header: {path}")

    required = {"player_id", "full_name"}
    missing_cols = sorted(required - set(reader.fieldnames))
    if missing_cols:
      raise RuntimeError(f"Player registry missing columns {missing_cols}: {path}")

    for i, r in enumerate(reader, start=2):
      player_id = (r.get("player_id") or "").strip()
      full_name = (r.get("full_name") or "").strip()
      if not player_id or not full_name:
        raise RuntimeError(f"Invalid player registry row at line {i}: player_id/full_name required.")
      if player_id in out and out[player_id] != full_name:
        raise RuntimeError(f"Duplicate player_id with conflicting names in registry: {player_id}")
      out[player_id] = full_name

  if not out:
    raise RuntimeError(f"Player registry is empty: {path}")
  return out


def write_csv(path: Path, fieldnames: Sequence[str], rows: Sequence[Dict[str, str]]) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(fh, fieldnames=list(fieldnames), lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)


def main() -> int:
  parser = argparse.ArgumentParser(description="Build player_game_baseline.csv for frontend consumption (no ML).")
  parser.add_argument("--batter-features", default=str(DEFAULT_BATTER_FEATURES), help="Path to batter_daily_features.csv")
  parser.add_argument("--pitcher-features", default=str(DEFAULT_PITCHER_FEATURES), help="Path to pitcher_daily_features.csv")
  parser.add_argument(
    "--player-registry",
    default=str(DEFAULT_PLAYER_REGISTRY),
    help="Path to canonical player_registry.csv (player_id → full_name).",
  )
  parser.add_argument(
    "--slate",
    default=str(DEFAULT_SLATE),
    help="Path to REAL daily slate CSV (player_id, game_date, park_id, opposing_pitcher_id).",
  )
  parser.add_argument("--fallback-pa", type=float, default=4.0, help="Fallback avg PA/G when season_games=0 (default: 4.0)")
  parser.add_argument("--out", default=str(DEFAULT_OUT_CSV), help="Output CSV path (default: scripts/ml/data/player_game_baseline.csv)")
  args = parser.parse_args()

  batter_path = Path(args.batter_features)
  pitcher_path = Path(args.pitcher_features)
  registry_path = Path(args.player_registry)
  slate_path = Path(args.slate)
  out_path = Path(args.out)

  for p in [batter_path, pitcher_path, slate_path, registry_path]:
    if not p.exists():
      if p == registry_path:
        print(
          "ERROR: missing player registry. Build it first:\n"
          "  python3 scripts/ml/player_registry.py\n"
          f"Expected: {registry_path}",
          file=sys.stderr,
        )
        return 1
      print(f"ERROR: missing required input: {p}", file=sys.stderr)
      return 1

  batter = read_batter_features(batter_path)
  pitcher = read_pitcher_features(pitcher_path)
  # Park factors are not available yet; keep park_hr_factor = 1.00 as a documented placeholder.
  park_hr_factor = 1.0
  slate = read_slate(slate_path)
  try:
    player_registry = read_player_registry(registry_path)
  except Exception as e:
    print(f"ERROR: failed to read player registry: {e}", file=sys.stderr)
    return 1

  if not slate:
    print(f"ERROR: no valid slate rows read from {slate_path}", file=sys.stderr)
    return 1

  # Compute cumulative season games per player-date for avg PA/G calculation.
  season_games_lookup = compute_season_games_by_player_date(slate)
  fallback_pa = args.fallback_pa

  missing_batter = 0
  missing_pitcher = 0
  missing_player_name = 0
  missing_player_ids: List[str] = []
  # These should be zero with a valid daily slate.
  null_pitcher_id = 0
  null_park_id = 0

  out_rows: List[Dict[str, str]] = []
  for s in slate:
    player_name = player_registry.get(s.player_id)
    if not player_name:
      missing_player_name += 1
      if len(missing_player_ids) < 25:
        missing_player_ids.append(s.player_id)
      player_name = ""

    bf = batter.get((s.player_id, s.game_date))
    if bf is None:
      missing_batter += 1
      hr_rate_last_50 = 0.0
      season_hr_rate = 0.0
      season_hr = 0.0
      season_pa = 0.0
    else:
      hr_rate_last_50 = float(bf.get("hr_rate_last_50", 0.0))
      season_hr_rate = float(bf.get("season_hr_rate", 0.0))
      season_hr = float(bf.get("season_hr", 0.0))
      season_pa = float(bf.get("season_pa", 0.0))

    pf = None
    if s.opposing_pitcher_id:
      pf = pitcher.get((s.opposing_pitcher_id, s.game_date))
    else:
      null_pitcher_id += 1

    if pf is None:
      missing_pitcher += 1 if s.opposing_pitcher_id else 0
      pitcher_rate_last_50 = 0.0
    else:
      pitcher_rate_last_50 = float(pf.get("pitcher_hr_allowed_rate_last_50", 0.0))

    if not s.park_id:
      null_park_id += 1

    # Compute player-specific avg PA/G from season stats.
    season_games = season_games_lookup.get((s.player_id, s.game_date), 0)
    if season_games > 0 and season_pa > 0:
      avg_pa_per_game = season_pa / season_games
    else:
      avg_pa_per_game = fallback_pa

    baseline_hr_score = hr_rate_last_50 * park_hr_factor * avg_pa_per_game

    out_rows.append(
      {
        "player_id": s.player_id,
        "player_name": player_name,
        "game_date": s.game_date,
        "park_id": s.park_id,
        "opposing_pitcher_id": s.opposing_pitcher_id,
        "hr_rate_last_50": fmt_float(hr_rate_last_50),
        "season_hr_rate": fmt_float(season_hr_rate),
        "season_hr": str(int(season_hr)) if season_hr.is_integer() else fmt_float(season_hr),
        "season_pa": str(int(season_pa)) if season_pa.is_integer() else fmt_float(season_pa),
        "season_games": str(season_games),
        "avg_pa_per_game": fmt_float(avg_pa_per_game),
        "pitcher_hr_allowed_rate_last_50": fmt_float(pitcher_rate_last_50),
        "park_hr_factor": fmt_float(park_hr_factor),
        "baseline_hr_score": fmt_float(baseline_hr_score),
      }
    )

  # Deterministic ordering per day: score desc, then hr_rate_last_50 desc, then ids.
  out_rows.sort(
    key=lambda r: (
      r["game_date"],
      -to_float(r["baseline_hr_score"]),
      -to_float(r["hr_rate_last_50"]),
      r["player_id"],
      r["opposing_pitcher_id"],
      r["park_id"],
    )
  )

  # Validation: uniqueness, null checks.
  keys = [(r["player_id"], r["game_date"]) for r in out_rows]
  duplicates_count = len(keys) - len(set(keys))
  null_player_id = sum(1 for r in out_rows if not r["player_id"])
  null_game_date = sum(1 for r in out_rows if not r["game_date"])
  null_player_name = sum(1 for r in out_rows if not r["player_name"])

  if missing_player_name or null_player_name:
    print("ERROR: missing player_name for one or more player_id values.", file=sys.stderr)
    print(f"  registry: {registry_path}", file=sys.stderr)
    print(f"  missing_player_name_rows={missing_player_name}", file=sys.stderr)
    if missing_player_ids:
      print("  Missing player_id(s) (first 25):", file=sys.stderr)
      for pid in missing_player_ids:
        print(f"  - {pid}", file=sys.stderr)
    print("Rebuild registry and re-run:", file=sys.stderr)
    print("  python3 scripts/ml/player_registry.py", file=sys.stderr)
    return 1

  fieldnames = [
    "player_id",
    "player_name",
    "game_date",
    "park_id",
    "opposing_pitcher_id",
    "hr_rate_last_50",
    "season_hr_rate",
    "season_hr",
    "season_pa",
    "season_games",
    "avg_pa_per_game",
    "pitcher_hr_allowed_rate_last_50",
    "park_hr_factor",
    "baseline_hr_score",
  ]
  write_csv(out_path, fieldnames, out_rows)

  dates = sorted({r["game_date"] for r in out_rows if r["game_date"]})
  min_date = dates[0] if dates else ""
  max_date = dates[-1] if dates else ""

  print(f"Inputs:")
  print(f"  batter_daily_features:  {batter_path} (rows={len(batter)})")
  print(f"  pitcher_daily_features: {pitcher_path} (rows={len(pitcher)})")
  print(f"  player_registry:        {registry_path} (players={len(player_registry)})")
  print(f"  slate:                 {slate_path} (rows={len(slate)})")
  print(f"  park_hr_factor:        {park_hr_factor:.2f} (placeholder; real park factors not joined yet)")
  print("")
  print(f"Output:")
  print(f"  {out_path} (rows={len(out_rows)}, date_range={min_date}..{max_date})")
  print("")
  print("Validation:")
  print(f"  duplicates(player_id,game_date)={duplicates_count}")
  print(f"  null_player_id={null_player_id}, null_game_date={null_game_date}")
  print(f"  null_player_name={null_player_name}")
  print(f"  null_park_id={null_park_id}, null_pitcher_id={null_pitcher_id}")
  print(f"  missing_batter_features={missing_batter} (defaulted to 0.0)")
  print(f"  missing_pitcher_features={missing_pitcher} (defaulted to 0.0)")

  invalid = duplicates_count > 0 or null_player_id > 0 or null_game_date > 0 or null_player_name > 0 or null_park_id > 0 or null_pitcher_id > 0
  if invalid:
    print("ERROR: validation failed.", file=sys.stderr)
    return 1

  return 0


if __name__ == "__main__":
  raise SystemExit(main())
