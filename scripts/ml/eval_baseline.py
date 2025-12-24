#!/usr/bin/env python3
"""
Evaluate simple, deterministic baselines on Retrosheet PA datasets (no ML model).

Inputs:
  --events  path to processed/pa_events.csv
  --labels  path to processed/pa_labels.csv
  --holdout-season <int>  (required)
  --min-pa <int>          (default: 50) threshold for batter-season rate usage

Baselines:
  1) Batter recent-season HR/PA (training seasons only; fallback to league avg)
  2) League average HR/PA

Metrics:
  - log loss (epsilon clipping)
  - Brier score
  - holdout HR rate and predicted avg p
  - Top-K hits for K in [10, 25, 50]

Optional JSON report:
  <out-dir>/reports/baseline_eval_<holdout-season>.json
"""

from __future__ import annotations

import argparse
import csv
import json
import math
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Tuple


def _to_int(value: str) -> Optional[int]:
  v = (value or "").strip()
  if v == "":
    return None
  try:
    return int(v)
  except ValueError:
    return None


def _clip_prob(p: float, eps: float = 1e-6) -> float:
  if p < eps:
    return eps
  if p > 1.0 - eps:
    return 1.0 - eps
  return p


def log_loss(y: Sequence[int], p: Sequence[float], eps: float = 1e-6) -> float:
  if not y:
    return float("nan")
  total = 0.0
  for yi, pi in zip(y, p):
    pp = _clip_prob(pi, eps)
    total += -(yi * math.log(pp) + (1 - yi) * math.log(1.0 - pp))
  return total / len(y)


def brier_score(y: Sequence[int], p: Sequence[float]) -> float:
  if not y:
    return float("nan")
  total = 0.0
  for yi, pi in zip(y, p):
    total += (pi - yi) ** 2
  return total / len(y)


def top_k_hits(y: Sequence[int], p: Sequence[float], k: int) -> int:
  if k <= 0 or not y:
    return 0
  idx = sorted(range(len(y)), key=lambda i: p[i], reverse=True)[: min(k, len(y))]
  return sum(y[i] for i in idx)


def read_csv_rows(path: Path) -> List[Dict[str, str]]:
  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    return [dict(r) for r in reader]


def join_events_labels(
  events_rows: Iterable[Dict[str, str]],
  label_rows: Iterable[Dict[str, str]],
) -> Tuple[List[Dict[str, str]], int, int]:
  events_by_pa: Dict[str, Dict[str, str]] = {}
  for r in events_rows:
    pa_id = (r.get("pa_id") or "").strip()
    if pa_id:
      events_by_pa[pa_id] = r

  joined: List[Dict[str, str]] = []
  missing_events = 0
  missing_labels = 0

  for r in label_rows:
    pa_id = (r.get("pa_id") or "").strip()
    if not pa_id:
      missing_labels += 1
      continue
    ev = events_by_pa.get(pa_id)
    if ev is None:
      missing_events += 1
      continue
    merged = dict(ev)
    merged.update(r)
    joined.append(merged)

  return joined, missing_events, missing_labels


def compute_league_rate(training: Sequence[Dict[str, str]]) -> float:
  hr = 0
  pa = 0
  for r in training:
    y = _to_int(r.get("is_hr", "0")) or 0
    hr += 1 if y == 1 else 0
    pa += 1
  return (hr / pa) if pa else 0.0


def compute_batter_season_rates(training: Sequence[Dict[str, str]]) -> Dict[str, Dict[int, Tuple[int, int]]]:
  # batter_id -> season -> (pa_count, hr_count)
  rates: Dict[str, Dict[int, Tuple[int, int]]] = {}
  for r in training:
    bat_id = (r.get("bat_id") or r.get("batter_id") or "").strip()
    season = _to_int(r.get("season", "")) or 0
    if not bat_id or season <= 0:
      continue
    y = _to_int(r.get("is_hr", "0")) or 0
    by_season = rates.setdefault(bat_id, {})
    pa, hr = by_season.get(season, (0, 0))
    pa += 1
    hr += 1 if y == 1 else 0
    by_season[season] = (pa, hr)
  return rates


def most_recent_rate(
  batter_rates: Dict[str, Dict[int, Tuple[int, int]]],
  bat_id: str,
  min_pa: int,
) -> Optional[float]:
  seasons = batter_rates.get(bat_id)
  if not seasons:
    return None
  for season in sorted(seasons.keys(), reverse=True):
    pa, hr = seasons[season]
    if pa >= min_pa:
      return hr / pa if pa else None
  return None


def main() -> int:
  parser = argparse.ArgumentParser(description="Evaluate deterministic baselines on PA labels/events (no ML model).")
  parser.add_argument("--events", required=True, help="Path to processed/pa_events.csv")
  parser.add_argument("--labels", required=True, help="Path to processed/pa_labels.csv")
  parser.add_argument("--holdout-season", required=True, type=int, help="Season to hold out for evaluation (e.g. 2020)")
  parser.add_argument("--min-pa", type=int, default=50, help="Min PA for batter-season rate usage (default: 50)")
  parser.add_argument("--out-dir", default="scripts/ml/data", help="Base output dir for JSON report (default: scripts/ml/data)")
  parser.add_argument("--no-report", action="store_true", help="Do not write JSON report to disk.")
  args = parser.parse_args()

  events_path = Path(args.events)
  labels_path = Path(args.labels)
  holdout_season = int(args.holdout_season)

  events_rows = read_csv_rows(events_path)
  label_rows = read_csv_rows(labels_path)
  joined, missing_events, missing_labels = join_events_labels(events_rows, label_rows)

  if not joined:
    print("No joined rows (pa_id join of events+labels produced 0 rows).")
    print(f"missing_events={missing_events}, missing_labels={missing_labels}")
    return 1

  # Time-based split: training seasons < holdout; evaluation season == holdout.
  training = [r for r in joined if (_to_int(r.get("season", "")) or 0) < holdout_season]
  holdout = [r for r in joined if (_to_int(r.get("season", "")) or 0) == holdout_season]
  dropped_future = [r for r in joined if (_to_int(r.get("season", "")) or 0) > holdout_season]

  if not holdout:
    print(f"No rows found for holdout season {holdout_season}.")
    print(f"joined_rows={len(joined)}, training_rows={len(training)}, future_rows={len(dropped_future)}")
    return 1

  league_p = compute_league_rate(training) if training else compute_league_rate(holdout)
  batter_rates = compute_batter_season_rates(training)

  y_holdout: List[int] = []
  p_batter: List[float] = []
  p_league: List[float] = []

  used_batter_rate = 0
  used_league_fallback = 0

  for r in holdout:
    y = 1 if (_to_int(r.get("is_hr", "0")) or 0) == 1 else 0
    y_holdout.append(y)

    bat_id = (r.get("bat_id") or r.get("batter_id") or "").strip()
    rate = most_recent_rate(batter_rates, bat_id, args.min_pa) if bat_id else None
    if rate is None:
      used_league_fallback += 1
      rate = league_p
    else:
      used_batter_rate += 1

    p_batter.append(float(rate))
    p_league.append(float(league_p))

  holdout_hr_rate = sum(y_holdout) / len(y_holdout)
  avg_p_batter = sum(p_batter) / len(p_batter)
  avg_p_league = sum(p_league) / len(p_league)

  report: Dict[str, object] = {
    "config": {
      "events": str(events_path),
      "labels": str(labels_path),
      "holdout_season": holdout_season,
      "min_pa": int(args.min_pa),
    },
    "counts": {
      "joined_rows": len(joined),
      "training_rows": len(training),
      "holdout_rows": len(holdout),
      "future_rows_dropped": len(dropped_future),
      "missing_events": missing_events,
      "missing_labels": missing_labels,
      "used_batter_rate_rows": used_batter_rate,
      "used_league_fallback_rows": used_league_fallback,
    },
    "holdout": {
      "hr_rate": holdout_hr_rate,
      "hr_count": int(sum(y_holdout)),
      "pa_count": len(y_holdout),
    },
    "baselines": {},
  }

  def summarize(name: str, p: List[float]) -> Dict[str, object]:
    metrics: Dict[str, object] = {
      "avg_p": sum(p) / len(p),
      "log_loss": log_loss(y_holdout, p),
      "brier": brier_score(y_holdout, p),
      "top_k_hits": {str(k): top_k_hits(y_holdout, p, k) for k in [10, 25, 50]},
    }
    report["baselines"][name] = metrics
    return metrics

  batter_metrics = summarize("batter_recent_season_rate", p_batter)
  league_metrics = summarize("league_average", p_league)

  print(f"Joined rows: {len(joined)} (missing_events={missing_events}, missing_labels={missing_labels})")
  print(f"Training rows (<{holdout_season}): {len(training)}")
  print(f"Holdout rows (=={holdout_season}): {len(holdout)}")
  if dropped_future:
    print(f"Dropped future rows (>{holdout_season}): {len(dropped_future)}")

  print(f"Holdout HR rate: {holdout_hr_rate:.6f}")
  print("")

  print("Baseline: batter recent-season rate (fallback league avg)")
  print(f"  avg_p:   {avg_p_batter:.6f}")
  print(f"  logloss: {batter_metrics['log_loss']:.6f}")
  print(f"  brier:   {batter_metrics['brier']:.6f}")
  print(f"  topK:    {batter_metrics['top_k_hits']}")
  print("")

  print("Baseline: league average")
  print(f"  avg_p:   {avg_p_league:.6f}")
  print(f"  logloss: {league_metrics['log_loss']:.6f}")
  print(f"  brier:   {league_metrics['brier']:.6f}")
  print(f"  topK:    {league_metrics['top_k_hits']}")
  print("")

  if not args.no_report:
    out_dir = Path(args.out_dir)
    report_path = out_dir / "reports" / f"baseline_eval_{holdout_season}.json"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    with report_path.open("w", encoding="utf-8") as fh:
      json.dump(report, fh, indent=2, sort_keys=True)
      fh.write("\n")
    print(f"Wrote report → {report_path}")

  return 0


if __name__ == "__main__":
  raise SystemExit(main())

