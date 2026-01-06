# ML MVP Plan

## Phases
- **Phase 0 (current)**: Retrosheet-only ML foundation: deterministic PA dataset contract + labels + baseline evaluation (no ML training).
- **Phase 1**: logistic regression HR probability model; features: HR/PA, park factor, handedness splits, recent form.
- **Phase 2**: feature expansion (splits, park factors per handedness, pitcher tendencies); evaluation vs. Phase 1.
- **Phase 3**: advanced models + statcast integration; add confidence intervals; consider deployment gating.

## DB connectivity notes (verified)
- Use the Supabase *pooler* URL (redacted): `postgresql://postgres.<project-id>@aws-1-us-east-2.pooler.supabase.com:5432/postgres?sslmode=require&pgbouncer=true` (keep password in `.env.local`, do not commit).
- SSL is required; trust the Supabase Root 2021 CA (already added to System keychain) and keep `NODE_EXTRA_CA_CERTS=prod-ca-2021.crt` in `.env.local`.
- Sanity checks (no secrets on the CLI):
  - `nslookup aws-1-us-east-2.pooler.supabase.com 8.8.8.8`
  - `nc -vz aws-1-us-east-2.pooler.supabase.com 5432`
  - `DATABASE_URL=$DATABASE_URL npx prisma db pull --schema prisma/schema.prisma` (or `psql "$DATABASE_URL" -c "select 1;"`)

## Artifacts per phase
- Phase 0: PA-level labeled CSV; per-player HR/PA baseline; expected HR (hr_prob * projected PA); docs + changelog.
- Phase 1+: model weights, feature definitions, eval report, dataset version.

## Data sources & storage
- Canonical Retrosheet sources (organized CSVs):
  - Daily logs: `data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/{YEAR}DAILY_LOGScsvs/`
  - Game logs: `data_sources/NEW_DATA_SETS/2020-25 GAMELOGS/gl{YEAR}.txt`
  - Schedules: `data_sources/NEW_DATA_SETS/schedulecsvs/` (2020 has orig + revised; prefer revised)
- Legacy Retrosheet raw event files under `data_sources/retrosheet/raw` are no longer required for the MVP pipeline.
- Outputs:
  - Default out-dir is `scripts/ml/data/` (raw + processed + reports).
  - Keep large files out of git or git-ignored; document paths.

## CSV-first dashboards (MVP)
- `/api/player-dashboard` and `/api/team-dashboard` run CSV-first in auto mode, falling back to DB only when CSV data is missing or empty.
- Player/team recent form windows are derived from PA-level `plays.csv` (last 10/25/50 PA, season-scoped, date-anchored).
- Handedness splits (vs LHP/RHP) and park factors are Retrosheet-based estimates (no Statcast).

## Dataset versioning
- Each data or model change bumps a dataset version (e.g., v0.1.0).
- Record changes in `docs/ml/ML_CHANGELOG.md` with date, version, summary, and verification steps.

## Data generation commands (Phase 0)
- Contract: see `docs/ml/PA_DATA_CONTRACT.md`.
- Build PA events + HR labels (deterministic, no ML training):
  ```bash
  python3 scripts/ml/build_pa_events.py \
    --input-glob "data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/2020DAILY_LOGScsvs/2020plays.csv" \
    --out-dir "scripts/ml/data" \
    --fail-on-invalid

  python3 scripts/ml/build_player_pa_labels.py \
    --input-glob "data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/2020DAILY_LOGScsvs/2020plays.csv" \
    --out-dir "scripts/ml/data" \
    --fail-on-invalid
  ```
  Rerun anytime after updating Retrosheet sources.
  - To build multiple seasons at once, use:
    `--input-glob "data_sources/NEW_DATA_SETS/2020-25 DAILY LOGS/*DAILY_LOGScsvs/*plays.csv"`

- Baseline evaluation (no model; time-based holdout):
  ```bash
  python3 scripts/ml/eval_baseline.py \
    --events "scripts/ml/data/processed/pa_events.csv" \
    --labels "scripts/ml/data/processed/pa_labels.csv" \
    --holdout-season 2020 \
    --min-pa 50
  ```

- Player-Day feature materialization (features layer; no training):
  - Docs: `docs/ml/05_player_day_feature_plan.md`, `docs/ml/06_feature_building_rules.md`
  ```bash
  python3 scripts/ml/build_player_day_features.py \
    --labels "scripts/ml/data/processed/pa_labels.csv" \
    --out-dir "scripts/ml/data/features_v1" \
    --fail-on-invalid
  ```

## Reproducibility
- All scripts must be deterministic: same input → same output.
- Document CLI steps to regenerate datasets.
- No silent schema or contract changes; log in PROGRESS_LOG.md + changelog.

## Evaluation metrics
- Phase 0: HR/PA baseline; compare expected HR vs. actual HR count on held-out games.
- Phase 1+: logloss, AUC for HR classification; calibration checks.

## DO NOT
- Do not change DB schema without explicit mismatch proof and documentation.
- Do not leak PII; keep datasets local or git-ignored.
- Do not ship unlogged datasets or silent contract changes.

## Update rules for any ML change
- Bump dataset version.
- Add entry to `docs/ml/ML_CHANGELOG.md`.
- Add PROGRESS_LOG.md entry with what changed and how to verify.
- Provide CLI commands to regenerate/verify.
