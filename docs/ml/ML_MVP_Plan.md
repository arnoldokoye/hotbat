# ML MVP Plan

## Phases
- **Phase 0 (current)**: deterministic baselines from Retrosheet; HR/PA and expected HR per game; no ML training.
- **Phase 1**: logistic regression HR probability model; features: HR/PA, park factor, handedness splits, recent form.
- **Phase 2**: feature expansion (splits, park factors per handedness, pitcher tendencies); evaluation vs. Phase 1.
- **Phase 3**: advanced models + statcast integration; add confidence intervals; consider deployment gating.

## Artifacts per phase
- Phase 0: PA-level labeled CSV; per-player HR/PA baseline; expected HR (hr_prob * projected PA); docs + changelog.
- Phase 1+: model weights, feature definitions, eval report, dataset version.

## Data sources & storage
- Retrosheet events (already present under data_sources/retrosheet/raw and derived/events_csv).
- Outputs:
  - `data/ml/raw/retrosheet/` for combined PA CSV
  - `data/ml/processed/` for labeled/feature-ready datasets
  - Keep large files out of git or git-ignored; document paths.

## Dataset versioning
- Each data or model change bumps a dataset version (e.g., v0.1.0).
- Record changes in `docs/ml/ML_CHANGELOG.md` with date, version, summary, and verification steps.

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
