#!/usr/bin/env python3
from __future__ import annotations

import csv
import json
import sys
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Tuple

DATA_DIR = Path("scripts/ml/data")
DEFAULT_INPUT_PATH = DATA_DIR / "pa_predictions_v1_gbdt.csv"
DEFAULT_OUTPUT_PATH = DATA_DIR / "player_game_hr_rankings_v1.csv"
FEATURES_PATH = DATA_DIR / "pa_features_v1_enriched.csv"
MODEL_METADATA_PATH = DATA_DIR / "model_versions.json"


def _to_float(value: str) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return 0.0


def _aggregate_scores(scores: List[float]) -> Tuple[float, float]:
    if not scores:
        return 0.0, 0.0
    max_score = max(scores)
    product = 1.0
    for score in scores:
        product *= 1.0 - score
    agg = 1.0 - product
    return agg, max_score


def _extract_pa_index(pa_id: str) -> int | None:
    if ":" not in pa_id:
        return None
    tail = pa_id.rsplit(":", 1)[-1]
    try:
        return int(tail)
    except ValueError:
        return None


def _format_float(value: float | None) -> str:
    if value is None or not isinstance(value, (int, float)):
        return ""
    if not (value == value and value not in (float("inf"), float("-inf"))):
        return ""
    return f"{value:.6f}"


def _top_signal(
    values: Dict[str, float | None],
    means: Dict[str, float | None],
) -> str:
    candidates = [
        ("player_form", "player_recent_hr_rate"),
        ("pitcher_vulnerability", "pitcher_recent_hr_allowed_rate"),
        ("park_boost", "park_hr_factor"),
        ("matchup", "matchup_rate"),
    ]
    best_label = "balanced"
    best_delta = 0.05
    for label, key in candidates:
        value = values.get(key)
        mean = means.get(key)
        if value is None or mean is None or mean <= 0:
            continue
        delta = (value - mean) / mean
        if delta > best_delta:
            best_delta = delta
            best_label = label
    return best_label


def _parse_args() -> Dict[str, Path]:
    args = sys.argv[1:]
    input_path = DEFAULT_INPUT_PATH
    output_path = DEFAULT_OUTPUT_PATH
    idx = 0
    while idx < len(args):
        arg = args[idx]
        if arg == "--input" and idx + 1 < len(args):
            input_path = Path(args[idx + 1])
            idx += 2
            continue
        if arg == "--output" and idx + 1 < len(args):
            output_path = Path(args[idx + 1])
            idx += 2
            continue
        sys.exit("Usage: build_player_game_rankings_v1.py [--input PATH] [--output PATH]")
    return {"input": input_path, "output": output_path}


def main() -> int:
    paths = _parse_args()
    input_path = paths["input"]
    output_path = paths["output"]
    if not input_path.exists():
        sys.exit(f"Missing {input_path}. Run train_pa_gbdt_v1.py first.")

    with input_path.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        rows = [dict(row) for row in reader]

    if not rows:
        sys.exit("Input file is empty.")

    required = {
        "pa_id",
        "game_date",
        "game_id",
        "player_id",
        "team_id",
        "opponent_team_id",
        "ballpark_id",
    }
    missing = [col for col in required if col not in rows[0]]
    if missing:
        sys.exit(f"Input missing required columns: {missing}")

    if not FEATURES_PATH.exists():
        sys.exit(f"Missing {FEATURES_PATH}. Run materialize_pa_features_v1.py first.")

    score_col = "pred_raw" if "pred_raw" in rows[0] else "raw_score"

    grouped: Dict[Tuple[str, str, str], Dict[str, str | List[float] | int | None]] = {}
    by_date_counts = defaultdict(int)

    for row in rows:
        game_date = (row.get("game_date") or "").strip()
        game_id = (row.get("game_id") or "").strip()
        player_id = (row.get("player_id") or "").strip()
        pa_id = (row.get("pa_id") or "").strip()
        if not game_date or not game_id or not player_id:
            sys.exit("Missing game_date/game_id/player_id in input rows.")

        key = (game_date, game_id, player_id)
        entry = grouped.get(key)
        if entry is None:
            earliest_index = _extract_pa_index(pa_id) if pa_id else None
            entry = {
                "game_date": game_date,
                "game_id": game_id,
                "player_id": player_id,
                "team_id": (row.get("team_id") or "").strip(),
                "opponent_team_id": (row.get("opponent_team_id") or "").strip(),
                "ballpark_id": (row.get("ballpark_id") or "").strip(),
                "scores": [],
                "earliest_pa_id": pa_id,
                "earliest_pa_index": earliest_index,
            }
            grouped[key] = entry
        if pa_id:
            current_index = _extract_pa_index(pa_id)
            earliest_index = entry.get("earliest_pa_index")
            earliest_pa_id = entry.get("earliest_pa_id")
            if earliest_index is None or (
                current_index is not None and current_index < earliest_index
            ):
                entry["earliest_pa_index"] = current_index
                entry["earliest_pa_id"] = pa_id
            elif current_index == earliest_index and pa_id < (earliest_pa_id or pa_id):
                entry["earliest_pa_id"] = pa_id
        entry["scores"].append(_to_float(row.get(score_col) or "0"))

    earliest_pa_ids = {
        entry.get("earliest_pa_id")
        for entry in grouped.values()
        if isinstance(entry.get("earliest_pa_id"), str) and entry.get("earliest_pa_id")
    }

    features_by_pa: Dict[str, Dict[str, float | None]] = {}
    with FEATURES_PATH.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        required_features = {
            "pa_id",
            "player_hr_rate_last_50_pa",
            "pitcher_hr_allowed_rate_last_50_pa",
            "park_hr_factor",
            "matchup_rate",
        }
        missing_feature_cols = [col for col in required_features if col not in reader.fieldnames or []]
        if missing_feature_cols:
            sys.exit(f"{FEATURES_PATH} missing required columns: {missing_feature_cols}")
        for row in reader:
            pa_id = (row.get("pa_id") or "").strip()
            if pa_id not in earliest_pa_ids:
                continue
            features_by_pa[pa_id] = {
                "player_recent_hr_rate": _to_float(row.get("player_hr_rate_last_50_pa") or ""),
                "pitcher_recent_hr_allowed_rate": _to_float(
                    row.get("pitcher_hr_allowed_rate_last_50_pa") or "",
                ),
                "park_hr_factor": _to_float(row.get("park_hr_factor") or ""),
                "matchup_rate": _to_float(row.get("matchup_rate") or ""),
            }

    output_rows: List[Dict[str, str]] = []
    for key, entry in grouped.items():
        scores = entry["scores"]
        agg, max_score = _aggregate_scores(scores)
        explain = features_by_pa.get(entry.get("earliest_pa_id") or "", {})
        output_rows.append(
            {
                "game_date": entry["game_date"],
                "game_id": entry["game_id"],
                "player_id": entry["player_id"],
                "team_id": entry["team_id"],
                "opponent_team_id": entry["opponent_team_id"],
                "ballpark_id": entry["ballpark_id"],
                "agg_hr_prob": agg,
                "max_pa_score": max_score,
                "player_recent_hr_rate": explain.get("player_recent_hr_rate"),
                "pitcher_recent_hr_allowed_rate": explain.get("pitcher_recent_hr_allowed_rate"),
                "park_hr_factor": explain.get("park_hr_factor"),
                "matchup_rate": explain.get("matchup_rate"),
            }
        )

    output_rows.sort(
        key=lambda r: (
            r["game_date"],
            r["game_id"],
            -float(r["agg_hr_prob"]),
            -float(r["max_pa_score"]),
            r["player_id"],
        )
    )

    ranked_rows: List[Dict[str, str]] = []
    current_date = ""
    rank = 0
    for row in output_rows:
        if row["game_date"] != current_date:
            current_date = row["game_date"]
            rank = 0
        rank += 1
        by_date_counts[current_date] += 1
        ranked_rows.append({**row, "rank": str(rank)})

    if len(ranked_rows) != len(output_rows):
        sys.exit("Ranking row count changed; aborting.")

    date_sums: Dict[str, Dict[str, float]] = defaultdict(lambda: defaultdict(float))
    date_counts: Dict[str, Dict[str, int]] = defaultdict(lambda: defaultdict(int))
    for row in ranked_rows:
        date = row["game_date"]
        for key in [
            "player_recent_hr_rate",
            "pitcher_recent_hr_allowed_rate",
            "park_hr_factor",
            "matchup_rate",
        ]:
            value = row.get(key)
            if isinstance(value, (int, float)) and value == value:
                date_sums[date][key] += float(value)
                date_counts[date][key] += 1

    date_means: Dict[str, Dict[str, float | None]] = {}
    for date, sums in date_sums.items():
        date_means[date] = {}
        for key, total in sums.items():
            count = date_counts[date][key]
            date_means[date][key] = total / count if count else None

    top_signal_counts: Dict[str, int] = defaultdict(int)
    non_null_counts: Dict[str, int] = defaultdict(int)
    for row in ranked_rows:
        date = row["game_date"]
        means = date_means.get(date, {})
        values = {
            "player_recent_hr_rate": row.get("player_recent_hr_rate"),
            "pitcher_recent_hr_allowed_rate": row.get("pitcher_recent_hr_allowed_rate"),
            "park_hr_factor": row.get("park_hr_factor"),
            "matchup_rate": row.get("matchup_rate"),
        }
        for key, value in values.items():
            if isinstance(value, (int, float)) and value == value:
                non_null_counts[key] += 1
        top_signal = _top_signal(values, means)
        row["top_signal"] = top_signal
        top_signal_counts[top_signal] += 1

    for date, count in by_date_counts.items():
        expected = 1
        for row in ranked_rows:
            if row["game_date"] != date:
                continue
            if int(row["rank"]) != expected:
                sys.exit(f"Non-monotonic rank for {date}: expected {expected} got {row['rank']}")
            expected += 1
        if expected - 1 != count:
            sys.exit(f"Rank count mismatch for {date}: expected {count}, saw {expected - 1}")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("w", newline="", encoding="utf-8") as handle:
        fieldnames = [
            "game_date",
            "game_id",
            "player_id",
            "team_id",
            "opponent_team_id",
            "ballpark_id",
            "agg_hr_prob",
            "max_pa_score",
            "player_recent_hr_rate",
            "pitcher_recent_hr_allowed_rate",
            "park_hr_factor",
            "matchup_rate",
            "top_signal",
            "rank",
        ]
        writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        for row in ranked_rows:
            writer.writerow(
                {
                    "game_date": row["game_date"],
                    "game_id": row["game_id"],
                    "player_id": row["player_id"],
                    "team_id": row["team_id"],
                    "opponent_team_id": row["opponent_team_id"],
                    "ballpark_id": row["ballpark_id"],
                    "agg_hr_prob": _format_float(row.get("agg_hr_prob")),
                    "max_pa_score": _format_float(row.get("max_pa_score")),
                    "player_recent_hr_rate": _format_float(row.get("player_recent_hr_rate")),
                    "pitcher_recent_hr_allowed_rate": _format_float(row.get("pitcher_recent_hr_allowed_rate")),
                    "park_hr_factor": _format_float(row.get("park_hr_factor")),
                    "matchup_rate": _format_float(row.get("matchup_rate")),
                    "top_signal": row.get("top_signal") or "balanced",
                    "rank": row["rank"],
                }
            )

    print(f"Wrote {len(ranked_rows)} rows → {output_path}")
    if ranked_rows:
        total = len(ranked_rows)
        for key in [
            "player_recent_hr_rate",
            "pitcher_recent_hr_allowed_rate",
            "park_hr_factor",
            "matchup_rate",
        ]:
            pct = (non_null_counts.get(key, 0) / total) * 100
            print("{}: non-null {:.2f}%".format(key, pct))
        top_signals = sorted(top_signal_counts.items(), key=lambda kv: (-kv[1], kv[0]))[:5]
        if top_signals:
            print("top_signal distribution:")
            for label, count in top_signals:
                print(f"  {label}: {count}")
    sample_date = next(iter(sorted(by_date_counts)), "")
    if sample_date:
        print(f"Sample date {sample_date}: {by_date_counts[sample_date]} players")
        sample_rows = [r for r in ranked_rows if r["game_date"] == sample_date][:10]
        for row in sample_rows:
            print(
                f"#{row['rank']} {row['player_id']} agg={_format_float(row.get('agg_hr_prob'))} max={_format_float(row.get('max_pa_score'))}"
            )

    metadata = {
        "model_version": "gbdt_v1",
        "rankings_file": output_path.name,
        "generated_at": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
    }
    MODEL_METADATA_PATH.write_text(json.dumps(metadata, indent=2), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
