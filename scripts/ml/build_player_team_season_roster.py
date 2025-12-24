#!/usr/bin/env python3
"""
Materialize a Player-Team-Season roster table from Retrosheet daily logs.

Context:
- Retrosheet daily logs include an `allplayers.csv` per season under:
    data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/{YEAR}DAILY_LOGScsvs/{YEAR}allplayers.csv
- This file is team-season grain (a player can appear multiple times in a season if traded).
- HotBat uses a single canonical identity mapping (player_id -> player_name) produced by:
    scripts/ml/player_registry.py  -> scripts/ml/data/player_registry.csv

This script produces a derived roster table that is useful for debugging and future joins that need
explicit team-season membership without duplicating player-name resolution logic.

Output:
  scripts/ml/data/player_team_season.csv

Schema:
  player_id, player_name, season, team_id, games_played, first_game, last_game
"""

from __future__ import annotations

import argparse
import csv
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Sequence, Set, Tuple


DEFAULT_DAILY_LOGS_DIR = Path("data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS")
DEFAULT_REGISTRY_PATH = Path("scripts/ml/data/player_registry.csv")
DEFAULT_OUT_PATH = Path("scripts/ml/data/player_team_season.csv")


def yyyymmdd_to_iso(value: str) -> str:
  v = (value or "").strip()
  if len(v) == 8 and v.isdigit():
    return f"{v[0:4]}-{v[4:6]}-{v[6:8]}"
  return v


def to_int(value: str) -> int:
  v = (value or "").strip()
  if v == "":
    return 0
  try:
    return int(v)
  except ValueError:
    return 0


def parse_seasons_arg(value: str) -> Set[int]:
  seasons: Set[int] = set()
  for part in (value or "").split(","):
    p = part.strip()
    if p.isdigit():
      seasons.add(int(p))
  return seasons


def discover_seasons(daily_logs_dir: Path) -> Set[int]:
  seasons: Set[int] = set()
  if not daily_logs_dir.exists():
    return seasons
  for child in daily_logs_dir.iterdir():
    if not child.is_dir():
      continue
    name = child.name
    if len(name) >= 4 and name[0:4].isdigit():
      seasons.add(int(name[0:4]))
  return seasons


def discover_allplayers_files(daily_logs_dir: Path, seasons: Set[int]) -> List[Path]:
  paths: List[Path] = []
  for season in sorted(seasons):
    season_dir = daily_logs_dir / f"{season}DAILY_LOGScsvs"
    path = season_dir / f"{season}allplayers.csv"
    if path.exists() and path.is_file():
      paths.append(path)
  return paths


def load_player_registry(registry_path: Path) -> Dict[str, str]:
  if not registry_path.exists():
    raise FileNotFoundError(
      f"Player registry not found: {registry_path}. Run: python3 scripts/ml/player_registry.py"
    )

  by_id: Dict[str, str] = {}
  with registry_path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    if not reader.fieldnames:
      raise RuntimeError(f"player_registry.csv has no header: {registry_path}")
    required = {"player_id", "full_name"}
    missing = sorted(required - set(reader.fieldnames))
    if missing:
      raise RuntimeError(f"player_registry.csv missing columns {missing}: {registry_path}")

    for row in reader:
      player_id = (row.get("player_id") or "").strip()
      full_name = (row.get("full_name") or "").strip()
      if not player_id or not full_name:
        continue
      if player_id in by_id and by_id[player_id] != full_name:
        raise RuntimeError(f"Conflicting full_name for player_id={player_id} in {registry_path}")
      by_id[player_id] = full_name

  if not by_id:
    raise RuntimeError(f"player_registry.csv is empty: {registry_path}")
  return by_id


@dataclass(frozen=True)
class TeamSeasonRow:
  player_id: str
  player_name: str
  season: int
  team_id: str
  games_played: int
  first_game: str
  last_game: str


def write_csv(path: Path, rows: Sequence[TeamSeasonRow]) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(
      fh,
      fieldnames=[
        "player_id",
        "player_name",
        "season",
        "team_id",
        "games_played",
        "first_game",
        "last_game",
      ],
      lineterminator="\n",
    )
    writer.writeheader()
    for r in rows:
      writer.writerow(
        {
          "player_id": r.player_id,
          "player_name": r.player_name,
          "season": r.season,
          "team_id": r.team_id,
          "games_played": r.games_played,
          "first_game": r.first_game,
          "last_game": r.last_game,
        }
      )


def main() -> int:
  parser = argparse.ArgumentParser(
    description="Build a player-team-season roster table from Retrosheet daily logs allplayers.csv."
  )
  parser.add_argument(
    "--daily-logs-dir",
    default=str(DEFAULT_DAILY_LOGS_DIR),
    help="Base directory containing year-partitioned daily logs folders (e.g. 2020DAILY_LOGScsvs).",
  )
  parser.add_argument(
    "--registry",
    default=str(DEFAULT_REGISTRY_PATH),
    help="Path to canonical player_registry.csv (for joining player_name).",
  )
  parser.add_argument(
    "--seasons",
    default="",
    help="Optional comma-separated seasons to include. If omitted, discovers seasons from daily logs folder names.",
  )
  parser.add_argument(
    "--out",
    default=str(DEFAULT_OUT_PATH),
    help="Output CSV path (default: scripts/ml/data/player_team_season.csv).",
  )
  parser.add_argument(
    "--fail-on-invalid",
    action="store_true",
    help="Exit non-zero on duplicate keys or unresolved player names.",
  )
  args = parser.parse_args()

  daily_logs_dir = Path(args.daily_logs_dir)
  seasons = parse_seasons_arg(args.seasons) if args.seasons.strip() else discover_seasons(daily_logs_dir)
  if not seasons:
    print("ERROR: no seasons found (provide --seasons or ensure daily logs folders exist).", file=sys.stderr)
    return 1

  allplayers_files = discover_allplayers_files(daily_logs_dir, seasons)
  if not allplayers_files:
    print(
      "ERROR: no allplayers files found. Expected:"
      + f"\n  {daily_logs_dir}/{{YEAR}}DAILY_LOGScsvs/{{YEAR}}allplayers.csv"
      + f"\nfor seasons {sorted(seasons)}",
      file=sys.stderr,
    )
    return 1

  registry = load_player_registry(Path(args.registry))

  rows: List[TeamSeasonRow] = []
  seen: Set[Tuple[str, int, str]] = set()
  duplicates = 0
  missing_names = 0
  missing_required = 0

  for p in allplayers_files:
    season_str = p.name[0:4]
    season = int(season_str) if season_str.isdigit() else 0
    with p.open(newline="", encoding="utf-8", errors="replace") as fh:
      reader = csv.DictReader(fh)
      if not reader.fieldnames:
        raise RuntimeError(f"allplayers file has no header: {p}")
      required = {"id", "team", "g", "first_g", "last_g"}
      missing = sorted(required - set(reader.fieldnames))
      if missing:
        raise RuntimeError(f"allplayers missing columns {missing}: {p}")

      for row in reader:
        player_id = (row.get("id") or "").strip()
        team_id = (row.get("team") or "").strip()
        if not player_id or not team_id:
          missing_required += 1
          continue

        player_name = registry.get(player_id)
        if not player_name:
          missing_names += 1
          player_name = player_id

        key = (player_id, season, team_id)
        if key in seen:
          duplicates += 1
          continue
        seen.add(key)

        rows.append(
          TeamSeasonRow(
            player_id=player_id,
            player_name=player_name,
            season=season,
            team_id=team_id,
            games_played=to_int(row.get("g") or ""),
            first_game=yyyymmdd_to_iso(row.get("first_g") or ""),
            last_game=yyyymmdd_to_iso(row.get("last_g") or ""),
          )
        )

  # Deterministic order.
  rows.sort(key=lambda r: (r.season, r.team_id, r.player_id))

  out_path = Path(args.out)
  write_csv(out_path, rows)

  print(f"Daily logs: {len(allplayers_files)} allplayers.csv files (seasons={sorted(seasons)})")
  print(f"Registry: {len(registry)} players loaded from {Path(args.registry)}")
  print(f"Roster: {len(rows)} rows → {out_path}")
  print(f"Validation: duplicates={duplicates}, missing_required={missing_required}, missing_player_name={missing_names}")

  if args.fail_on_invalid and (duplicates > 0 or missing_names > 0 or missing_required > 0):
    return 1
  return 0


if __name__ == "__main__":
  raise SystemExit(main())

