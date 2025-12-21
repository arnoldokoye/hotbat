#!/usr/bin/env python3
"""
Build a deterministic plate-appearance dataset from Retrosheet-derived events CSV.
Inputs: data_sources/retrosheet/derived/events_csv/*.csv (cwevent output)
Outputs:
  - data/ml/raw/retrosheet/pa_events.csv (all PAs)
  - data/ml/processed/pa_labels.csv (adds is_hr label for start_pa_flag==1)

Minimal fields per PA:
  game_id, batting_team, home_team_flag, batter_id, pitcher_id,
  event_type, hit_value, start_pa_flag, event_text, is_hr (labels)

Determinism: same input → same output; no randomness.
"""

import argparse
import csv
import os
from pathlib import Path
from typing import Dict, List

RAW_DIR = Path("data_sources/retrosheet/derived/events_csv")
OUT_RAW = Path("data/ml/raw/retrosheet/pa_events.csv")
OUT_LABELED = Path("data/ml/processed/pa_labels.csv")


def list_event_files() -> List[Path]:
  if not RAW_DIR.exists():
    return []
  return sorted([p for p in RAW_DIR.glob("*.csv") if p.is_file()])


def ensure_dirs():
  OUT_RAW.parent.mkdir(parents=True, exist_ok=True)
  OUT_LABELED.parent.mkdir(parents=True, exist_ok=True)


def load_events(files: List[Path]) -> List[Dict[str, str]]:
  rows: List[Dict[str, str]] = []
  for f in files:
    with f.open(newline="", encoding="utf-8") as fh:
      reader = csv.DictReader(fh)
      for r in reader:
        rows.append(r)
  return rows


def normalize_row(r: Dict[str, str]) -> Dict[str, str]:
  # Expect cwevent fields; be defensive
  return {
    "game_id": r.get("game_id") or r.get("GAME_ID") or "",
    "batting_team": r.get("batting_team") or r.get("BAT_TEAM_ID") or "",
    "home_team_flag": r.get("home_team_flag") or r.get("BAT_HOME_ID") or "",
    "batter_id": r.get("bat_id") or r.get("BAT_ID") or "",
    "pitcher_id": r.get("pit_id") or r.get("PIT_ID") or "",
    "event_type": r.get("event_type") or r.get("EVENT_CD") or "",
    "hit_value": r.get("hit_value") or r.get("H_FL") or "",
    "start_pa_flag": r.get("start_pa_flag") or r.get("PA_NEW_FL") or "",
    "event_text": r.get("event_text") or r.get("EVENT_TX") or "",
  }


def build_pa_dataset(rows: List[Dict[str, str]]) -> List[Dict[str, str]]:
  result: List[Dict[str, str]] = []
  for r in rows:
    n = normalize_row(r)
    result.append(n)
  return result


def add_labels(rows: List[Dict[str, str]]) -> List[Dict[str, str]]:
  labeled: List[Dict[str, str]] = []
  for r in rows:
    start_flag = (r.get("start_pa_flag") or "0").strip()
    hit_val = (r.get("hit_value") or "0").strip()
    is_hr = "1" if start_flag == "1" and hit_val == "4" else "0"
    labeled.append({**r, "is_hr": is_hr})
  return labeled


def write_csv(path: Path, rows: List[Dict[str, str]]):
  if not rows:
    path.write_text("", encoding="utf-8")
    return
  headers = list(rows[0].keys())
  with path.open("w", newline="", encoding="utf-8") as fh:
    writer = csv.DictWriter(fh, fieldnames=headers)
    writer.writeheader()
    writer.writerows(rows)


def main():
  parser = argparse.ArgumentParser(description="Build PA labels from Retrosheet events CSV.")
  parser.add_argument("--raw_dir", default=str(RAW_DIR), help="Path to events CSV directory")
  parser.add_argument("--out_raw", default=str(OUT_RAW), help="Output raw PA CSV")
  parser.add_argument("--out_labeled", default=str(OUT_LABELED), help="Output labeled PA CSV")
  args = parser.parse_args()

  global RAW_DIR, OUT_RAW, OUT_LABELED
  RAW_DIR = Path(args.raw_dir)
  OUT_RAW = Path(args.out_raw)
  OUT_LABELED = Path(args.out_labeled)

  ensure_dirs()
  files = list_event_files()
  if not files:
    print("No event CSV files found; nothing to do.")
    return

  events = load_events(files)
  pa_rows = build_pa_dataset(events)
  labeled_rows = add_labels(pa_rows)

  write_csv(OUT_RAW, pa_rows)
  write_csv(OUT_LABELED, labeled_rows)
  print(f"Wrote {len(pa_rows)} PA rows to {OUT_RAW}")
  print(f"Wrote {len(labeled_rows)} labeled rows to {OUT_LABELED}")


if __name__ == "__main__":
  main()
