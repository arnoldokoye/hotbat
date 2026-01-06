#!/usr/bin/env python3
from __future__ import annotations

import csv
import math
import sys
from collections import defaultdict, deque
from pathlib import Path
from typing import Deque, Dict, List, Optional

DATA_DIR = Path("scripts/ml/data")
FEATURES_PATH = DATA_DIR / "pa_features_v1.csv"
LABELS_PATH = DATA_DIR / "pa_labels_v1.csv"
OUT_PATH = DATA_DIR / "pa_features_v1_enriched.csv"
PLAYER_REGISTRY = DATA_DIR / "player_registry.csv"

REQUIRED_FEATURE_COLS = [
  "pa_id",
  "game_date",
  "season",
  "player_id",
  "team_id",
  "opponent_team_id",
  "pitcher_id",
  "pitcher_hand",
  "ballpark_id",
  "is_home",
  "pa_index_in_game",
]

REQUIRED_LABEL_COLS = ["pa_id", "is_hr"]

ROLL_WINDOWS = [10, 25, 50]


def _read_csv(path: Path) -> List[Dict[str, str]]:
  with path.open(newline="", encoding="utf-8") as handle:
    reader = csv.DictReader(handle)
    rows = [dict(row) for row in reader]
  if not rows:
    sys.exit(f"{path} is empty.")
  return rows


def _validate_columns(path: Path, rows: List[Dict[str, str]], required: List[str]) -> None:
  missing = [col for col in required if col not in rows[0]]
  if missing:
    sys.exit(f"{path} missing required columns: {missing}")


def _is_int(value: str) -> bool:
  try:
    int(value)
    return True
  except ValueError:
    return False


def _to_int(value: str) -> int:
  return int(value)


def _rate(numer: int, denom: int) -> Optional[float]:
  if denom <= 0:
    return None
  return numer / denom


def _mean(values: List[float]) -> Optional[float]:
  if not values:
    return None
  return sum(values) / len(values)


def _sorted_rows(rows: List[Dict[str, str]]) -> List[Dict[str, str]]:
    return sorted(
    rows,
    key=lambda r: (
      r.get("game_date") or "",
      r.get("game_id") or "",
      _to_int(r.get("pa_index_in_game") or "0"),
      r.get("pa_id") or "",
    ),
    )


def main() -> int:
  if not FEATURES_PATH.exists() or not LABELS_PATH.exists():
    sys.exit("Missing pa_features_v1.csv or pa_labels_v1.csv.")

  features = _read_csv(FEATURES_PATH)
  labels = _read_csv(LABELS_PATH)

  _validate_columns(FEATURES_PATH, features, REQUIRED_FEATURE_COLS)
  _validate_columns(LABELS_PATH, labels, REQUIRED_LABEL_COLS)

  label_map: Dict[str, int] = {}
  for row in labels:
    pa_id = (row.get("pa_id") or "").strip()
    if not pa_id:
      sys.exit("Found empty pa_id in labels.")
    is_hr_raw = (row.get("is_hr") or "").strip()
    if is_hr_raw not in {"0", "1"}:
      sys.exit(f"Invalid is_hr value for pa_id={pa_id}: {is_hr_raw}")
    label_map[pa_id] = int(is_hr_raw)

  batter_hand_map: Dict[str, str] = {}
  if PLAYER_REGISTRY.exists():
    registry = _read_csv(PLAYER_REGISTRY)
    for row in registry:
      player_id = (row.get("player_id") or "").strip()
      if not player_id:
        continue
      hand = (row.get("bats") or "").strip().upper()
      batter_hand_map[player_id] = hand if hand in {"L", "R", "S"} else "UNKNOWN"

  # Join labels into features and validate 1:1.
  enriched_rows: List[Dict[str, str]] = []
  seen_ids = set()
  missing_labels = 0

  # Running counters
  player_career = defaultdict(lambda: {"pa": 0, "hr": 0})
  player_season = defaultdict(lambda: {"pa": 0, "hr": 0})
  pitcher_career = defaultdict(lambda: {"pa": 0, "hr": 0})
  pitcher_season = defaultdict(lambda: {"pa": 0, "hr": 0})
  park_career = defaultdict(lambda: {"pa": 0, "hr": 0})
  park_counts = defaultdict(int)
  league_career = {"pa": 0, "hr": 0}

  # Rolling window buffers
  player_windows: Dict[str, Dict[int, Deque[int]]] = defaultdict(
    lambda: {w: deque(maxlen=w) for w in ROLL_WINDOWS}
  )
  pitcher_windows: Dict[str, Deque[int]] = defaultdict(lambda: deque(maxlen=50))

  ordered = _sorted_rows(features)

  non_null_counts = defaultdict(int)
  means = defaultdict(list)

  for row in ordered:
    pa_id = (row.get("pa_id") or "").strip()
    if not pa_id:
      sys.exit("Found empty pa_id in features.")
    if pa_id in seen_ids:
      sys.exit(f"Duplicate pa_id in features: {pa_id}")
    seen_ids.add(pa_id)

    label = label_map.get(pa_id)
    if label is None:
      missing_labels += 1
      continue
    row["is_hr"] = str(label)
    row["batter_hand"] = batter_hand_map.get(player_id, "UNKNOWN")

    player_id = (row.get("player_id") or "").strip()
    pitcher_id = (row.get("pitcher_id") or "").strip()
    park_id = (row.get("ballpark_id") or "").strip()
    season = (row.get("season") or "").strip()

    if not player_id or not pitcher_id or not park_id or not season:
      sys.exit(f"Missing required IDs for pa_id={pa_id}")
    if not _is_int(season):
      sys.exit(f"Invalid season for pa_id={pa_id}: {season}")

    season_key = int(season)

    # Player rolling windows
    for w in ROLL_WINDOWS:
      history = player_windows[player_id][w]
      if len(history) < w:
        row[f"player_hr_rate_last_{w}_pa"] = ""
      else:
        rate = sum(history) / w
        row[f"player_hr_rate_last_{w}_pa"] = f"{rate:.6f}"
        non_null_counts[f"player_hr_rate_last_{w}_pa"] += 1
        means[f"player_hr_rate_last_{w}_pa"].append(rate)

    # Player season-to-date
    season_key_tuple = (player_id, season_key)
    season_stats = player_season[season_key_tuple]
    season_rate = _rate(season_stats["hr"], season_stats["pa"])
    if season_rate is None:
      row["player_hr_rate_season_to_date"] = ""
    else:
      row["player_hr_rate_season_to_date"] = f"{season_rate:.6f}"
      non_null_counts["player_hr_rate_season_to_date"] += 1
      means["player_hr_rate_season_to_date"].append(season_rate)

    # Player career-to-date
    career_stats = player_career[player_id]
    career_rate = _rate(career_stats["hr"], career_stats["pa"])
    if career_rate is None:
      row["player_hr_rate_career_to_date"] = ""
    else:
      row["player_hr_rate_career_to_date"] = f"{career_rate:.6f}"
      non_null_counts["player_hr_rate_career_to_date"] += 1
      means["player_hr_rate_career_to_date"].append(career_rate)

    # Pitcher allowed last 50
    pitcher_hist = pitcher_windows[pitcher_id]
    if len(pitcher_hist) < 50:
      row["pitcher_hr_allowed_rate_last_50_pa"] = ""
    else:
      rate = sum(pitcher_hist) / 50
      row["pitcher_hr_allowed_rate_last_50_pa"] = f"{rate:.6f}"
      non_null_counts["pitcher_hr_allowed_rate_last_50_pa"] += 1
      means["pitcher_hr_allowed_rate_last_50_pa"].append(rate)

    # Pitcher season-to-date
    pitcher_season_key = (pitcher_id, season_key)
    pitch_season_stats = pitcher_season[pitcher_season_key]
    pitch_season_rate = _rate(pitch_season_stats["hr"], pitch_season_stats["pa"])
    if pitch_season_rate is None:
      row["pitcher_hr_allowed_rate_season_to_date"] = ""
    else:
      row["pitcher_hr_allowed_rate_season_to_date"] = f"{pitch_season_rate:.6f}"
      non_null_counts["pitcher_hr_allowed_rate_season_to_date"] += 1
      means["pitcher_hr_allowed_rate_season_to_date"].append(pitch_season_rate)

    # Matchup interaction (prior season-to-date rates only)
    if season_rate is None or pitch_season_rate is None:
      row["matchup_rate"] = ""
    else:
      matchup_rate = season_rate * pitch_season_rate
      row["matchup_rate"] = f"{matchup_rate:.6f}"
      non_null_counts["matchup_rate"] += 1
      means["matchup_rate"].append(matchup_rate)

    # Park bucket (prior history only)
    top_parks = {
      park for park, _ in sorted(park_counts.items(), key=lambda kv: (-kv[1], kv[0]))[:15]
    }
    row["ballpark_id_bucketed"] = park_id if park_id in top_parks else "OTHER"

    # Park factor (prior history only)
    park_stats = park_career[park_id]
    park_rate = _rate(park_stats["hr"], park_stats["pa"])
    league_rate = _rate(league_career["hr"], league_career["pa"])
    if park_rate is None or league_rate is None or league_rate == 0:
      park_factor = 1.0
    else:
      park_factor = park_rate / league_rate
    row["park_hr_factor"] = f"{park_factor:.6f}"
    non_null_counts["park_hr_factor"] += 1
    means["park_hr_factor"].append(park_factor)

    # Update counters after feature computation
    player_career[player_id]["pa"] += 1
    player_career[player_id]["hr"] += label
    player_season[season_key_tuple]["pa"] += 1
    player_season[season_key_tuple]["hr"] += label

    pitcher_career[pitcher_id]["pa"] += 1
    pitcher_career[pitcher_id]["hr"] += label
    pitcher_season[pitcher_season_key]["pa"] += 1
    pitcher_season[pitcher_season_key]["hr"] += label

    park_career[park_id]["pa"] += 1
    park_career[park_id]["hr"] += label
    park_counts[park_id] += 1
    league_career["pa"] += 1
    league_career["hr"] += label

    for w in ROLL_WINDOWS:
      player_windows[player_id][w].append(label)
    pitcher_windows[pitcher_id].append(label)

    enriched_rows.append(row)

  if missing_labels:
    sys.exit(f"Missing labels for {missing_labels} rows.")

  # Write output
  fieldnames = list(enriched_rows[0].keys())
  OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
  with OUT_PATH.open("w", newline="", encoding="utf-8") as handle:
    writer = csv.DictWriter(handle, fieldnames=fieldnames, lineterminator="\n")
    writer.writeheader()
    writer.writerows(enriched_rows)

  total_rows = len(enriched_rows)
  if total_rows != len(features):
    sys.exit("Row count mismatch between input features and enriched output.")

  print(f"Wrote {total_rows} rows → {OUT_PATH}")
  for feature in [
    "player_hr_rate_last_10_pa",
    "player_hr_rate_last_25_pa",
    "player_hr_rate_last_50_pa",
    "player_hr_rate_season_to_date",
    "player_hr_rate_career_to_date",
    "pitcher_hr_allowed_rate_last_50_pa",
    "pitcher_hr_allowed_rate_season_to_date",
    "matchup_rate",
    "park_hr_factor",
  ]:
    non_null = non_null_counts.get(feature, 0)
    pct = (non_null / total_rows) * 100 if total_rows else 0
    mean_val = _mean(means.get(feature, []))
    mean_label = f"{mean_val:.6f}" if mean_val is not None else "null"
    print(f"{feature}: non-null {pct:.2f}% mean={mean_label}")

  return 0


if __name__ == "__main__":
  raise SystemExit(main())
