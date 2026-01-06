#!/usr/bin/env python3
from __future__ import annotations

import csv
import math
import sys
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Tuple

DATA_DIR = Path("scripts/ml/data")
INPUT_PATH = DATA_DIR / "pa_features_v1_enriched.csv"
REPORTS_DIR = DATA_DIR / "reports"

TRAIN_MAX_SEASON = 2023
TEST_SEASON = 2024
BEST_BASELINE_LOGLOSS = 0.1342

FEATURE_COLUMNS = [
    "player_hr_rate_last_10_pa",
    "player_hr_rate_last_25_pa",
    "player_hr_rate_last_50_pa",
    "player_hr_rate_season_to_date",
    "player_hr_rate_career_to_date",
    "pitcher_hr_allowed_rate_last_50_pa",
    "pitcher_hr_allowed_rate_season_to_date",
    "matchup_rate",
    "park_hr_factor",
]

HAND_COLUMN = "pitcher_hand"
BATTER_HAND_COLUMN = "batter_hand"
PARK_BUCKET_COLUMN = "ballpark_id_bucketed"
IS_HOME_COLUMN = "is_home"
L2_LAMBDA = 1e-4
PARK_BUCKETS: List[str] = []


def _to_float(value: str) -> float | None:
    if value is None:
        return None
    v = value.strip()
    if v == "":
        return None
    try:
        return float(v)
    except ValueError:
        return None


def _to_int(value: str) -> int | None:
    if value is None:
        return None
    v = value.strip()
    if v == "":
        return None
    try:
        return int(v)
    except ValueError:
        return None


def _clip_prob(p: float, eps: float = 1e-6) -> float:
    return min(max(p, eps), 1 - eps)


def _sigmoid(z: float) -> float:
    if z >= 0:
        exp_neg = math.exp(-z)
        return 1.0 / (1.0 + exp_neg)
    exp_pos = math.exp(z)
    return exp_pos / (1.0 + exp_pos)


def _log_loss(y: List[int], p: List[float]) -> float:
    if not y:
        return float("nan")
    total = 0.0
    for yi, pi in zip(y, p):
        pp = _clip_prob(pi)
        total += -(yi * math.log(pp) + (1 - yi) * math.log(1 - pp))
    return total / len(y)


def _brier(y: List[int], p: List[float]) -> float:
    if not y:
        return float("nan")
    return sum((pi - yi) ** 2 for yi, pi in zip(y, p)) / len(y)


def _lift_at(pairs: List[Tuple[float, int]], frac: float) -> float | None:
    if not pairs:
        return None
    pairs = sorted(pairs, key=lambda x: x[0], reverse=True)
    total_rate = sum(y for _, y in pairs) / len(pairs)
    if total_rate == 0:
        return None
    top_n = max(1, int(len(pairs) * frac))
    top_rate = sum(y for _, y in pairs[:top_n]) / top_n
    return top_rate / total_rate


def _calibration_bins(pairs: List[Tuple[float, int]], bins: int = 10) -> List[Dict[str, float]]:
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


def _standardize(value: float, mean: float, std: float) -> float:
    if std == 0:
        return 0.0
    return (value - mean) / std


@dataclass
class Model:
    weights: List[float]

    def predict(self, features: List[float]) -> float:
        z = 0.0
        for w, x in zip(self.weights, features):
            z += w * x
        return _sigmoid(z)


def build_feature_vector(row: Dict[str, str], means: Dict[str, float], stds: Dict[str, float]) -> List[float]:
    values: List[float] = []
    # numeric features
    for col in FEATURE_COLUMNS:
        raw = row.get(col)
        val = _to_float(raw) if raw is not None else None
        if val is None:
            val = means[col]
        values.append(_standardize(val, means[col], stds[col]))

    # pitcher_hand one-hot
    hand = (row.get(HAND_COLUMN) or "?").strip().upper()
    values.append(1.0 if hand == "L" else 0.0)
    values.append(1.0 if hand == "R" else 0.0)
    values.append(1.0 if hand not in {"L", "R"} else 0.0)

    # batter_hand one-hot
    batter_hand = (row.get(BATTER_HAND_COLUMN) or "UNKNOWN").strip().upper()
    values.append(1.0 if batter_hand == "L" else 0.0)
    values.append(1.0 if batter_hand == "R" else 0.0)
    values.append(1.0 if batter_hand == "S" else 0.0)
    values.append(1.0 if batter_hand not in {"L", "R", "S"} else 0.0)

    # is_home one-hot
    is_home = (row.get(IS_HOME_COLUMN) or "").strip()
    values.append(1.0 if is_home == "1" else 0.0)
    values.append(1.0 if is_home == "0" else 0.0)
    values.append(1.0 if is_home not in {"0", "1"} else 0.0)

    # ballpark bucketed one-hot
    park_bucket = (row.get(PARK_BUCKET_COLUMN) or "OTHER").strip().upper()
    for key in PARK_BUCKETS:
        values.append(1.0 if park_bucket == key else 0.0)
    values.append(1.0 if park_bucket not in PARK_BUCKETS else 0.0)

    # bias term
    values.append(1.0)
    return values


def train_logreg(
    rows: Iterable[Dict[str, str]],
    means: Dict[str, float],
    stds: Dict[str, float],
    epochs: int = 2,
    lr: float = 0.05,
) -> Model:
    feature_len = (
        len(FEATURE_COLUMNS)
        + 3  # pitcher_hand
        + 4  # batter_hand
        + 3  # is_home
        + len(PARK_BUCKETS)  # bucketed park
        + 1  # park other
        + 1  # bias
    )
    weights = [0.0] * feature_len

    for _ in range(epochs):
        for row in rows:
            y = _to_int(row.get("is_hr") or "0") or 0
            features = build_feature_vector(row, means, stds)
            z = sum(w * x for w, x in zip(weights, features))
            p = _sigmoid(z)
            error = p - y
            for i in range(feature_len):
                reg = L2_LAMBDA * weights[i]
                weights[i] -= lr * (error * features[i] + reg)

    return Model(weights=weights)


def fit_platt_scaling(pairs: List[Tuple[float, int]], epochs: int = 400, lr: float = 0.05) -> Tuple[float, float]:
    a = 0.0
    b = 0.0
    for _ in range(epochs):
        grad_a = 0.0
        grad_b = 0.0
        for p, y in pairs:
            z = a * p + b
            pp = _sigmoid(z)
            grad_a += (pp - y) * p
            grad_b += (pp - y)
        a -= lr * grad_a / len(pairs)
        b -= lr * grad_b / len(pairs)
    return a, b


def apply_platt(p: float, a: float, b: float) -> float:
    z = a * p + b
    return _sigmoid(z)


def main() -> int:
    if not INPUT_PATH.exists():
        sys.exit(f"Missing {INPUT_PATH}. Run materialize_pa_features_v1.py first.")

    with INPUT_PATH.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        rows = [dict(r) for r in reader]

    if not rows:
        sys.exit("Input file is empty.")
    if "is_hr" not in rows[0]:
        sys.exit("Input missing is_hr label column. Re-run materialize_pa_features_v1.py.")

    train_rows = [r for r in rows if (_to_int(r.get("season") or "0") or 0) <= TRAIN_MAX_SEASON]
    test_rows = [r for r in rows if (_to_int(r.get("season") or "0") or 0) == TEST_SEASON]

    if not train_rows or not test_rows:
        sys.exit("Training or test split is empty.")

    # Compute means/stds from training only.
    sums = defaultdict(float)
    counts = defaultdict(int)
    for row in train_rows:
        for col in FEATURE_COLUMNS:
            val = _to_float(row.get(col))
            if val is None:
                continue
            sums[col] += val
            counts[col] += 1

    means = {col: (sums[col] / counts[col]) if counts[col] else 0.0 for col in FEATURE_COLUMNS}

    variances = defaultdict(float)
    for row in train_rows:
        for col in FEATURE_COLUMNS:
            val = _to_float(row.get(col))
            if val is None:
                continue
            variances[col] += (val - means[col]) ** 2

    stds = {
        col: math.sqrt(variances[col] / counts[col]) if counts[col] else 0.0
        for col in FEATURE_COLUMNS
    }

    global PARK_BUCKETS
    park_counts = defaultdict(int)
    for row in train_rows:
        park = (row.get(PARK_BUCKET_COLUMN) or "").strip().upper()
        if park:
            park_counts[park] += 1
    PARK_BUCKETS = [park for park, _ in sorted(park_counts.items(), key=lambda kv: (-kv[1], kv[0]))[:15]]

    model = train_logreg(train_rows, means, stds)

    def score_rows(rowset: List[Dict[str, str]]) -> Tuple[List[int], List[float]]:
        y = []
        p = []
        for row in rowset:
            label_raw = (row.get("is_hr") or "").strip()
            if label_raw not in {"0", "1"}:
                sys.exit(f"Invalid is_hr value: {label_raw!r}")
            label = int(label_raw)
            features = build_feature_vector(row, means, stds)
            pred = model.predict(features)
            y.append(label)
            p.append(pred)
        return y, p

    train_y, train_p = score_rows(train_rows)
    test_y, test_p = score_rows(test_rows)

    train_pairs = list(zip(train_p, train_y))
    test_pairs = list(zip(test_p, test_y))

    a, b = fit_platt_scaling(train_pairs)
    train_p_cal = [apply_platt(p, a, b) for p in train_p]
    test_p_cal = [apply_platt(p, a, b) for p in test_p]

    def report(split: str, y: List[int], p: List[float]) -> float:
        pairs = list(zip(p, y))
        lift_5 = _lift_at(pairs, 0.05)
        lift_10 = _lift_at(pairs, 0.10)
        lift_5_label = f"{lift_5:.3f}" if lift_5 is not None else "nan"
        lift_10_label = f"{lift_10:.3f}" if lift_10 is not None else "nan"
        log_loss = _log_loss(y, p)
        brier = _brier(y, p)
        print(
            f"{split}: log_loss={log_loss:.6f} "
            f"brier={brier:.6f} "
            f"lift@5%={lift_5_label} "
            f"lift@10%={lift_10_label}"
        )
        return log_loss

    print("Raw model metrics:")
    report("train", train_y, train_p)
    test_log_loss = report("test", test_y, test_p)
    print(f"Test log_loss vs baseline ({BEST_BASELINE_LOGLOSS:.4f}): {test_log_loss - BEST_BASELINE_LOGLOSS:+.6f}")
    print("Calibrated metrics:")
    report("train_cal", train_y, train_p_cal)
    test_cal_log_loss = report("test_cal", test_y, test_p_cal)
    print(
        f"Test_cal log_loss vs baseline ({BEST_BASELINE_LOGLOSS:.4f}): "
        f"{test_cal_log_loss - BEST_BASELINE_LOGLOSS:+.6f}"
    )

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    cal_path = REPORTS_DIR / "pa_logreg_v1_matchup_calibration.json"
    with cal_path.open("w", encoding="utf-8") as handle:
        import json

        json.dump(
            {
                "raw_test": _calibration_bins(test_pairs),
                "calibrated_test": _calibration_bins(list(zip(test_p_cal, test_y))),
            },
            handle,
            indent=2,
        )

    pred_path = DATA_DIR / "pa_predictions_v1_matchup.csv"
    with pred_path.open("w", newline="", encoding="utf-8") as handle:
        fieldnames = [
            "pa_id",
            "game_date",
            "season",
            "player_id",
            "pitcher_id",
            "ballpark_id",
            "is_hr",
            "pred_raw",
            "pred_calibrated",
        ]
        writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        for row, pred_raw, pred_cal in zip(test_rows, test_p, test_p_cal):
            writer.writerow(
                {
                    "pa_id": row.get("pa_id", ""),
                    "game_date": row.get("game_date", ""),
                    "season": row.get("season", ""),
                    "player_id": row.get("player_id", ""),
                    "pitcher_id": row.get("pitcher_id", ""),
                    "ballpark_id": row.get("ballpark_id", ""),
                    "is_hr": row.get("is_hr", ""),
                    "pred_raw": f"{pred_raw:.6f}",
                    "pred_calibrated": f"{pred_cal:.6f}",
                }
            )

    print(f"Wrote predictions → {pred_path}")
    print(f"Wrote calibration → {cal_path}")
    print(f"Baseline comparison: best baseline log_loss≈{BEST_BASELINE_LOGLOSS:.4f}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
