# Feature Building Rules & Invariants

## Non-Negotiable Rules

1. Features are built OUTSIDE training
2. Features are deterministic
3. Features are time-aware
4. Features are replayable
5. PA grain remains the source of truth

Violating any of these is a bug.

---

## Time Awareness (Critical)

For a feature row with:


batter_id = X
date = D


Allowed data:
- Plate appearances with game_date < D

Forbidden:
- Same-day events
- Future events
- Season-end aggregates leaking backward

---

## Rolling Windows (Performance Rule)

❌ Do NOT compute rolling windows using loops  
❌ Do NOT scan N rows per feature

✅ Use cumulative counters

Example:


hr_last_50 = cum_hr_t - cum_hr_t-50


This must be O(1) per row.

---

## Season Boundaries

- Season stats reset at season change
- Cumulative career stats do NOT reset
- Season is derived from game_date

---

## Implementation Guidance

Preferred approach:
1. Sort PA data by (player_id, game_date, pa_index)
2. Build cumulative counters
3. Store cumulative history arrays
4. Compute deltas for rolling windows
5. Materialize one row per (player_id, date)

---

## Validation & Logging

Every build must log:
- Input PA row count
- Output feature row count
- Date range
- Feature min/max/mean
- Null counts

Write summary to `feature_stats.json`.

---

## What This Layer Must NOT Do

- No ML
- No inference
- No aggregation beyond player-day
- No API serving
- No UI logic

