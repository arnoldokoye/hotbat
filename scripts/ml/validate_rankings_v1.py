#!/usr/bin/env python3
from __future__ import annotations

import csv
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, Set, Tuple

DEFAULT_PATH = Path("scripts/ml/data/player_game_hr_rankings_v1_all_seasons.csv")


def _to_int(value: str) -> int | None:
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _to_float(value: str) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def main() -> int:
    args = sys.argv[1:]
    input_path = DEFAULT_PATH
    if args:
        if args[0] in {"-h", "--help"}:
            print("Usage: validate_rankings_v1.py [PATH]")
            return 0
        input_path = Path(args[0])

    if not input_path.exists():
        sys.exit(f"Missing {input_path}")

    with input_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        rows = [dict(r) for r in reader]

    if not rows:
        sys.exit("Ranking file is empty.")

    required = {
        "game_date",
        "game_id",
        "player_id",
        "agg_hr_prob",
        "max_pa_score",
        "rank",
    }
    missing = [col for col in required if col not in rows[0]]
    if missing:
        sys.exit(f"Missing required columns: {missing}")

    seen: Set[Tuple[str, str, str]] = set()
    date_counts: Dict[str, int] = defaultdict(int)
    date_ranks: Dict[str, Set[int]] = defaultdict(set)

    for row in rows:
        game_date = (row.get("game_date") or "").strip()
        game_id = (row.get("game_id") or "").strip()
        player_id = (row.get("player_id") or "").strip()
        if not game_date or not game_id or not player_id:
            sys.exit("Missing game_date/game_id/player_id in a row.")

        key = (game_date, game_id, player_id)
        if key in seen:
            sys.exit(f"Duplicate (game_date, game_id, player_id) row: {key}")
        seen.add(key)

        rank = _to_int((row.get("rank") or "").strip())
        if rank is None or rank <= 0:
            sys.exit(f"Invalid rank for {key}: {row.get('rank')}")

        agg = _to_float((row.get("agg_hr_prob") or "").strip())
        max_score = _to_float((row.get("max_pa_score") or "").strip())
        if agg is None or max_score is None:
            sys.exit(f"Non-numeric agg_hr_prob/max_pa_score for {key}")

        date_counts[game_date] += 1
        date_ranks[game_date].add(rank)

    for date, count in date_counts.items():
        ranks = date_ranks[date]
        if len(ranks) != count:
            sys.exit(f"Rank count mismatch for {date}: {len(ranks)} ranks vs {count} rows")
        expected = set(range(1, count + 1))
        if ranks != expected:
            missing = sorted(expected - ranks)[:5]
            sys.exit(f"Non-contiguous ranks for {date}, missing {missing}")

    print(f"Validation OK: {len(rows)} rows across {len(date_counts)} dates.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
