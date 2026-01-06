#!/usr/bin/env python3
from __future__ import annotations

import csv
import math
import shutil
import sys
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path

DATA_DIR = Path("scripts/ml/data")
FEATURES_V1 = DATA_DIR / "pa_features_v1.csv"
LABELS_V1 = DATA_DIR / "pa_labels_v1.csv"
FEATURES_SRC = DATA_DIR / "processed" / "pa_events.csv"
LABELS_SRC = DATA_DIR / "processed" / "pa_labels.csv"
REPORTS_DIR = DATA_DIR / "reports"

TRAIN_SEASON_MAX = 2023
TEST_SEASON = 2024

REQUIRED_FEATURE_COLS = [
    "pa_id",
    "game_date",
    "season",
    "player_id",
    "team_id",
    "opponent_team_id",
    "ballpark_id",
    "pitcher_id",
    "pitcher_hand",
    "is_home",
    "pa_index_in_game",
]

REQUIRED_LABEL_COLS = ["pa_id", "is_hr"]


@dataclass
class Rate:
    hr: int = 0
    pa: int = 0

    def add(self, is_hr: int) -> None:
        self.hr += is_hr
        self.pa += 1

    def rate(self) -> float:
        if self.pa == 0:
            return 0.0
        return self.hr / self.pa


def materialize_v1() -> None:
    if not FEATURES_V1.exists():
        if not FEATURES_SRC.exists():
            sys.exit(f"Missing {FEATURES_SRC}; cannot materialize {FEATURES_V1}.")
        FEATURES_V1.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(FEATURES_SRC, FEATURES_V1)
        print(f"Materialized {FEATURES_V1} from {FEATURES_SRC}.")
    if not LABELS_V1.exists():
        if not LABELS_SRC.exists():
            sys.exit(f"Missing {LABELS_SRC}; cannot materialize {LABELS_V1}.")
        LABELS_V1.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(LABELS_SRC, LABELS_V1)
        print(f"Materialized {LABELS_V1} from {LABELS_SRC}.")


def read_labels(path: Path) -> tuple[dict[str, int], dict[str, int]]:
    labels: dict[str, int] = {}
    seen: set[str] = set()
    duplicates = 0
    missing_pa = 0
    invalid_hr = 0
    hr_count = 0

    with path.open(newline="") as handle:
        reader = csv.DictReader(handle)
        header = reader.fieldnames or []
        missing_cols = [c for c in REQUIRED_LABEL_COLS if c not in header]
        if missing_cols:
            sys.exit(f"{path} missing required label columns: {missing_cols}")

        for row in reader:
            pa_id = (row.get("pa_id") or "").strip()
            if not pa_id:
                missing_pa += 1
                continue
            if pa_id in seen:
                duplicates += 1
                continue
            seen.add(pa_id)

            is_hr_raw = (row.get("is_hr") or "").strip()
            if is_hr_raw not in {"0", "1"}:
                invalid_hr += 1
                continue
            is_hr = int(is_hr_raw)
            labels[pa_id] = is_hr
            hr_count += is_hr

    if duplicates or missing_pa or invalid_hr:
        sys.exit(
            "Label validation failed: "
            f"duplicates={duplicates}, missing_pa_id={missing_pa}, invalid_is_hr={invalid_hr}"
        )

    stats = {
        "labels_total": len(labels),
        "labels_hr_count": hr_count,
    }
    return labels, stats


def validate_features_header(path: Path) -> list[str]:
    with path.open(newline="") as handle:
        reader = csv.reader(handle)
        header = next(reader, [])
    missing = [c for c in REQUIRED_FEATURE_COLS if c not in header]
    if missing:
        sys.exit(f"{path} missing required feature columns: {missing}")
    if "is_hr" in header:
        sys.exit(f"{path} contains is_hr; features must not include outcome labels.")
    return header


def scan_training_features(path: Path, labels: dict[str, int]) -> dict[str, dict]:
    seen: set[str] = set()
    duplicates = 0
    missing_keys = 0
    missing_labels = 0

    global_rate = Rate()
    per_player = defaultdict(Rate)
    per_player_season = defaultdict(Rate)
    per_player_hand = defaultdict(Rate)
    per_park = defaultdict(Rate)

    total_rows = 0

    with path.open(newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            total_rows += 1
            pa_id = (row.get("pa_id") or "").strip()
            if not pa_id:
                missing_keys += 1
                continue
            if pa_id in seen:
                duplicates += 1
                continue
            seen.add(pa_id)

            missing = False
            for key in REQUIRED_FEATURE_COLS:
                if not (row.get(key) or "").strip():
                    missing = True
                    break
            if missing:
                missing_keys += 1
                continue

            label = labels.get(pa_id)
            if label is None:
                missing_labels += 1
                continue

            season = int(row["season"])
            if season > TRAIN_SEASON_MAX:
                continue

            player_id = row["player_id"].strip()
            park_id = row["ballpark_id"].strip()
            pitcher_hand = row["pitcher_hand"].strip().upper()

            global_rate.add(label)
            per_player[player_id].add(label)
            per_player_season[(player_id, season)].add(label)
            per_park[park_id].add(label)
            if pitcher_hand in {"L", "R"}:
                per_player_hand[(player_id, pitcher_hand)].add(label)
            else:
                # Handedness is required for split baselines; treat missing as invalid.
                missing_keys += 1

    if duplicates or missing_keys or missing_labels:
        sys.exit(
            "Feature validation failed: "
            f"duplicates={duplicates}, missing_keys={missing_keys}, missing_labels={missing_labels}"
        )

    return {
        "total_rows": total_rows,
        "unique_pa_id_count": len(seen),
        "global_rate": global_rate,
        "per_player": per_player,
        "per_player_season": per_player_season,
        "per_player_hand": per_player_hand,
        "per_park": per_park,
    }


def latest_player_rates(per_player_season: dict[tuple[str, int], Rate]) -> dict[str, float]:
    latest: dict[str, tuple[int, float]] = {}
    for (player_id, season), rate in per_player_season.items():
        if rate.pa == 0:
            continue
        prev = latest.get(player_id)
        if prev is None or season > prev[0]:
            latest[player_id] = (season, rate.rate())
    return {player_id: r for player_id, (_, r) in latest.items()}


def clip_prob(p: float, eps: float = 1e-6) -> float:
    return min(max(p, eps), 1 - eps)


def calibration_bins(pairs: list[tuple[float, int]], bins: int = 10) -> list[dict[str, float]]:
    if not pairs:
        return []
    pairs = sorted(pairs, key=lambda x: x[0])
    n = len(pairs)
    output = []
    for idx in range(bins):
        start = int(idx * n / bins)
        end = int((idx + 1) * n / bins)
        chunk = pairs[start:end]
        if not chunk:
            continue
        avg_pred = sum(p for p, _ in chunk) / len(chunk)
        actual = sum(y for _, y in chunk) / len(chunk)
        output.append(
            {
                "bin": idx + 1,
                "count": len(chunk),
                "avg_pred": avg_pred,
                "actual_rate": actual,
            }
        )
    return output


def lift_at(pairs: list[tuple[float, int]], frac: float) -> float | None:
    if not pairs:
        return None
    pairs = sorted(pairs, key=lambda x: x[0], reverse=True)
    total_rate = sum(y for _, y in pairs) / len(pairs)
    if total_rate == 0:
        return None
    top_n = max(1, int(len(pairs) * frac))
    top_rate = sum(y for _, y in pairs[:top_n]) / top_n
    return top_rate / total_rate


def evaluate(
    path: Path,
    labels: dict[str, int],
    global_rate: Rate,
    per_player: dict[str, Rate],
    per_player_season: dict[tuple[str, int], Rate],
    per_player_hand: dict[tuple[str, str], Rate],
    per_park: dict[str, Rate],
) -> tuple[list[dict[str, str]], dict[str, list[dict[str, float]]]]:
    global_p = clip_prob(global_rate.rate())
    player_latest = latest_player_rates(per_player_season)

    park_factors: dict[str, float] = {}
    for park_id, rate in per_park.items():
        park_rate = rate.rate()
        park_factors[park_id] = 1.0 if global_p == 0 else park_rate / global_p

    pairs: dict[str, dict[str, list[tuple[float, int]]]] = {
        "global_rate": {"train": [], "test": []},
        "player_season_rate": {"train": [], "test": []},
        "player_park_rate": {"train": [], "test": []},
        "player_hand_rate": {"train": [], "test": []},
    }

    with path.open(newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            pa_id = (row.get("pa_id") or "").strip()
            if not pa_id:
                continue
            label = labels.get(pa_id)
            if label is None:
                continue
            season = int(row["season"])
            if season > TEST_SEASON:
                continue
            split = "train" if season <= TRAIN_SEASON_MAX else "test"

            player_id = row["player_id"].strip()
            park_id = row["ballpark_id"].strip()
            pitcher_hand = row["pitcher_hand"].strip().upper()

            # Global baseline
            pairs["global_rate"][split].append((global_p, label))

            # Player season baseline
            if season <= TRAIN_SEASON_MAX:
                season_rate = per_player_season.get((player_id, season), Rate()).rate()
            else:
                season_rate = player_latest.get(player_id, per_player[player_id].rate())
            player_rate = season_rate if season_rate > 0 else per_player[player_id].rate()
            if player_rate == 0:
                player_rate = global_p
            player_rate = clip_prob(player_rate)
            pairs["player_season_rate"][split].append((player_rate, label))

            # Player + park baseline
            park_factor = park_factors.get(park_id, 1.0)
            park_rate = clip_prob(player_rate * park_factor)
            pairs["player_park_rate"][split].append((park_rate, label))

            # Player + handedness baseline
            hand_rate = per_player_hand.get((player_id, pitcher_hand), Rate()).rate()
            if hand_rate == 0:
                hand_rate = player_rate
            pairs["player_hand_rate"][split].append((clip_prob(hand_rate), label))

    results: list[dict[str, str]] = []
    calibrations: dict[str, list[dict[str, float]]] = {}

    for baseline, splits in pairs.items():
        for split_name, items in splits.items():
            if not items:
                continue
            log_loss = -sum(
                y * math.log(p) + (1 - y) * math.log(1 - p) for p, y in items
            ) / len(items)
            brier = sum((p - y) ** 2 for p, y in items) / len(items)
            lift_5 = lift_at(items, 0.05)
            lift_10 = lift_at(items, 0.10)
            results.append(
                {
                    "baseline": baseline,
                    "split": split_name,
                    "count": str(len(items)),
                    "log_loss": f"{log_loss:.6f}",
                    "brier": f"{brier:.6f}",
                    "lift_top5": f"{lift_5:.3f}" if lift_5 is not None else "",
                    "lift_top10": f"{lift_10:.3f}" if lift_10 is not None else "",
                }
            )

        if splits["test"]:
            calibrations[baseline] = calibration_bins(splits["test"])

    return results, calibrations


def write_reports(results: list[dict[str, str]], calibrations: dict[str, list[dict[str, float]]]) -> None:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    summary_path = REPORTS_DIR / "baseline_eval_v1.csv"
    with summary_path.open("w", newline="") as handle:
        fieldnames = ["baseline", "split", "count", "log_loss", "brier", "lift_top5", "lift_top10"]
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(results)

    calib_path = REPORTS_DIR / "baseline_eval_v1_calibration.json"
    with calib_path.open("w") as handle:
        import json

        json.dump(calibrations, handle, indent=2)

    print(f"Wrote {summary_path} and {calib_path}")


def main() -> None:
    materialize_v1()

    labels, label_stats = read_labels(LABELS_V1)
    validate_features_header(FEATURES_V1)

    training_stats = scan_training_features(FEATURES_V1, labels)
    global_rate = training_stats["global_rate"]
    hr_rate = global_rate.rate()
    print(
        "Dataset summary:",
        f"rows={training_stats['total_rows']}",
        f"unique_pa_id={training_stats['unique_pa_id_count']}",
        f"label_rows={label_stats['labels_total']}",
        f"hr_count={label_stats['labels_hr_count']}",
        f"hr_rate={hr_rate:.6f}",
    )

    results, calibrations = evaluate(
        FEATURES_V1,
        labels,
        global_rate,
        training_stats["per_player"],
        training_stats["per_player_season"],
        training_stats["per_player_hand"],
        training_stats["per_park"],
    )

    for row in results:
        print(
            f"{row['baseline']} [{row['split']}] "
            f"log_loss={row['log_loss']} brier={row['brier']} "
            f"lift@5%={row['lift_top5']} lift@10%={row['lift_top10']}"
        )

    write_reports(results, calibrations)


if __name__ == "__main__":
    main()
