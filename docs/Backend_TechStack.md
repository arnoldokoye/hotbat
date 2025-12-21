# HotBat Backend Tech Stack

## Goals

- Power Team HR Dashboard, Player HR Dashboard, and Today’s Games with real data.
- Support ML-based HR projections (HotBatScore) without overcomplicated infra.
- Keep everything manageable for a single developer using TypeScript + Python.

## Core Stack

- **Runtime / Web Framework:** Next.js (App Router) with TypeScript
  - Frontend pages and components already implemented.
  - Backend API will be implemented via route handlers under `app/api/*`.

- **Database:** PostgreSQL
  - Managed provider (Supabase / Neon / Railway / RDS).
  - Accessed through Prisma ORM.

- **ORM:** Prisma
  - Single Prisma schema under `prisma/schema.prisma`.
  - Handles migrations and generated types.

- **Caching (later):** Redis
  - Optional, for caching hot dashboard responses and Today’s Games.

- **ML stack:**
  - Python (pandas, numpy, scikit-learn or XGBoost/LightGBM).
  - Phase 1: Offline batch predictions stored in Postgres (`game_hr_predictions`).
  - Phase 2: Optional Python service (FastAPI) for realtime inference if needed.

## Architecture Overview

- **Data ingestion & ML (offline, Python)**
  - Jobs fetch raw MLB/statcast-style data.
  - Normalize into core tables in Postgres.
  - Build feature sets and train ML models.
  - Write predictions to `game_hr_predictions` (and later, other prediction tables).

- **API layer (Next.js route handlers)**
  - `/api/team-dashboard`
  - `/api/player-dashboard`
  - `/api/today-games`
  - Each handler:
    - Queries Postgres via Prisma.
    - Optionally uses Redis for caching.
    - Returns JSON matching the frontend’s `fetch*` functions (see API contracts doc).

- **Frontend**
  - Uses `src/lib/api/*` to call the backend endpoints.
  - Already has UI for Team HR Dashboard, Player Dashboard, Today’s Games.

## Local Verification

- Preferred single command: `npm run verify:e2e` (frees ports 3100/9333, starts dev server on 127.0.0.1:3100, runs Playwright with `PLAYWRIGHT_WEB_SERVER=0` and `BASE_URL`, then cleans up). Ensure `DATABASE_URL` is set (e.g., via `.env.local`) so Prisma-backed tests run.

The backend should be implemented in a way that respects:
- `docs/Backend_Schema_v1.md`
- `docs/Backend_API_Contracts.md`
- The existing frontend code and file structure.
