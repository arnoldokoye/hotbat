#!/usr/bin/env python3
from __future__ import annotations

import csv
import math
import sys
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Tuple

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


def _build_matrix(rows: List[Dict[str, str]], means: Dict[str, float]) -> List[List[float]]:
    matrix: List[List[float]] = []
    for row in rows:
        values: List[float] = []
        for col in FEATURE_COLUMNS:
            val = _to_float(row.get(col))
            if val is None:
                val = means[col]
            values.append(val)
        matrix.append(values)
    return matrix


def main() -> int:
    try:
        from sklearn.ensemble import GradientBoostingClassifier
    except ImportError:
        sys.exit(
            "Missing scikit-learn. Install with: pip install -r requirements-ml.txt"
        )

    if not INPUT_PATH.exists():
        sys.exit(f"Missing {INPUT_PATH}. Run materialize_pa_features_v1.py first.")

    with INPUT_PATH.open(newline="", encoding="utf-8") as handle:
        reader = csv.DictReader(handle)
        rows = [dict(r) for r in reader]

    if not rows:
        sys.exit("Input file is empty.")
    if "is_hr" not in rows[0]:
        sys.exit("Input missing is_hr label column. Re-run materialize_pa_features_v1.py.")

    missing_cols = [col for col in FEATURE_COLUMNS if col not in rows[0]]
    if missing_cols:
        sys.exit(f"Input missing feature columns: {missing_cols}")
    export_cols = ["game_id", "team_id", "opponent_team_id", "ballpark_id", "player_id", "game_date", "season"]
    export_missing = [col for col in export_cols if col not in rows[0]]
    if export_missing:
        sys.exit(f"Input missing required export columns: {export_missing}")

    train_rows = [r for r in rows if (_to_int(r.get("season") or "0") or 0) <= TRAIN_MAX_SEASON]
    test_rows = [r for r in rows if (_to_int(r.get("season") or "0") or 0) == TEST_SEASON]

    if not train_rows or not test_rows:
        sys.exit("Training or test split is empty.")

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

    x_train = _build_matrix(train_rows, means)
    y_train = []
    for row in train_rows:
        label_raw = (row.get("is_hr") or "").strip()
        if label_raw not in {"0", "1"}:
            sys.exit(f"Invalid is_hr value: {label_raw!r}")
        y_train.append(int(label_raw))

    x_test = _build_matrix(test_rows, means)
    y_test = []
    for row in test_rows:
        label_raw = (row.get("is_hr") or "").strip()
        if label_raw not in {"0", "1"}:
            sys.exit(f"Invalid is_hr value: {label_raw!r}")
        y_test.append(int(label_raw))

    model = GradientBoostingClassifier(
        n_estimators=200,
        max_depth=3,
        learning_rate=0.05,
        subsample=0.8,
        random_state=42,
    )

    model.fit(x_train, y_train)

    train_p = [p[1] for p in model.predict_proba(x_train)]
    test_p = [p[1] for p in model.predict_proba(x_test)]

    train_pairs = list(zip(train_p, y_train))
    test_pairs = list(zip(test_p, y_test))

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
    report("train", y_train, train_p)
    test_log_loss = report("test", y_test, test_p)
    print(f"Test log_loss vs baseline ({BEST_BASELINE_LOGLOSS:.4f}): {test_log_loss - BEST_BASELINE_LOGLOSS:+.6f}")
    print("Calibrated metrics:")
    report("train_cal", y_train, train_p_cal)
    test_cal_log_loss = report("test_cal", y_test, test_p_cal)
    print(
        f"Test_cal log_loss vs baseline ({BEST_BASELINE_LOGLOSS:.4f}): "
        f"{test_cal_log_loss - BEST_BASELINE_LOGLOSS:+.6f}"
    )

    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    cal_path = REPORTS_DIR / "pa_gbdt_v1_calibration.json"
    with cal_path.open("w", encoding="utf-8") as handle:
        import json

        json.dump(
            {
                "raw_test": _calibration_bins(test_pairs),
                "calibrated_test": _calibration_bins(list(zip(test_p_cal, y_test))),
            },
            handle,
            indent=2,
        )

    pred_path = DATA_DIR / "pa_predictions_v1_gbdt.csv"
    with pred_path.open("w", newline="", encoding="utf-8") as handle:
        fieldnames = [
            "pa_id",
            "game_date",
            "game_id",
            "season",
            "player_id",
            "team_id",
            "opponent_team_id",
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
                    "game_id": row.get("game_id", ""),
                    "season": row.get("season", ""),
                    "player_id": row.get("player_id", ""),
                    "team_id": row.get("team_id", ""),
                    "opponent_team_id": row.get("opponent_team_id", ""),
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
