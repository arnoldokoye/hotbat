#!/usr/bin/env python3
"""
Build Player-Day cumulative feature tables from PA-level labels (Retrosheet-only).

Authoritative docs:
  - docs/ml/05_player_day_feature_plan.md
  - docs/ml/06_feature_building_rules.md

Hard constraints:
  - No ML training
  - No API serving
  - Do NOT recompute PA-level data (consume existing processed pa_labels.csv)
  - Do NOT collapse PA rows (PA remains truth; this script materializes Player-Day features)
  - Do NOT compute rolling windows with per-row scans (use O(1) deltas from cumulative history)
  - Features are time-aware: for date D, only use plate appearances with game_date < D

Outputs (features_v1):
  - scripts/ml/data/features_v1/batter_daily_features.csv
  - scripts/ml/data/features_v1/pitcher_daily_features.csv
  - scripts/ml/data/features_v1/feature_stats.json
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Sequence, Tuple


DEFAULT_LABELS_PATH = Path("scripts/ml/data/processed/pa_labels.csv")
DEFAULT_OUT_DIR = Path("scripts/ml/data/features_v1")

WINDOW_LAST_N = 50


def is_valid_date(date_str: str) -> bool:
  d = (date_str or "").strip()
  # Minimal validation for YYYY-MM-DD (lexicographically sortable).
  return len(d) == 10 and d[4] == "-" and d[7] == "-" and d[0:4].isdigit() and d[5:7].isdigit() and d[8:10].isdigit()


def to_int(value: str) -> Optional[int]:
  v = (value or "").strip()
  if v == "":
    return None
  try:
    return int(v)
  except ValueError:
    return None


def fmt_rate(numer: int, denom: int) -> str:
  if denom <= 0:
    return "0.000000"
  return f"{(numer / denom):.6f}"


@dataclass(frozen=True)
class PaRow:
  date: str
  season: int
  game_id: str
  event_seq: int
  pa_id: str
  is_hr: int


@dataclass
class InputStats:
  total_rows: int = 0
  batter_rows: int = 0
  pitcher_rows: int = 0
  dropped_missing_date: int = 0
  dropped_missing_batter_id: int = 0
  dropped_missing_pitcher_id: int = 0


def read_pa_labels(path: Path) -> Tuple[Dict[str, List[PaRow]], Dict[str, List[PaRow]], InputStats]:
  batters: Dict[str, List[PaRow]] = {}
  pitchers: Dict[str, List[PaRow]] = {}
  stats = InputStats()

  with path.open(newline="", encoding="utf-8") as fh:
    reader = csv.DictReader(fh)
    for row in reader:
      stats.total_rows += 1

      date = (row.get("game_date") or row.get("date") or "").strip()
      if not is_valid_date(date):
        stats.dropped_missing_date += 1
        continue

      season = to_int(row.get("season") or "") or int(date[0:4])
      game_id = (row.get("game_id") or "").strip()
      event_seq = to_int(row.get("event_seq") or "") or 0
      pa_id = (row.get("pa_id") or "").strip()

      is_hr = 1 if (to_int(row.get("is_hr") or "0") or 0) == 1 else 0

      batter_id = (row.get("bat_id") or row.get("batter_id") or "").strip()
      pitcher_id = (row.get("pit_id") or row.get("pitcher_id") or "").strip()

      if batter_id:
        batters.setdefault(batter_id, []).append(
          PaRow(
            date=date,
            season=season,
            game_id=game_id,
            event_seq=event_seq,
            pa_id=pa_id,
            is_hr=is_hr,
          )
        )
        stats.batter_rows += 1
      else:
        stats.dropped_missing_batter_id += 1

      if pitcher_id:
        pitchers.setdefault(pitcher_id, []).append(
          PaRow(
            date=date,
            season=season,
            game_id=game_id,
            event_seq=event_seq,
            pa_id=pa_id,
            is_hr=is_hr,
          )
        )
        stats.pitcher_rows += 1
      else:
        stats.dropped_missing_pitcher_id += 1

  return batters, pitchers, stats


def sort_pas(pas: List[PaRow]) -> None:
  pas.sort(key=lambda r: (r.season, r.date, r.game_id, r.event_seq, r.pa_id))


def build_batter_daily_features(batters: Dict[str, List[PaRow]]) -> List[Dict[str, str]]:
  out_rows: List[Dict[str, str]] = []

  for batter_id in sorted(batters.keys()):
    pas = batters[batter_id]
    if not pas:
      continue

    sort_pas(pas)

    total_pa = 0
    total_hr = 0
    prefix_hr: List[int] = [0]  # prefix_hr[i] = HR count in first i PAs

    current_season: Optional[int] = None
    season_pa = 0
    season_hr = 0

    i = 0
    last_date: Optional[str] = None

    while i < len(pas):
      d = pas[i].date
      season = pas[i].season or int(d[0:4])

      if last_date is not None and d < last_date:
        raise RuntimeError(f"Non-monotonic dates for batter_id={batter_id}: {d} after {last_date}")
      last_date = d

      if current_season is None or season != current_season:
        current_season = season
        season_pa = 0
        season_hr = 0

      pre_pa = total_pa
      pre_hr = total_hr

      pa_last_50 = WINDOW_LAST_N if pre_pa >= WINDOW_LAST_N else pre_pa
      hr_last_50 = pre_hr - prefix_hr[max(0, pre_pa - WINDOW_LAST_N)]

      row = {
        "batter_id": batter_id,
        "date": d,
        "cum_pa": str(pre_pa),
        "cum_hr": str(pre_hr),
        "pa_last_50": str(pa_last_50),
        "hr_last_50": str(hr_last_50),
        "hr_rate_last_50": fmt_rate(hr_last_50, pa_last_50),
        "season_pa": str(season_pa),
        "season_hr": str(season_hr),
        "season_hr_rate": fmt_rate(season_hr, season_pa),
      }
      out_rows.append(row)

      # Consume all PAs on this date (same-day excluded from features by construction).
      while i < len(pas) and pas[i].date == d:
        total_pa += 1
        total_hr += pas[i].is_hr
        season_pa += 1
        season_hr += pas[i].is_hr
        prefix_hr.append(total_hr)
        i += 1

  return out_rows


def build_pitcher_daily_features(pitchers: Dict[str, List[PaRow]]) -> List[Dict[str, str]]:
  out_rows: List[Dict[str, str]] = []

  for pitcher_id in sorted(pitchers.keys()):
    pas = pitchers[pitcher_id]
    if not pas:
      continue

    sort_pas(pas)

    total_pa = 0
    total_hr = 0
    prefix_hr: List[int] = [0]

    i = 0
    last_date: Optional[str] = None

    while i < len(pas):
      d = pas[i].date

      if last_date is not None and d < last_date:
        raise RuntimeError(f"Non-monotonic dates for pitcher_id={pitcher_id}: {d} after {last_date}")
      last_date = d

      pre_pa = total_pa
      pre_hr = total_hr

      pa_last_50 = WINDOW_LAST_N if pre_pa >= WINDOW_LAST_N else pre_pa
      hr_last_50 = pre_hr - prefix_hr[max(0, pre_pa - WINDOW_LAST_N)]

      row = {
        "pitcher_id": pitcher_id,
        "date": d,
        "cum_pa_allowed": str(pre_pa),
        "cum_hr_allowed": str(pre_hr),
        "pa_allowed_last_50": str(pa_last_50),
        "hr_allowed_last_50": str(hr_last_50),
        "hr_allowed_rate_last_50": fmt_rate(hr_last_50, pa_last_50),
      }
      out_rows.append(row)

      while i < len(pas) and pas[i].date == d:
        total_pa += 1
        total_hr += pas[i].is_hr
        prefix_hr.append(total_hr)
        i += 1

  return out_rows


def write_csv(path: Path, fieldnames: Sequence[str], rows: Sequence[Dict[str, str]]) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  with path.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(fh, fieldnames=list(fieldnames), lineterminator="\n")
    writer.writeheader()
    writer.writerows(rows)


def _numeric_summary(values: List[float]) -> Dict[str, float]:
  if not values:
    return {"min": 0.0, "max": 0.0, "mean": 0.0}
  return {
    "min": round(min(values), 6),
    "max": round(max(values), 6),
    "mean": round(sum(values) / len(values), 6),
  }


def build_table_stats(rows: Sequence[Dict[str, str]], id_key: str, numeric_keys: Sequence[str]) -> Dict[str, object]:
  row_count = len(rows)
  ids = [(r.get(id_key) or "").strip() for r in rows]
  dates = [(r.get("date") or "").strip() for r in rows]
  null_id_count = sum(1 for x in ids if not x)

  # Duplicates: (id, date) must be unique.
  key_pairs = [(ids[i], dates[i]) for i in range(row_count)]
  unique_pairs = set(key_pairs)
  duplicates_count = row_count - len(unique_pairs)

  date_values = sorted({d for d in dates if d})
  min_date = date_values[0] if date_values else None
  max_date = date_values[-1] if date_values else None

  distributions: Dict[str, Dict[str, float]] = {}
  for k in numeric_keys:
    vals: List[float] = []
    for r in rows:
      v = (r.get(k) or "").strip()
      if v == "":
        continue
      try:
        vals.append(float(v))
      except ValueError:
        continue
    distributions[k] = _numeric_summary(vals)

  return {
    "rows": row_count,
    "unique_player_date_rows": len(unique_pairs),
    "duplicates_count": duplicates_count,
    "null_id_count": null_id_count,
    "min_date": min_date,
    "max_date": max_date,
    "distributions": distributions,
  }


def main() -> int:
  parser = argparse.ArgumentParser(description="Build Player-Day cumulative feature tables (features_v1).")
  parser.add_argument("--labels", default=str(DEFAULT_LABELS_PATH), help="Path to processed pa_labels.csv")
  parser.add_argument("--out-dir", default=str(DEFAULT_OUT_DIR), help="Output directory (default: scripts/ml/data/features_v1)")
  parser.add_argument("--fail-on-invalid", action="store_true", help="Exit non-zero if validation fails.")
  args = parser.parse_args()

  labels_path = Path(args.labels)
  if not labels_path.exists():
    print(f"ERROR: labels file not found: {labels_path}", file=sys.stderr)
    return 1

  out_dir = Path(args.out_dir)
  batter_out = out_dir / "batter_daily_features.csv"
  pitcher_out = out_dir / "pitcher_daily_features.csv"
  stats_out = out_dir / "feature_stats.json"

  batters, pitchers, input_stats = read_pa_labels(labels_path)

  batter_rows = build_batter_daily_features(batters)
  pitcher_rows = build_pitcher_daily_features(pitchers)

  batter_fieldnames = [
    "batter_id",
    "date",
    "cum_pa",
    "cum_hr",
    "pa_last_50",
    "hr_last_50",
    "hr_rate_last_50",
    "season_pa",
    "season_hr",
    "season_hr_rate",
  ]
  pitcher_fieldnames = [
    "pitcher_id",
    "date",
    "cum_pa_allowed",
    "cum_hr_allowed",
    "pa_allowed_last_50",
    "hr_allowed_last_50",
    "hr_allowed_rate_last_50",
  ]

  write_csv(batter_out, batter_fieldnames, batter_rows)
  write_csv(pitcher_out, pitcher_fieldnames, pitcher_rows)

  batter_numeric = [k for k in batter_fieldnames if k not in {"batter_id", "date"}]
  pitcher_numeric = [k for k in pitcher_fieldnames if k not in {"pitcher_id", "date"}]

  batter_stats = build_table_stats(batter_rows, "batter_id", batter_numeric)
  pitcher_stats = build_table_stats(pitcher_rows, "pitcher_id", pitcher_numeric)

  report: Dict[str, object] = {
    "version": "features_v1",
    "inputs": {
      "pa_labels": str(labels_path),
      "pa_rows_read": input_stats.total_rows,
      "batter_rows_used": input_stats.batter_rows,
      "pitcher_rows_used": input_stats.pitcher_rows,
      "dropped_missing_date": input_stats.dropped_missing_date,
      "dropped_missing_batter_id": input_stats.dropped_missing_batter_id,
      "dropped_missing_pitcher_id": input_stats.dropped_missing_pitcher_id,
    },
    "tables": {
      "batter_daily_features": batter_stats,
      "pitcher_daily_features": pitcher_stats,
    },
  }

  stats_out.parent.mkdir(parents=True, exist_ok=True)
  with stats_out.open("w", encoding="utf-8") as fh:
    json.dump(report, fh, indent=2, sort_keys=True)
    fh.write("\n")

  # stdout validation summary (required)
  print(f"Input PA rows: {input_stats.total_rows} (labels={labels_path})")
  print(
    "Drops: "
    + f"missing_date={input_stats.dropped_missing_date}, "
    + f"missing_batter_id={input_stats.dropped_missing_batter_id}, "
    + f"missing_pitcher_id={input_stats.dropped_missing_pitcher_id}"
  )
  print("")
  print(f"Wrote batter_daily_features: {batter_stats['rows']} rows → {batter_out}")
  print(
    "  Validation: "
    + f"duplicates={batter_stats['duplicates_count']}, null_ids={batter_stats['null_id_count']}, "
    + f"date_range={batter_stats['min_date']}..{batter_stats['max_date']}"
  )
  print(f"Wrote pitcher_daily_features: {pitcher_stats['rows']} rows → {pitcher_out}")
  print(
    "  Validation: "
    + f"duplicates={pitcher_stats['duplicates_count']}, null_ids={pitcher_stats['null_id_count']}, "
    + f"date_range={pitcher_stats['min_date']}..{pitcher_stats['max_date']}"
  )
  print(f"Wrote feature stats → {stats_out}")

  invalid = (
    batter_stats["duplicates_count"] > 0
    or batter_stats["null_id_count"] > 0
    or pitcher_stats["duplicates_count"] > 0
    or pitcher_stats["null_id_count"] > 0
  )
  if args.fail_on_invalid and invalid:
    print("ERROR: feature validation failed (duplicates or null ids).", file=sys.stderr)
    return 1

  return 0


if __name__ == "__main__":
  raise SystemExit(main())

