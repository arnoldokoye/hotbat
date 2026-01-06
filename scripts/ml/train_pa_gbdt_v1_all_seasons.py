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
OUTPUT_PATH = DATA_DIR / "pa_predictions_v1_gbdt_all_seasons.csv"
REPORTS_DIR = DATA_DIR / "reports"

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


def _score_rows(
    rows: List[Dict[str, str]],
    model,
    means: Dict[str, float],
    calibrator: Tuple[float, float] | None,
) -> Tuple[List[float], List[float], List[int]]:
    x = _build_matrix(rows, means)
    raw = [p[1] for p in model.predict_proba(x)]
    if calibrator:
        a, b = calibrator
        cal = [apply_platt(p, a, b) for p in raw]
    else:
        cal = raw[:]
    y = []
    for row in rows:
        label_raw = (row.get("is_hr") or "").strip()
        if label_raw not in {"0", "1"}:
            sys.exit(f"Invalid is_hr value: {label_raw!r}")
        y.append(int(label_raw))
    return raw, cal, y


def main() -> int:
    try:
        from sklearn.ensemble import GradientBoostingClassifier
    except ImportError:
        sys.exit("Missing scikit-learn. Install with: pip install -r requirements-ml.txt")

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

    seasons = sorted(
        {(_to_int(r.get("season") or "0") or 0) for r in rows if (r.get("season") or "").strip()}
    )
    if not seasons:
        sys.exit("No seasons found in input.")

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)

    summary: Dict[str, Dict[str, float]] = {}
    predictions: List[Dict[str, str]] = []

    for test_season in seasons:
        if test_season <= min(seasons):
            continue
        train_rows = [r for r in rows if (_to_int(r.get("season") or "0") or 0) < test_season]
        test_rows = [r for r in rows if (_to_int(r.get("season") or "0") or 0) == test_season]

        if not train_rows or not test_rows:
            continue

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

        model = GradientBoostingClassifier(
            n_estimators=200,
            max_depth=3,
            learning_rate=0.05,
            subsample=0.8,
            random_state=42,
        )
        model.fit(x_train, y_train)

        train_raw, _, train_y = _score_rows(train_rows, model, means, None)
        a, b = fit_platt_scaling(list(zip(train_raw, train_y)))

        test_raw, test_cal, test_y = _score_rows(test_rows, model, means, (a, b))

        train_pairs = list(zip(train_raw, train_y))
        test_pairs = list(zip(test_raw, test_y))

        summary[str(test_season)] = {
            "train_log_loss": _log_loss(train_y, train_raw),
            "test_log_loss": _log_loss(test_y, test_raw),
            "train_brier": _brier(train_y, train_raw),
            "test_brier": _brier(test_y, test_raw),
            "train_lift_5": _lift_at(train_pairs, 0.05) or float("nan"),
            "test_lift_5": _lift_at(test_pairs, 0.05) or float("nan"),
            "train_lift_10": _lift_at(train_pairs, 0.10) or float("nan"),
            "test_lift_10": _lift_at(test_pairs, 0.10) or float("nan"),
        }

        for row, pred_raw, pred_cal in zip(test_rows, test_raw, test_cal):
            predictions.append(
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

        print(
            f"Season {test_season}: test log_loss={summary[str(test_season)]['test_log_loss']:.6f} "
            f"lift@5%={summary[str(test_season)]['test_lift_5']:.3f}"
        )

    if not predictions:
        sys.exit("No season predictions generated. Check input seasons.")

    with OUTPUT_PATH.open("w", newline="", encoding="utf-8") as handle:
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
        writer.writerows(predictions)

    report_path = REPORTS_DIR / "pa_gbdt_v1_all_seasons_summary.csv"
    with report_path.open("w", newline="", encoding="utf-8") as handle:
        fieldnames = [
            "season",
            "train_log_loss",
            "test_log_loss",
            "train_brier",
            "test_brier",
            "train_lift_5",
            "test_lift_5",
            "train_lift_10",
            "test_lift_10",
        ]
        writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator="\n")
        writer.writeheader()
        for season, metrics in summary.items():
            writer.writerow({"season": season, **metrics})

    print(f"Wrote predictions → {OUTPUT_PATH}")
    print(f"Wrote summary → {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
