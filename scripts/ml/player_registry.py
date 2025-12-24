#!/usr/bin/env python3
"""
Canonical player identity registry for HotBat ML (Retrosheet-only).

Problem solved:
- Retrosheet PA pipelines use player_id (e.g. abrej003) which is not UI-friendly.
- Player metadata lives in Retrosheet "daily logs" CSVs and must be joined deterministically.

This module:
- Loads Retrosheet daily logs `allplayers.csv` (year-partitioned)
- Builds a canonical mapping:
    player_id, first_name, last_name, full_name
- Enforces uniqueness of player_id for the selected seasons
  - If a player_id has multiple name variants across seasons (nicknames/name changes), resolves deterministically
    using: first-initial match > latest season > most frequent > longest > lexicographic.
  - Use --fail-on-conflicts to make these conflicts a hard error.
- Fails loudly on missing roster coverage for any player_id referenced by PA labels.

Generated artifact (single source of truth):
  scripts/ml/data/player_registry.csv

Notes:
- This does NOT change PA grain and does NOT affect pa_id generation.
- This is metadata-only and deterministic.
"""

from __future__ import annotations

import argparse
import csv
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Set, Tuple

DEFAULT_DAILY_LOGS_DIR = Path("data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS")
DEFAULT_LABELS_PATH = Path("scripts/ml/data/processed/pa_labels.csv")
DEFAULT_OUT_PATH = Path("scripts/ml/data/player_registry.csv")


def normalize_name_token(value: str) -> str:
  return "".join(ch for ch in value.strip().casefold() if ch.isalnum())


def expected_first_initial(player_id: str) -> str:
  pid = (player_id or "").strip()
  # Retrosheet player IDs are typically 8 chars: last4 + firstInitial + 3-digit suffix.
  # When available, use the embedded first-initial to resolve cross-season naming conflicts.
  if len(pid) >= 5 and pid[4].isalpha():
    return pid[4].casefold()
  return ""


@dataclass(frozen=True)
class RosterRecord:
  player_id: str
  first_name: str
  last_name: str
  season: int
  source_file: str


def discover_allplayers_files(daily_logs_dir: Path, seasons: Set[int]) -> List[Path]:
  paths: List[Path] = []
  for season in sorted(seasons):
    season_dir = daily_logs_dir / f"{season}DAILY_LOGScsvs"
    path = season_dir / f"{season}allplayers.csv"
    if path.exists() and path.is_file():
      paths.append(path)
  return paths


def load_allplayers_records(paths: Sequence[Path]) -> List[RosterRecord]:
  records: List[RosterRecord] = []
  for p in paths:
    season = 0
    with p.open(newline="", encoding="utf-8", errors="replace") as fh:
      reader = csv.DictReader(fh)
      if not reader.fieldnames:
        raise RuntimeError(f"allplayers file has no header: {p}")
      required = {"id", "first", "last"}
      missing = sorted(required - set(reader.fieldnames))
      if missing:
        raise RuntimeError(f"allplayers missing columns {missing}: {p}")

      # Season is implicit by file name/path (e.g., 2020allplayers.csv).
      name_prefix = p.name[0:4]
      if name_prefix.isdigit():
        season = int(name_prefix)

      for row in reader:
        player_id = (row.get("id") or "").strip()
        first_name = (row.get("first") or "").strip()
        last_name = (row.get("last") or "").strip()
        if not player_id or not first_name or not last_name:
          raise RuntimeError(f"Invalid allplayers row in {p}: player_id/first/last required.")

        records.append(
          RosterRecord(
            player_id=player_id,
            first_name=first_name,
            last_name=last_name,
            season=season,
            source_file=p.name,
          )
        )
  return records


def extract_seasons_from_labels(labels_path: Path) -> Set[int]:
  if not labels_path.exists():
    raise FileNotFoundError(f"Labels file not found: {labels_path}")

  seasons: Set[int] = set()
  with labels_path.open(newline="", encoding="utf-8") as fh:
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


def extract_player_ids_from_labels(labels_path: Path) -> Set[str]:
  ids: Set[str] = set()
  with labels_path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    for row in reader:
      bat = (row.get("bat_id") or row.get("batter_id") or "").strip()
      pit = (row.get("pit_id") or row.get("pitcher_id") or "").strip()
      if bat:
        ids.add(bat)
      if pit:
        ids.add(pit)
  return ids


def build_registry(records: Sequence[RosterRecord]) -> Dict[str, Tuple[str, str]]:
  # player_id -> set of normalized (first,last) variants and original variants.
  by_id: Dict[str, Dict[Tuple[str, str], int]] = {}
  by_id_max_season: Dict[str, Dict[Tuple[str, str], int]] = {}
  by_id_norm: Dict[str, Set[Tuple[str, str]]] = {}

  for r in records:
    orig = (r.first_name, r.last_name)
    by_id.setdefault(r.player_id, {})
    by_id[r.player_id][orig] = by_id[r.player_id].get(orig, 0) + 1
    by_id_max_season.setdefault(r.player_id, {})
    by_id_max_season[r.player_id][orig] = max(by_id_max_season[r.player_id].get(orig, 0), r.season)

    norm_pair = (normalize_name_token(r.first_name), normalize_name_token(r.last_name))
    by_id_norm.setdefault(r.player_id, set()).add(norm_pair)

  registry: Dict[str, Tuple[str, str]] = {}

  for player_id in sorted(by_id.keys()):
    variants = sorted(by_id[player_id].keys())
    expected_initial = expected_first_initial(player_id)

    def score_variant(name_pair: Tuple[str, str]) -> Tuple[int, int, int, int, str]:
      first_name, last_name = name_pair
      first_norm = normalize_name_token(first_name)
      match_initial = 1 if (expected_initial and first_norm.startswith(expected_initial)) else 0
      max_season = by_id_max_season.get(player_id, {}).get(name_pair, 0)
      count = by_id[player_id].get(name_pair, 0)
      length = len(first_name) + len(last_name)
      lex = f"{last_name},{first_name}"
      # Prefer: initial match > latest season > most frequent > longer > lexicographic.
      return (match_initial, max_season, count, length, lex)

    registry[player_id] = sorted(variants, key=score_variant, reverse=True)[0]

  return registry


def write_player_registry_csv(path: Path, registry: Dict[str, Tuple[str, str]]) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(
      fh,
      fieldnames=["player_id", "first_name", "last_name", "full_name"],
      lineterminator="\n",
    )
    writer.writeheader()
    for player_id in sorted(registry.keys()):
      first, last = registry[player_id]
      writer.writerow(
        {
          "player_id": player_id,
          "first_name": first,
          "last_name": last,
          "full_name": f"{first} {last}",
        }
      )


def main() -> int:
  parser = argparse.ArgumentParser(description="Build canonical player registry from Retrosheet daily logs (allplayers.csv).")
  parser.add_argument(
    "--daily-logs-dir",
    default=str(DEFAULT_DAILY_LOGS_DIR),
    help="Base directory containing year-partitioned daily logs folders (e.g. 2020DAILY_LOGScsvs).",
  )
  parser.add_argument(
    "--labels",
    default=str(DEFAULT_LABELS_PATH),
    help="Path to processed pa_labels.csv (used to infer seasons + validate ID coverage).",
  )
  parser.add_argument(
    "--out",
    default=str(DEFAULT_OUT_PATH),
    help="Output CSV path (default: scripts/ml/data/player_registry.csv).",
  )
  parser.add_argument(
    "--seasons",
    default="",
    help="Optional comma-separated seasons to load (overrides seasons inferred from labels). Example: 2020,2021",
  )
  parser.add_argument(
    "--fail-on-conflicts",
    action="store_true",
    help="Exit non-zero if conflicting names are found for the same player_id across seasons.",
  )
  args = parser.parse_args()

  labels_path = Path(args.labels)
  seasons: Optional[Set[int]] = None
  if args.seasons.strip():
    seasons = {int(s.strip()) for s in args.seasons.split(",") if s.strip().isdigit()}
  else:
    seasons = extract_seasons_from_labels(labels_path)

  if not seasons:
    print("ERROR: could not determine seasons (provide --seasons or a labels file with season/date).", file=sys.stderr)
    return 1

  daily_logs_dir = Path(args.daily_logs_dir)
  allplayers_files = discover_allplayers_files(daily_logs_dir, seasons)
  if not allplayers_files:
    print(
      "ERROR: no allplayers files found. Expected:"
      + f"\n  {daily_logs_dir}/{{YEAR}}DAILY_LOGScsvs/{{YEAR}}allplayers.csv"
      + f"\nfor seasons {sorted(seasons)}",
      file=sys.stderr,
    )
    return 1

  records = load_allplayers_records(allplayers_files)
  registry = build_registry(records)

  # Report cross-season naming conflicts (common: nicknames, name changes).
  # We resolve deterministically (see build_registry scoring) to keep the pipeline moving.
  by_id_norm: Dict[str, Set[Tuple[str, str]]] = {}
  for r in records:
    norm_pair = (normalize_name_token(r.first_name), normalize_name_token(r.last_name))
    by_id_norm.setdefault(r.player_id, set()).add(norm_pair)
  conflict_ids = [pid for pid, norms in by_id_norm.items() if len(norms) != 1]
  if conflict_ids:
    msg_lines = [
      f"WARNING: {len(conflict_ids)} player_id(s) have conflicting names across seasons.",
      "Resolved deterministically using: first-initial match > latest season > most frequent > longest > lexicographic.",
      "Examples (first 10):",
    ]
    for pid in sorted(conflict_ids)[:10]:
      msg_lines.append(f"- {pid}")
    print("\n".join(msg_lines))
    if args.fail_on_conflicts:
      return 1

  required_ids = extract_player_ids_from_labels(labels_path) if labels_path.exists() else set()
  missing_ids = sorted([pid for pid in required_ids if pid not in registry])

  print(f"Daily logs: {len(allplayers_files)} allplayers.csv files (seasons={sorted(seasons)})")
  out_path = Path(args.out)
  print(f"Registry: {len(registry)} unique player_id rows → {out_path}")
  if required_ids:
    print(f"Labels: {labels_path} (unique player_ids referenced={len(required_ids)})")
    print(f"Coverage: resolved={len(required_ids) - len(missing_ids)}, missing={len(missing_ids)}")
    if missing_ids:
      print("Missing player_id(s) (first 25):")
      for pid in missing_ids[:25]:
        print(f"- {pid}")
      return 1

  write_player_registry_csv(out_path, registry)
  return 0


if __name__ == "__main__":
  raise SystemExit(main())
