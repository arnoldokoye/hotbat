# Retrosheet Daily Logs (HotBat)

## Purpose
Daily logs provide game- and player-level CSVs that are already parsed and normalized by Retrosheet tooling.

HotBat uses these to:
- avoid parsing raw `.EVA/.EVN/.EBA/.EBN` event files
- build deterministic, season-aware datasets (player-day features, daily slates, etc.)

## Canonical Source in This Repo
Daily logs are year-partitioned under:
- `data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/{YEAR}DAILY_LOGScsvs/`

Each season directory contains:
- `{YEAR}allplayers.csv`
- `{YEAR}gameinfo.csv`
- `{YEAR}teamstats.csv`
- `{YEAR}batting.csv`
- `{YEAR}pitching.csv`
- `{YEAR}fielding.csv`
- `{YEAR}plays.csv`

## Shared Keys / Joins
### `gid` (GameID)
Most daily-log files include `gid`, a Retrosheet GameID, used to join across daily log files.

HotBat also joins `gid` to game logs using:
`gid = {home_team_id}{date}{game_number}`

See `docs/data/GAMELOGS.md` for details.

### TEAM IDs + PARK IDs
- TEAM IDs and PARK IDs are consistent across **all** seasons and files.
- Do not remap or normalize them unless explicitly instructed.

---

## `allplayers.csv`
### Grain
- One row per **player × team × season**

### Use For
- Canonical player identity metadata (Retrosheet `id` → first/last name)
- Bats/throws metadata (`bat`, `throw`)
- Team-season boundaries (`first_g`, `last_g`)

### Do NOT Use For
- Game outcomes or game-level context (use `gameinfo.csv` / game logs)
- Plate-appearance truth (use PA-level datasets)

### Key Columns
- `id`: Retrosheet player ID (e.g. `abrej003`)
- `last`: last name
- `first`: first name
- `bat`: batting handedness (`B`, `L`, `R`, `?`)
- `throw`: throwing handedness (`L`, `R`, `?`)
- `team`: Retrosheet team ID
- `season`: season year
- `g`, `g_p`, `g_sp`, `g_rp`, `g_c`, …: games by position/role
- `first_g`, `last_g`: first/last game played (all game types) for that team-season where Retrosheet has game info

### Relation to Game Logs
- Player IDs (`id`) should appear in game logs where players are referenced.
- Names must be resolved via a single canonical registry (do not infer from other sources).

---

## `gameinfo.csv`
### Grain
- One row per **game**

### Use For
- Game-level metadata: teams, park/site, date, starttime, attendance, umpires, outcomes
- Deterministic `gid` joining across daily logs

### Do NOT Use For
- Starting pitchers (use game logs)
- Player lists (use `batting.csv` / `plays.csv`)

### Key Columns
- `gid`: GameID
- `visteam`, `hometeam`: team IDs
- `site`: park ID
- `date`: game date (`yyyymmdd`)
- `number`: game number (`0` single game; `1`, `2`, … doubleheaders)
- `starttime`: start time if known (used for deterministic tie-breaks)
- `daynight`
- `innings`: scheduled innings
- `usedh`, `tiebreaker`, `htbf`
- `timeofgame`, `attendance`
- umpire IDs: `umphome`, `ump1b`, `ump2b`, `ump3b`, `umplf`, `umprf`
- outcome pitchers: `wp`, `lp`, `save` (not the same as starting pitchers)
- `vruns`, `hruns`, `wteam`, `lteam`
- data availability flags: `line`, `batteries`, `lineups`, `box`, `pbp`
- `season`

### Relation to Game Logs
- `site` must match game logs `park_id` (field 17).
- Teams must match game logs home/visitor teams.

---

## `teamstats.csv`
### Grain
- One row per **team × game**

### Use For
- Team line scores (`inn1`…`inn28`)
- Team batting/pitching/fielding totals (PA, HR, BFP, etc.)
- Starting lineup identifiers by batting order (`start_l1`…`start_l9`) and fielding positions (`start_f1`…)

### Do NOT Use For
- Player identity mapping (use `allplayers.csv` + registry)
- PA-level truth (use PA datasets / plays)

### Key Columns
- `gid`, `team`, `opp`
- inning runs: `inn1`…`inn28`
- totals: `b_pa`, `b_hr`, `p_bfp`, `p_hr`, `d_e`, etc.
- `date`, `number`, `site`, `vishome`, `gametype`, `box`, `pbp`

### Relation to Game Logs
- Team IDs and `site` should match game logs for the same game.

---

## `batting.csv`
### Grain
- One row per **batter × game**

### Use For
- Identifying batters who appeared in a game (`b_pa > 0`)
- Batting totals (HR, PA, etc.)
- Deterministic daily slate construction (batter list + home/visitor context)

### Do NOT Use For
- Pitcher appearance order (use `pitching.csv`)
- PA-level event details (use PA datasets / `plays.csv`)

### Key Columns
- `gid`
- `id`: player_id
- `team`, `opp`
- `b_pa`, `b_hr`, other batting totals
- `date`, `number`, `site`, `vishome`

### Relation to Game Logs
- `gid` join provides park_id and starting pitchers for opponent context.

---

## `pitching.csv`
### Grain
- One row per **pitcher × game**

### Use For
- Pitching totals and HR allowed (`p_hr`)
- Pitcher appearance order (`p_seq` where `1` is starter)

### Do NOT Use For
- Determining canonical starting pitchers when game logs are available (game logs are authoritative)

### Key Columns
- `gid`
- `id`: pitcher_id
- `team`, `opp`
- `p_seq` (appearance order)
- `p_bfp`, `p_hr`, other pitching totals
- `gs` (game started), `gf` (game finished), etc.
- `date`, `number`, `site`, `vishome`

### Relation to Game Logs
- Game logs provide starting pitcher IDs directly; `pitching.csv` is a secondary source if needed.

---

## `fielding.csv`
### Grain
- One row per **fielder × position × game** (multiple rows per player if they played multiple positions)

### Use For
- Fielding totals by position (`d_pos`, `d_po`, `d_a`, `d_e`, …)

### Do NOT Use For
- Player identity mapping (use registry)
- Batting/pitching totals

### Key Columns
- `gid`
- `id`: player_id
- `team`, `opp`
- `d_pos` (fielding position), `d_seq` (position order)
- `date`, `number`, `site`, `vishome`

### Relation to Game Logs
- Game logs contain only starting lineups/positions; `fielding.csv` captures full defensive participation.

---

## `plays.csv`
### Grain
- One row per **play** in a game (play-by-play)

### Use For
- Play-level context and identifiers (`pn` play number)
- Batter/pitcher IDs per play (`batter`, `pitcher`)
- Determining which plays are plate appearances (`pa == 1`)
- Derived event flags (`hr`, `walk`, `k`, etc.)

### Do NOT Use For
- Canonical player names (use registry)
- Reconstructing park/team IDs (treat IDs as authoritative and stable; prefer game logs for park_id)

### Key Columns (subset; file has many)
- `gid`
- `event` (raw play string as in event file)
- `inning`, `top_bot`, `vis_home`
- `site` (park id for the event; can change in suspended/resumed games)
- `batteam`, `pitteam`
- `batter`, `pitcher`
- `pa` (1 if plate appearance)
- `hr` (home run indicator among other derived outcome columns)
- `outs_pre`, `outs_post`
- `pn` (play number)
- `date` (game date; can change mid-game for suspended/resumed games)

### Relation to Game Logs
- `gid` is the join key; game logs remain authoritative for park/team IDs and starting pitchers.

