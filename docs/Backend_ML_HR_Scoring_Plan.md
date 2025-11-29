
---

### 2.3 `docs/Backend_ML_HR_Scoring_Plan.md` (optional but nice)

```markdown
# HotBat ML HR Scoring Plan (High-Level)

## Goal

Use an ML model to generate:
- Per team–game expected HR (predicted_hr_mean)
- A normalized HotBatScore (0–100) for each team in each game

These values are stored in `game_hr_predictions` and read by:
- `/api/today-games`
- `/api/team-dashboard` (upcoming games section)

## Label

- Target: Team HR count per game (`hr` for that team in that game).
- Level: one row per (team_id, game_id).

## Features (v1 sketch)

For each (team, game) row:

- Team batting strength:
  - season_hr_per_game
  - last_N_games_hr_per_game
  - season_hr_per_pa
  - barrel_rate
  - avg_ev
- Opposing pitcher:
  - hr_per_9 (season & last N starts)
  - barrel_rate_allowed
  - avg_ev_allowed
  - handedness, pitch mix summary
- Park:
  - hr_factor (from `park_hr_factors`)
- Context:
  - home_or_away
  - days_rest
  - game_time_bucket (day/night)

## Training & Inference Strategy

- **Offline training (Python):**
  - Build a historical dataset from `team_game_hr_stats` and related tables.
  - Train a regression model on HR count.
  - Save model + feature config with a version string (`model_version`).

- **Batch inference (v1):**
  - Nightly job:
    - For all scheduled games in the next N days:
      - Build feature rows.
      - Generate predictions.
      - Compute HotBatScore (e.g., normalized z-score mapped to 0–100).
      - Upsert into `game_hr_predictions`.

- **Online serving (later, optional):**
  - A Python FastAPI service could be used for realtime predictions, but is not required in v1.
