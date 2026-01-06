# Phase 6 Trust & Stability PRD (Internal)

## User intent
- Know when today’s rankings feel stable vs volatile.
- Understand how yesterday’s picks performed without being overwhelmed.
- Keep trust cues calm, plain, and non‑numerical.

## Feature behavior
### A) Rank stability label
- Use last 3–5 ML dates to classify each pick as Stable / Rising / Volatile / New.
- New if missing yesterday; Stable if rank variance small; Rising if trend improves; Volatile if swings.
- Label appears under confidence tier on each pick card.

### B) Yesterday recap line
- Show a short line below model status, above Top Edge.
- If ML monitoring available: “Yesterday’s top‑5 picks: X hit a home run.”
- If 0: “Yesterday’s top‑5 picks: no home runs (variance happens).”
- If baseline fallback: “Yesterday’s picks used baseline rankings.”
- Hide if data missing.

### C) Copy consistency
- One sentence per movement note.
- Broadcast‑style phrasing only; no stat sheet language.

## Guardrails
- No ranking order changes.
- No probabilities in UI.
- No DB reads.
- Hide features when data missing.

## Failure modes & fallbacks
- Missing ML monitoring CSV → hide recap.
- No previous ML date → “New today” label only.
- Baseline fallback active → show baseline recap line.

