# Player-Day Feature Materialization Plan (HotBat ML)

## Purpose
Define the first reusable, high-performance feature layer for HotBat ML.

This layer:
- Eliminates redundant rolling computations
- Prevents data leakage
- Supports fast training and batch inference
- Preserves PA-level labels

---

## Feature Grain Strategy

| Layer | Grain | Responsibility |
|------|------|----------------|
| Truth | Plate Appearance | Events + labels |
| Features | Player-Day | Context & history |
| Training | Plate Appearance | Learning |
| Inference | Player-Game | Product output |

This document defines the **Player-Day** layer only.

---

## Batter Daily Features (features_v1)

One row per batter per date.


batter_daily_features

batter_id STRING
date DATE

cum_pa INT
cum_hr INT

pa_last_50 INT
hr_last_50 INT
hr_rate_last_50 FLOAT

season_pa INT
season_hr INT
season_hr_rate FLOAT


### Definitions

- `cum_*` = cumulative totals up to **end of previous day**
- `last_50` = most recent 50 PAs before this date
- `season_*` resets at season boundary
- All stats must be computed using data strictly **< date**

---

## Pitcher Daily Features (features_v1)


pitcher_daily_features

pitcher_id STRING
date DATE

cum_pa_allowed INT
cum_hr_allowed INT

pa_allowed_last_50 INT
hr_allowed_last_50 INT
hr_allowed_rate_last_50 FLOAT


Same time-awareness rules apply.

---

## Park Features (Static Join)


park_factors

park_id
hr_factor


- Joined at PA-level later
- No temporal logic required

---

## Output Location



scripts/ml/data/features_v1/
batter_daily_features.csv
pitcher_daily_features.csv
feature_stats.json


---

## Validation Requirements

For each output table:
- No duplicate (player_id, date)
- No future leakage
- No null IDs
- Dates monotonically increasing per player

Print validation summary to stdout.

