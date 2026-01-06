#!/usr/bin/env python3
from __future__ import annotations

import csv
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple

DEFAULT_RANKINGS = Path("scripts/ml/data/player_game_hr_rankings_v1_all_seasons.csv")
DEFAULT_FEATURES = Path("scripts/ml/data/pa_features_v1.csv")
DEFAULT_LABELS = Path("scripts/ml/data/pa_labels_v1.csv")
DEFAULT_BASELINE = Path("scripts/ml/data/player_game_baseline.csv")
FALLBACK_BASELINE = Path("public/data/player_game_baseline.csv")
DEFAULT_OUTPUT = Path("scripts/ml/data/hr_picks_monitoring_v1.csv")


def _to_float(value: str) -> Optional[float]:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _to_int(value: str) -> Optional[int]:
    try:
        return int(value)
    except (TypeError, ValueError):
        return None


def _parse_args(argv: List[str]) -> Dict[str, Path]:
    paths = {
        "rankings": DEFAULT_RANKINGS,
        "features": DEFAULT_FEATURES,
        "labels": DEFAULT_LABELS,
        "baseline": DEFAULT_BASELINE,
        "output": DEFAULT_OUTPUT,
    }
    idx = 0
    while idx < len(argv):
        arg = argv[idx]
        if arg in {"-h", "--help"}:
            print(
                "Usage: monitor_hr_picks_v1.py "
                "[--rankings PATH] [--features PATH] [--labels PATH] "
                "[--baseline PATH] [--output PATH]",
            )
            sys.exit(0)
        if arg.startswith("--") and idx + 1 < len(argv):
            key = arg[2:]
            if key in paths:
                paths[key] = Path(argv[idx + 1])
                idx += 2
                continue
        idx += 1
    return paths


def _load_labels(path: Path) -> Dict[str, int]:
    if not path.exists():
        sys.exit(f"Missing {path}")
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            sys.exit(f"{path} is empty.")
        if "pa_id" not in reader.fieldnames or "is_hr" not in reader.fieldnames:
            sys.exit(f"{path} missing required columns: pa_id, is_hr")
        labels: Dict[str, int] = {}
        for row in reader:
            pa_id = (row.get("pa_id") or "").strip()
            if not pa_id:
                continue
            raw = (row.get("is_hr") or "").strip()
            if raw not in {"0", "1"}:
                sys.exit(f"Invalid is_hr value for pa_id={pa_id}: {raw!r}")
            labels[pa_id] = 1 if raw == "1" else 0
    if not labels:
        sys.exit(f"{path} contains no labels.")
    return labels


def _load_player_game_hr(
    features_path: Path, labels: Dict[str, int]
) -> Tuple[Dict[Tuple[str, str, str], int], Dict[Tuple[str, str], int]]:
    if not features_path.exists():
        sys.exit(f"Missing {features_path}")
    with features_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            sys.exit(f"{features_path} is empty.")
        required = {"pa_id", "game_date", "game_id", "player_id"}
        missing = [col for col in required if col not in reader.fieldnames]
        if missing:
            sys.exit(f"{features_path} missing required columns: {missing}")

        player_game_hr: Dict[Tuple[str, str, str], int] = {}
        player_date_hr: Dict[Tuple[str, str], int] = {}
        missing_labels = 0

        for row in reader:
            pa_id = (row.get("pa_id") or "").strip()
            if not pa_id:
                continue
            label = labels.get(pa_id)
            if label is None:
                missing_labels += 1
                continue
            date = (row.get("game_date") or "").strip()
            game_id = (row.get("game_id") or "").strip()
            player_id = (row.get("player_id") or "").strip()
            if not date or not game_id or not player_id:
                sys.exit("Missing game_date/game_id/player_id in pa_features_v1.csv")

            key = (date, game_id, player_id)
            if key not in player_game_hr:
                player_game_hr[key] = 0
            if label == 1:
                player_game_hr[key] = 1

            date_key = (date, player_id)
            if date_key not in player_date_hr:
                player_date_hr[date_key] = 0
            if label == 1:
                player_date_hr[date_key] = 1

    if missing_labels:
        sys.exit(f"Missing labels for {missing_labels} PA rows.")
    return player_game_hr, player_date_hr


def _load_rankings(path: Path) -> Dict[str, List[Tuple[int, str, str, float]]]:
    if not path.exists():
        sys.exit(f"Missing {path}")
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            sys.exit(f"{path} is empty.")
        required = {"game_date", "game_id", "player_id", "rank", "agg_hr_prob"}
        missing = [col for col in required if col not in reader.fieldnames]
        if missing:
            sys.exit(f"{path} missing required columns: {missing}")

        by_date: Dict[str, List[Tuple[int, str, str, float]]] = defaultdict(list)
        for row in reader:
            date = (row.get("game_date") or "").strip()
            game_id = (row.get("game_id") or "").strip()
            player_id = (row.get("player_id") or "").strip()
            if not date or not game_id or not player_id:
                sys.exit("Missing game_date/game_id/player_id in rankings.")
            rank = _to_int((row.get("rank") or "").strip())
            prob = _to_float((row.get("agg_hr_prob") or "").strip())
            if rank is None or prob is None:
                sys.exit(f"Invalid rank/agg_hr_prob for {date} {player_id}")
            by_date[date].append((rank, game_id, player_id, prob))
    return by_date


def _load_baseline(path: Path) -> Dict[str, List[Tuple[str, float, float]]]:
    if not path.exists():
        return {}
    with path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        if not reader.fieldnames:
            return {}
        required = {"player_id", "game_date", "baseline_hr_score", "hr_rate_last_50"}
        missing = [col for col in required if col not in reader.fieldnames]
        if missing:
            return {}
        by_date: Dict[str, List[Tuple[str, float, float]]] = defaultdict(list)
        for row in reader:
            date = (row.get("game_date") or "").strip()
            player_id = (row.get("player_id") or "").strip()
            if not date or not player_id:
                continue
            baseline = _to_float((row.get("baseline_hr_score") or "").strip())
            hr_rate = _to_float((row.get("hr_rate_last_50") or "").strip())
            if baseline is None or hr_rate is None:
                continue
            by_date[date].append((player_id, baseline, hr_rate))
    return by_date


def _hit_rate(keys: Iterable[Tuple[str, str, str]], hr_map: Dict[Tuple[str, str, str], int]) -> Optional[float]:
    keys = list(keys)
    if not keys:
        return None
    hits = sum(hr_map.get(key, 0) for key in keys)
    return hits / len(keys)


def _hit_rate_player_date(
    keys: Iterable[Tuple[str, str]], hr_map: Dict[Tuple[str, str], int]
) -> Optional[float]:
    keys = list(keys)
    if not keys:
        return None
    hits = sum(hr_map.get(key, 0) for key in keys)
    return hits / len(keys)


def main() -> int:
    paths = _parse_args(sys.argv[1:])
    labels = _load_labels(paths["labels"])
    player_game_hr, player_date_hr = _load_player_game_hr(paths["features"], labels)

    rankings = _load_rankings(paths["rankings"])
    baseline_path = paths["baseline"]
    if not baseline_path.exists() and FALLBACK_BASELINE.exists():
        baseline_path = FALLBACK_BASELINE
    baseline = _load_baseline(baseline_path)

    date_total: Dict[str, int] = defaultdict(int)
    date_hr: Dict[str, int] = defaultdict(int)
    for (date, _game_id, _player_id), hr in player_game_hr.items():
        date_total[date] += 1
        if hr:
            date_hr[date] += 1

    output_rows = []
    for date in sorted(rankings.keys()):
        ranked = sorted(rankings[date], key=lambda r: r[0])
        top5 = ranked[:5]
        top10 = ranked[:10]

        top5_keys = [(date, game_id, player_id) for _rank, game_id, player_id, _prob in top5]
        top10_keys = [(date, game_id, player_id) for _rank, game_id, player_id, _prob in top10]

        top5_rate = _hit_rate(top5_keys, player_game_hr)
        top10_rate = _hit_rate(top10_keys, player_game_hr)

        expected_random = None
        if date_total.get(date, 0):
            expected_random = date_hr.get(date, 0) / date_total[date]

        baseline_rate = None
        if baseline:
            rows = baseline.get(date, [])
            if rows:
                rows.sort(key=lambda r: (-r[1], -r[2], r[0]))
                baseline_keys = [(date, player_id) for player_id, _b, _hr in rows[:5]]
                baseline_rate = _hit_rate_player_date(baseline_keys, player_date_hr)

        output_rows.append(
            {
                "game_date": date,
                "top_5_hit_rate": "" if top5_rate is None else f"{top5_rate:.4f}",
                "top_10_hit_rate": "" if top10_rate is None else f"{top10_rate:.4f}",
                "baseline_top_5_hit_rate": "" if baseline_rate is None else f"{baseline_rate:.4f}",
                "expected_random_rate": "" if expected_random is None else f"{expected_random:.4f}",
            }
        )

    if not output_rows:
        sys.exit("No rankings to evaluate.")

    output_path = paths["output"]
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(
            handle,
            fieldnames=[
                "game_date",
                "top_5_hit_rate",
                "top_10_hit_rate",
                "baseline_top_5_hit_rate",
                "expected_random_rate",
            ],
            lineterminator="\n",
        )
        writer.writeheader()
        writer.writerows(output_rows)

    latest = output_rows[-1]
    print(f"Wrote {len(output_rows)} dates → {output_path}")
    print(
        "Latest date {date}: top5={top5} top10={top10} baseline5={base} random={rand}".format(
            date=latest["game_date"],
            top5=latest["top_5_hit_rate"],
            top10=latest["top_10_hit_rate"],
            base=latest["baseline_top_5_hit_rate"] or "n/a",
            rand=latest["expected_random_rate"],
        )
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
