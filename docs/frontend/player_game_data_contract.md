# HotBat Frontend Data Contract — Player Game Baseline

## Purpose
Defines the exact schema the HotBat frontend consumes to render
daily HR rankings, player cards, and trends.

This contract is intentionally stable across:
- baseline (no ML)
- ML v1
- ML v2+

Only the scoring column will change.

---

## Endpoint / Data Source

Source:
- player_game_baseline.csv
- or /api/player-game-baseline (future)

Grain:
- One row per player per game

---

## Schema



player_id STRING
player_name STRING
game_date DATE
park_id STRING
opposing_pitcher_id STRING

hr_rate_last_50 FLOAT
season_hr_rate FLOAT
season_hr INT
season_pa INT
pitcher_hr_allowed_rate_last_50 FLOAT
park_hr_factor FLOAT
expected_pa FLOAT

baseline_hr_score FLOAT


---

## Field Semantics (UI-friendly)

| Field | Meaning |
|----|----|
| player_name | Authoritative display name |
| hr_rate_last_50 | Recent power trend |
| season_hr_rate | Long-term baseline |
| season_hr | Season HR total (to date) |
| season_pa | Season PA total (to date) |
| pitcher_hr_allowed_rate_last_50 | Pitcher recent HR/PA allowed |
| park_hr_factor | Park boost/suppress |
| expected_pa | Opportunity |
| baseline_hr_score | Final ranking signal |

---

## Sorting Rules

Primary sort:
- baseline_hr_score DESC

Secondary:
- hr_rate_last_50 DESC

---

## UI Guarantees

- All numeric fields are precomputed
- No frontend math required
- Missing values must be zero-filled
- Stable ordering per day

---

## Future Compatibility

When ML is added:


baseline_hr_score → ml_hr_probability


No frontend changes required.
