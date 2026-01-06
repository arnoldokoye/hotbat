# Phase 5.5 Implementation Notes (Internal)

## Files to touch
- `src/app/picks/page.tsx` (load monitoring CSV + pass status)
- `src/features/hr-picks/HrPicksPage.tsx` (render health, top edge, movement note)
- `src/lib/baseline/fetchBaselineHrPicks.ts` (compute movement + confidence tier)
- `src/features/hr-picks/types.ts` (optional fields only)
- `PROGRESS_LOG.md`, `docs/ml/ML_CHANGELOG.md`

## Data sources
- `scripts/ml/data/hr_picks_monitoring_v1.csv` (model health)
- `scripts/ml/data/player_game_hr_rankings_v1_all_seasons.csv` (movement + ML fields)
- Baseline CSV (fallback remains)

## Guardrails
- No ranking order changes.
- No probability display.
- No DB calls.
- All new fields optional and hidden when missing.

## Verification
- `/picks` renders with and without ML files.
- Baseline fallback works silently.
- “Model status” matches monitoring logic.
- Movement line uses only one reason.
- No console errors.

## What not to change
- Training scripts or ranking generation.
- API response shapes consumed by existing UI.
- Baseline scoring logic.

