#!/usr/bin/env python3
"""
Build season-level metadata for CSV-backed UX (no pandas).

Purpose
-------
HotBat's /picks page derives available seasons/dates directly from
public/data/player_game_baseline.csv. This script produces an optional
companion artifact with season completeness flags and badges that the UI
can display without hardcoding any year logic.

Output
------
scripts/ml/data/season_metadata.json (default)

Recommended workflow
--------------------
python3 scripts/ml/build_season_metadata.py
mkdir -p public/data
cp scripts/ml/data/season_metadata.json public/data/season_metadata.json
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from pathlib import Path
from typing import Dict, Optional, Set


DEFAULT_BASELINE = Path("scripts/ml/data/player_game_baseline.csv")
DEFAULT_GAMELOGS_DIR = Path("data_sources/NEW_DATA_SETS/2020-25 GAMELOGS")
DEFAULT_OUT = Path("scripts/ml/data/season_metadata.json")

EXPECTED_GAMES: Dict[int, int] = {
  2020: 898,
  2021: 2430,
  2022: 2430,
  2023: 2430,
  2024: 2430,
}

ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def is_iso_date(value: str) -> bool:
  return bool(ISO_DATE_RE.match((value or "").strip()))


def parse_yyyymmdd(value: str) -> str:
  v = (value or "").strip()
  if len(v) == 8 and v.isdigit():
    return f"{v[0:4]}-{v[4:6]}-{v[6:8]}"
  return ""


def parse_seasons_arg(value: str) -> Optional[Set[int]]:
  v = (value or "").strip()
  if not v:
    return None
  seasons: Set[int] = set()
  for part in v.split(","):
    p = part.strip()
    if p.isdigit():
      seasons.add(int(p))
  return seasons or None


def read_baseline_season_dates(path: Path) -> Dict[int, Set[str]]:
  if not path.exists():
    raise FileNotFoundError(f"Baseline CSV not found: {path}")

  by_season: Dict[int, Set[str]] = {}
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    if not reader.fieldnames:
      raise RuntimeError(f"Baseline CSV missing header: {path}")
    if "game_date" not in reader.fieldnames:
      raise RuntimeError(f"Baseline CSV missing game_date column: {path}")
    for row in reader:
      d = (row.get("game_date") or "").strip()
      if not is_iso_date(d):
        continue
      season = int(d[0:4])
      by_season.setdefault(season, set()).add(d)
  return by_season


def read_gamelog_dates(gl_path: Path) -> Set[str]:
  if not gl_path.exists():
    return set()
  dates: Set[str] = set()
  with gl_path.open(newline="", encoding="utf-8", errors="replace") as fh:
    reader = csv.reader(fh)
    for row in reader:
      if not row:
        continue
      date_iso = parse_yyyymmdd(row[0] if len(row) > 0 else "")
      if date_iso:
        dates.add(date_iso)
  return dates


def count_gamelog_games(gl_path: Path) -> int:
  if not gl_path.exists():
    return 0
  games = 0
  with gl_path.open(newline="", encoding="utf-8", errors="replace") as fh:
    reader = csv.reader(fh)
    for row in reader:
      if not row:
        continue
      date_iso = parse_yyyymmdd(row[0] if len(row) > 0 else "")
      if date_iso:
        games += 1
  return games


def date_range(dates: Set[str]) -> tuple[str, str]:
  if not dates:
    return ("", "")
  ordered = sorted(dates)
  return (ordered[0], ordered[-1])


def main() -> int:
  parser = argparse.ArgumentParser(description="Build scripts/ml/data/season_metadata.json from baseline + game logs.")
  parser.add_argument("--baseline", default=str(DEFAULT_BASELINE), help="Path to player_game_baseline.csv")
  parser.add_argument(
    "--gamelogs-dir",
    default=str(DEFAULT_GAMELOGS_DIR),
    help="Directory containing Retrosheet glYYYY.txt files (authoritative game dates + counts).",
  )
  parser.add_argument("--out", default=str(DEFAULT_OUT), help="Output JSON path (default: scripts/ml/data/season_metadata.json)")
  parser.add_argument(
    "--seasons",
    default="",
    help="Optional comma-separated seasons to include. Default: seasons present in baseline CSV.",
  )
  args = parser.parse_args()

  baseline_path = Path(args.baseline)
  gamelogs_dir = Path(args.gamelogs_dir)
  out_path = Path(args.out)

  try:
    baseline_dates_by_season = read_baseline_season_dates(baseline_path)
  except Exception as e:
    print(f"ERROR: failed to read baseline: {e}", file=sys.stderr)
    return 1

  seasons_filter = parse_seasons_arg(args.seasons) or set(baseline_dates_by_season.keys())
  if not seasons_filter:
    print("ERROR: no seasons found in baseline and no --seasons provided.", file=sys.stderr)
    return 1

  meta: Dict[str, dict] = {}

  for season in sorted(seasons_filter):
    baseline_dates = baseline_dates_by_season.get(season, set())
    baseline_min, baseline_max = date_range(baseline_dates)
    gl_path = gamelogs_dir / f"gl{season}.txt"
    gamelog_games = count_gamelog_games(gl_path) if gl_path.exists() else 0
    gamelog_dates = read_gamelog_dates(gl_path) if gl_path.exists() else set()
    gamelog_min, gamelog_max = date_range(gamelog_dates)

    expected = EXPECTED_GAMES.get(season)
    complete = bool(expected is not None and gamelog_games == expected)
    covid = season == 2020
    covers_all_game_dates = bool(gamelog_dates and gamelog_dates.issubset(baseline_dates))

    meta[str(season)] = {
      "games": int(gamelog_games) if gamelog_games else None,
      "expected_games": int(expected) if expected is not None else None,
      "complete": complete,
      "covid_season": covid,
      "baseline_unique_dates": len(baseline_dates),
      "baseline_min_date": baseline_min or None,
      "baseline_max_date": baseline_max or None,
      "gamelog_min_date": gamelog_min or None,
      "gamelog_max_date": gamelog_max or None,
      "baseline_covers_all_game_dates": covers_all_game_dates if gamelog_dates else None,
    }

  out_path.parent.mkdir(parents=True, exist_ok=True)
  with out_path.open("w", encoding="utf-8") as fh:
    json.dump(meta, fh, indent=2, sort_keys=True)
    fh.write("\n")

  seasons_out = ", ".join(sorted(meta.keys()))
  print(f"Wrote {out_path} (seasons={seasons_out})")
  print("Next: copy to web for /picks badges:")
  print(f"  mkdir -p public/data && cp {out_path} public/data/season_metadata.json")
  return 0


if __name__ == "__main__":
  raise SystemExit(main())

