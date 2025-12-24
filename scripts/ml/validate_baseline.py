#!/usr/bin/env python3
"""
Validate player_game_baseline.csv season coverage and invariants (no pandas).

Why this exists
---------------
The HotBat /picks page is CSV-backed and is only as good as the baseline CSV.
This script provides a fast, deterministic verification that tells you:
  - which seasons exist in the baseline
  - date coverage per season
  - duplicate/null checks for the baseline contract
  - (optional) whether baseline dates cover all game dates in Retrosheet game logs

Inputs
------
- Baseline CSV: scripts/ml/data/player_game_baseline.csv (default)
- Retrosheet game logs: data_sources/NEW_DATA_SETS/2020-25 GAMELOGS/glYYYY.txt (default)

Notes
-----
- Baseline grain is one row per (player_id, game_date); game_date is the source of truth.
- Game logs are used only for validation counts/coverage (authoritative game dates).
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Set, Tuple


DEFAULT_BASELINE = Path("scripts/ml/data/player_game_baseline.csv")
DEFAULT_GAMELOGS_DIR = Path("data_sources/NEW_DATA_SETS/2020-25 GAMELOGS")

# MLB regular season reference counts (use for sanity; 2025 is in-progress).
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


@dataclass
class BaselineSeasonStats:
  rows: int = 0
  unique_dates: Set[str] = None  # type: ignore[assignment]
  min_date: str = ""
  max_date: str = ""

  def __post_init__(self) -> None:
    if self.unique_dates is None:
      self.unique_dates = set()

  def add_date(self, d: str) -> None:
    if not is_iso_date(d):
      return
    self.unique_dates.add(d)
    if not self.min_date or d < self.min_date:
      self.min_date = d
    if not self.max_date or d > self.max_date:
      self.max_date = d


@dataclass(frozen=True)
class GameLogStats:
  games: int
  dates: Set[str]


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


def read_baseline(path: Path) -> Tuple[Dict[int, BaselineSeasonStats], Dict[str, int]]:
  if not path.exists():
    raise FileNotFoundError(f"Baseline CSV not found: {path}")

  issues: Dict[str, int] = {
    "missing_player_id": 0,
    "missing_player_name": 0,
    "invalid_game_date": 0,
    "duplicate_player_date": 0,
  }

  by_season: Dict[int, BaselineSeasonStats] = {}
  seen_keys: Set[Tuple[str, str]] = set()

  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    if not reader.fieldnames:
      raise RuntimeError(f"Baseline CSV missing header: {path}")
    required = {"player_id", "player_name", "game_date"}
    missing = sorted(required - set(reader.fieldnames))
    if missing:
      raise RuntimeError(f"Baseline CSV missing required columns: {missing}")

    for row in reader:
      player_id = (row.get("player_id") or "").strip()
      player_name = (row.get("player_name") or "").strip()
      game_date = (row.get("game_date") or "").strip()

      if not player_id:
        issues["missing_player_id"] += 1
      if not player_name:
        issues["missing_player_name"] += 1
      if not is_iso_date(game_date):
        issues["invalid_game_date"] += 1
        continue

      key = (player_id, game_date)
      if key in seen_keys:
        issues["duplicate_player_date"] += 1
      else:
        seen_keys.add(key)

      season = int(game_date[0:4])
      stats = by_season.setdefault(season, BaselineSeasonStats())
      stats.rows += 1
      stats.add_date(game_date)

  return by_season, issues


def iter_gamelog_rows(gl_path: Path) -> Iterable[List[str]]:
  with gl_path.open(newline="", encoding="utf-8", errors="replace") as fh:
    reader = csv.reader(fh)
    for row in reader:
      if row:
        yield row


def read_gamelog_stats(gl_path: Path) -> GameLogStats:
  if not gl_path.exists():
    raise FileNotFoundError(f"Game logs not found: {gl_path}")

  games = 0
  dates: Set[str] = set()

  for row in iter_gamelog_rows(gl_path):
    # Retrosheet game logs are 161 fields; don't hard fail here (some repos may trim),
    # but rely on the standard date field being present at index 0.
    date_raw = row[0].strip() if len(row) > 0 else ""
    date_iso = parse_yyyymmdd(date_raw)
    if not date_iso:
      continue
    games += 1
    dates.add(date_iso)

  if not games:
    raise RuntimeError(f"{gl_path}: parsed 0 games")
  return GameLogStats(games=games, dates=dates)


def fmt_range(min_date: str, max_date: str) -> str:
  if not min_date and not max_date:
    return "—"
  if min_date == max_date:
    return min_date
  return f"{min_date}..{max_date}"


def main() -> int:
  parser = argparse.ArgumentParser(description="Validate scripts/ml/data/player_game_baseline.csv across seasons.")
  parser.add_argument("--baseline", default=str(DEFAULT_BASELINE), help="Path to player_game_baseline.csv")
  parser.add_argument(
    "--gamelogs-dir",
    default=str(DEFAULT_GAMELOGS_DIR),
    help="Directory containing Retrosheet glYYYY.txt files (authoritative game dates + counts).",
  )
  parser.add_argument(
    "--seasons",
    default="",
    help="Optional comma-separated seasons to validate (e.g. 2020,2021). Default: all seasons found in baseline.",
  )
  parser.add_argument(
    "--fail-on-invalid",
    action="store_true",
    help="Exit non-zero if validation fails (duplicates/nulls) or baseline is missing any game dates present in game logs for the selected seasons.",
  )
  args = parser.parse_args()

  baseline_path = Path(args.baseline)
  gamelogs_dir = Path(args.gamelogs_dir)

  try:
    baseline_by_season, baseline_issues = read_baseline(baseline_path)
  except Exception as e:
    print(f"ERROR: failed to read baseline CSV: {e}", file=sys.stderr)
    return 1

  seasons_filter = parse_seasons_arg(args.seasons) or set(baseline_by_season.keys())
  if not seasons_filter:
    print("ERROR: no seasons found in baseline and no --seasons provided.", file=sys.stderr)
    return 1

  gamelog_by_season: Dict[int, GameLogStats] = {}
  for season in sorted(seasons_filter):
    gl_path = gamelogs_dir / f"gl{season}.txt"
    if not gl_path.exists():
      continue
    try:
      gamelog_by_season[season] = read_gamelog_stats(gl_path)
    except Exception as e:
      print(f"ERROR: failed to read game logs for {season}: {e}", file=sys.stderr)
      return 1

  print("\n=== BASELINE SEASON VALIDATION ===")
  print(f"baseline:     {baseline_path}")
  print(f"gamelogs_dir: {gamelogs_dir}")
  print("")
  print("Per-season summary:")
  print("  season | gamelog_games | expected | baseline_rows | baseline_dates | baseline_range | date_coverage")

  invalid = False
  missing_dates_total = 0

  for season in sorted(seasons_filter):
    baseline_stats = baseline_by_season.get(season, BaselineSeasonStats(rows=0))
    gl = gamelog_by_season.get(season)
    games = gl.games if gl else 0
    expected = EXPECTED_GAMES.get(season)

    coverage = "n/a"
    if gl:
      missing_dates = sorted(gl.dates - baseline_stats.unique_dates)
      missing_dates_total += len(missing_dates)
      coverage = "OK" if not missing_dates else f"missing {len(missing_dates)}"

      # For small misses, show a short sample for debugging.
      if missing_dates and len(missing_dates) <= 5:
        coverage += f" ({', '.join(missing_dates)})"

    expected_str = str(expected) if expected is not None else "—"
    print(
      f"  {season:<6} | {games:<12} | {expected_str:<8} | {baseline_stats.rows:<12} | "
      f"{len(baseline_stats.unique_dates):<13} | {fmt_range(baseline_stats.min_date, baseline_stats.max_date):<22} | {coverage}"
    )

    if baseline_stats.rows == 0:
      invalid = True
    if (
      baseline_issues["duplicate_player_date"]
      or baseline_issues["missing_player_id"]
      or baseline_issues["missing_player_name"]
      or baseline_issues["invalid_game_date"]
    ):
      invalid = True
    if gl and (gl.dates - baseline_stats.unique_dates):
      invalid = True

  print("")
  print("Baseline invariants:")
  for k in ["missing_player_id", "missing_player_name", "invalid_game_date", "duplicate_player_date"]:
    print(f"  {k}: {baseline_issues.get(k, 0)}")

  if missing_dates_total:
    print(f"  missing_game_dates_total: {missing_dates_total}")

  if args.fail_on_invalid and invalid:
    print("\nERROR: validation failed.", file=sys.stderr)
    return 1

  print("\nOK: validation complete." if not invalid else "\nWARN: validation detected issues (run with --fail-on-invalid to fail).")
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
