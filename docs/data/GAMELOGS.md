# Retrosheet Game Logs (HotBat)

## Purpose
Retrosheet Game Logs are the **authoritative** source of:
- `game_date`
- `home_team` / `visiting_team`
- `park_id`
- final score / line score
- **starting pitchers**
- umpires, attendance, and game metadata
- record completeness (`acquisition`)

HotBat uses these IDs **as-is**. Do not remap or normalize them unless explicitly instructed.

## Canonical Source in This Repo
Game logs (2020–2025) live under:
- `data_sources/NEW_DATA_SETS/2020-25 GAMELOGS/gl2020.txt` … `gl2025.txt`

Supporting lookup tables:
- `data_sources/NEW_DATA_SETS/2020-25 GAMELOGS/teams.csv`
- `data_sources/NEW_DATA_SETS/2020-25 GAMELOGS/ballparks.csv`

## Guarantees (Non-Negotiable)
- TEAM IDs and BALLPARK IDs originate in game logs and are consistent across seasons.
- The same IDs appear identically in:
  - game logs
  - daily logs (`gameinfo.csv`, `teamstats.csv`, `batting.csv`, `pitching.csv`, `fielding.csv`, `plays.csv`)
  - schedules

## Grain
- **One row per MLB game**

## Format
- `glYYYY.txt` is a CSV-like text file containing **161 fields** per row (Retrosheet standard).
- Fields are ordered and referenced by **1-based field numbers** in Retrosheet documentation.

## Key Fields (HotBat-relevant)
These are the fields HotBat relies on most often:
- **1**: `date` (yyyymmdd)
- **2**: `game_number` (`0`, `1`, `2`, `3`, `A`, `B` …)
- **4**: `visiting_team_id`
- **7**: `home_team_id`
- **10–11**: visiting/home final score
- **17**: `park_id`
- **102**: visiting starting pitcher **ID**
- **104**: home starting pitcher **ID**
- **161**: acquisition / completeness (`Y`, `N`, `D`, `P`)

## Joining to Daily Logs (`gid`)
Daily log files use Retrosheet’s `gid` (GameID). HotBat treats `gid` as:

`gid = {home_team_id}{date}{game_number}`

Examples:
- home `LAN`, date `20200723`, game_number `0` → `LAN202007230`
- home `WAS`, date `20200723`, game_number `0` → `WAS202007230`

This join is deterministic and season-safe.

## Schedules (Important Context)
Schedules are a separate data product that lists originally planned games and postponements/makeup dates.

In this repo, schedules are provided as CSVs under:
- `data_sources/NEW_DATA_SETS/schedulecsvs/`

### Special note: 2020 schedules
For 2020 there are two schedules:
- `2020orig` = original pre-pandemic schedule
- `2020rev`  = revised 60-game pandemic schedule (official)

When a script needs a 2020 schedule, it must prefer the **revised** schedule.

### Schedule Field Definitions (authoritative)
1. Date (yyyymmdd)
2. Game number (0, 1, 2)
3. Day of week
4–5. Visiting team and league
6. Visiting team season game number
7–8. Home team and league
9. Home team season game number
10. Day/Night/Afternoon/Evening
11. Postponement/Cancellation indicator
12. Makeup date(s)

### Schedule Edge Cases to Expect
- Site changes (alternate parks)
- Weather postponements and reschedules
- Multiple makeup attempts (multiple dates in field 12, separated by `;`)
- Folded teams / historical anomalies (rare; but must be documented and handled if encountered)

