# Phase 5.5 Trust & Feedback PRD (Internal)

## User problems
- “How good is this today?”
- “When should I trust it more vs less?”
- “What changed from yesterday?”

## Features (A–E)
1) **Model Health Indicator**
   - Surface a small status line on `/picks` from the latest monitoring row.
   - Status states: above baseline ✅ / similar ⚠️ / underperforming ❌ / baseline fallback.
2) **What changed since yesterday**
   - One short line under each pick with rank movement + dominant signal.
3) **Confidence bands**
   - Qualitative tiers only: Strong signal / Moderate signal / Thin edge.
4) **Human explainability rewrite**
   - Replace technical phrasing with broadcast‑style language.
5) **Today’s Top Edge**
   - Single highlight line from the #1 pick, hidden when unavailable.

## Non‑goals
- No probability display or calibration visuals.
- No ranking or model changes.
- No new DB dependencies.
- No new API contracts.

## UX principles
- Clarity > hype.
- Passive trust cues over dashboards.
- Short, human language.
- Hide gracefully if data is missing.

## Failure modes & fallbacks
- Missing monitoring file → show “Using baseline rankings.”
- Missing ML rankings → baseline fallback unchanged; ML‑only cues hidden.
- Missing prior date → “New to today’s rankings.”

