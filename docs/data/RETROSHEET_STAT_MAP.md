# Retrosheet Stat → UI Mapping (CSV-Only, No Statcast)

This document defines how all HotBat UI statistics are derived **exclusively from Retrosheet CSVs** (daily logs + game logs).
No Statcast fields are inferred or approximated.

---

## Shared Keys & Joins (Global)

| Concept | Source |
| --- | --- |
| `player_id` | `batting.csv.id`, `pitching.csv.id` (Retrosheet ID) |
| `game_id` | `gid` (shared across all daily logs + teamstats + gameinfo) |
| `game_date` | `gameinfo.csv.date` (authoritative) |
| `team_id` | `team` |
| `opp_team_id` | `opp` |
| `park_id` | `site` |
| Home/Away | `vishome` (`h` = home, `v` = away) |
| Starting Pitcher | `pitching.csv` where `p_seq == 1` |
| Batter Hand | `allplayers.csv.bat` or `biofile.csv.bats` |
| Pitcher Hand | `allplayers.csv.throw` or `biofile.csv.throws` |

---

## HR Picks Page (`/picks`)

**Source:** `public/data/player_game_baseline.csv` (materialized pipeline output)

| UI Field | Source | Formula |
| --- | --- | --- |
| Player name | `player_registry.csv` | join by `player_id` |
| Team | baseline CSV | prejoined |
| Park | `ballparks.csv` | join by `park_id` |
| Pick Score | baseline CSV | `round(baseline_hr_score * 200)` |
| Baseline Score | baseline CSV | `baseline_hr_score` |
| Last 50 HR% | baseline CSV | precomputed |
| Season HR% | baseline CSV | `season_hr_total / season_pa` |
| Season HR total | baseline CSV | precomputed |
| Opposing pitcher | `player_registry.csv` | join `opposing_pitcher_id` |
| Pitcher HR allowed | pitcher features | `HR_allowed_last_50 / PA_allowed_last_50` |
| Park HR factor | baseline CSV | `1.0` default |
| Expected PA | baseline CSV | constant (e.g. `4.2`) |
| Reason bullets | derived | threshold rules |

---

## Today’s Games (`/today`)

**Source:** `gameinfo.csv` + `pitching.csv`

| UI Field | Formula |
| --- | --- |
| Games list | `gameinfo.csv` filtered by `date` |
| Home/Away teams | `hometeam`, `visteam` |
| Park | `ballparks.csv.site → name` |
| Start time | `gameinfo.csv.starttime` |
| Starters | `pitching.csv` where `p_seq==1` |
| Pitcher HR/9 | `9 * sum(p_hr) / (sum(p_ipouts)/3)` |
| Pitcher ERA | `9 * sum(p_er) / (sum(p_ipouts)/3)` |
| Park HR factor | `(HR/G at park) / (league HR/G)` from `teamstats.csv` |
| Projected HR | `mean ± std` of team HR/G |
| HotBatScore | scaled projected HR |

---

## Player HR Dashboard (`/player`)

**Primary source:** `batting.csv`

### Core Totals

| Stat | Formula |
| --- | --- |
| HR | `sum(b_hr)` |
| PA | `sum(b_pa)` |
| HR/PA | `sum(b_hr) / sum(b_pa)` |
| Games | `count(distinct gid)` |
| HR/Game | `sum(b_hr) / games` |

### ISO

```
ISO = (b_d + 2*b_t + 3*b_hr) / b_ab
```

(Guard `b_ab > 0`)

### Splits

| Split | Method |
| --- | --- |
| Home/Away | `vishome` |
| Monthly | group by month(date) |
| Last N games | order by date, take last N |
| vs LHP/RHP | join opposing starter → `throws` |

### Park Profile

| Stat | Formula |
| --- | --- |
| HR at park | `sum(b_hr) grouped by site` |
| HR/PA | `sum(b_hr)/sum(b_pa)` |
| Park HR factor | same league-wide method |

---

## Team HR Dashboard (`/team`)

**Source:** `teamstats.csv`

| Stat | Formula |
| --- | --- |
| Team HR | `sum(b_hr)` |
| HR/Game | `sum(b_hr)/games` |
| Home/Away | filter `vishome` |
| Monthly | group by month |
| vs LHP/RHP | join opposing starter |

### Pitcher Vulnerability vs Team

| Stat | Formula |
| --- | --- |
| HR allowed | `sum(p_hr)` |
| HR/9 | `9 * sum(p_hr)/(sum(p_ipouts)/3)` |

---

## Not Available From Retrosheet (Must Be Null)

- Avg Exit Velocity
- Barrels
- Launch Angle
- Max Distance
- Pitch-type damage
- Statcast xHR

### Honest Replacements

- **xHR → Expected HR (baseline)**
- EV / Barrels → hidden or shown as “— (Statcast required)”

---

## Design Principle

Retrosheet provides **outcomes, not contact quality**.
Statcast may be layered later without refactoring.

