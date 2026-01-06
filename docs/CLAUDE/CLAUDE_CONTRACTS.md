# HotBat – Claude Context (READ FIRST)

## Project Summary
HotBat is an MLB analytics web app focused on home run analysis and prediction.
Current phase: Retrosheet-only CSV backend (no Statcast yet).

## Tech Stack
- Next.js (App Router)
- TypeScript
- API routes under /src/app/api
- CSV-backed data loaders (Retrosheet-derived)
- No database dependency required for core dashboards

## Current Architecture
- /api/player-dashboard accepts:
  - player_id = Retrosheet ID (string)
- CSV loaders live in:
  - src/lib/csv/
- Backend abstraction:
  - src/lib/backend/DataBackend.ts
- Statcast-only fields intentionally return null

## HARD CONSTRAINTS (DO NOT VIOLATE)
- Retrosheet-only mode must remain functional
- Player identity = Retrosheet ID (not MLB numeric ID)
- No schema changes without explicit approval
- Do NOT refactor or rename files unless instructed
- Do NOT introduce Statcast yet

## Data Philosophy
- Git tracks code, schemas, and small samples only
- Raw datasets are downloaded via scripts and ignored by Git
- All metrics must be derivable from Retrosheet CSVs

## Immediate Goals
- UI stat semantics review (per-game vs per-PA)
- Baseline HR modeling (no ML heavy lifting yet)
- Incremental, reviewable changes only
