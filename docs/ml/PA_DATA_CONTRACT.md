# PA Data Contract (Retrosheet-only)

This document defines the **stable, deterministic contract** for HotBat’s plate-appearance (PA) datasets generated from Retrosheet organized CSVs (daily logs), with backward-compatible support for older cwevent-derived CSV inputs.

## Purpose
- Provide a reproducible, joinable, PA-level dataset for baseline evaluation and future ML.
- Ensure **same inputs → byte-identical outputs** (processed CSVs).
- Make downstream pipelines independent from seed DB data.

## Dataset Definitions

### `pa_events` (features / context; Retrosheet-only)
- **Raw:** `<out-dir>/raw/pa_events_raw.csv`
- **Processed (contract):** `<out-dir>/processed/pa_events.csv`

### `pa_labels` (ground-truth label; Retrosheet-only)
- **Raw:** `<out-dir>/raw/pa_labels_raw.csv`
- **Processed (contract):** `<out-dir>/processed/pa_labels.csv`
- **Stats:** `<out-dir>/processed/pa_labels_stats.json`

## `pa_id` (deterministic unique key)
Each row represents **exactly one plate appearance** and must have a stable unique identifier:

- `pa_id = "{game_id}:{event_seq}"`
- `event_seq` is a **1-based** integer that increments for each PA within the same `game_id`.
  - For daily logs `plays.csv`, `event_seq` follows play order (`pn`) after filtering to `pa == 1`.
  - For older cwevent-derived CSVs, `event_seq` follows the source row order after filtering to PA rows.

Determinism guarantee:
- File discovery is sorted.
- Rows are filtered deterministically to PA rows (see below).
- `event_seq` is assigned deterministically per `game_id`.
- Processed outputs are sorted deterministically and written with stable column order and `\n` line endings.

## PA row selection rule
When using daily logs `plays.csv`:
- A row is treated as a PA iff `pa == 1`.

When using older cwevent-derived CSVs:
- A row is treated as a PA if `BAT_EVENT_FL` is truthy (`T/1/Y/TRUE`).
- For compact/minimal CSVs, the script will treat rows as PA rows directly (or use `PA_NEW_FL`/`START_PA_FLAG` if present).

## Processed CSV Schemas

### `processed/pa_events.csv` (required columns)
| column | type | definition |
|---|---:|---|
| `pa_id` | string | Unique PA key (`{game_id}:{event_seq}`) |
| `season` | int | Derived from `game_date` year (or `game_id` when date is embedded) |
| `game_date` | string | `YYYY-MM-DD` if available, else empty |
| `game_id` | string | Retrosheet game id (e.g. `BOS202007240`) |
| `event_seq` | int | 1-based PA index within `game_id` |
| `bat_id` | string | Retrosheet batter id |
| `pit_id` | string | Retrosheet pitcher id |
| `bat_team_id` | string | Batting team (`batteam` in daily logs; derived for older cwevent inputs) |
| `pit_team_id` | string | Pitching/fielding team (`pitteam` in daily logs; derived for older cwevent inputs) |
| `event_cd` | int | Retrosheet event code (e.g. `23` = HR) |
| `inning` | int | Inning count if available, else empty |
| `outs` | int | Outs before play if available, else empty |
| `bat_home` | int | 0/1 home batting flag if available, else empty |

### `processed/pa_labels.csv` (required columns)
| column | type | definition |
|---|---:|---|
| `pa_id` | string | Join key to `pa_events` |
| `season` | int | Same derivation as `pa_events` |
| `game_date` | string | Same derivation as `pa_events` |
| `game_id` | string | Same as `pa_events` |
| `event_seq` | int | Same as `pa_events` |
| `bat_id` | string | Retrosheet batter id |
| `pit_id` | string | Retrosheet pitcher id |
| `event_cd` | int | Retrosheet event code |
| `is_hr` | int | Label: `1` if HR else `0` |

## HR label definition (Retrosheet)
- `is_hr = 1` iff `event_cd == 23` (Retrosheet event code for Home Run).

## Event code derivation (daily logs)
Daily logs `plays.csv` does not include a single `event_cd` column. HotBat derives `event_cd` deterministically from the outcome flags.

Minimum invariant (required):
- `hr == 1` → `event_cd = 23`

HotBat’s current mapping (MVP) derives common codes such as:
- `single` → 20, `double` → 21, `triple` → 22, `hr` → 23
- `walk` → 14, `iw` → 15, `hbp` → 16, `k` → 3
- `roe` → 18, `fc` → 19, `xi` → 17
- else defaults to `2` (generic out)

## Validation Checks (enforced in stats and optionally fatal)
Generated stats include:
- `total_rows`
- `unique_pa_id_count`
- `duplicates_count`
- `null_pa_id_count`
- `hr_count`
- `hr_rate`

When `--fail-on-invalid` is set, scripts exit non-zero if:
- `duplicates_count > 0`, or
- `null_pa_id_count > 0`, or
- `unique_pa_id_count != total_rows`
