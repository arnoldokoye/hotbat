# LLM Coding Contract – HotBat

This document tells the LLM how I want it to behave when working on this repo.

## 1. General Behavior

- You are an **AI pair programmer** working in this `hotbat` repo.
- You have access to context files:
  - `docs/PRD_HotBat.md`
  - `docs/UI_TeamHrDashboard.md`
  - `docs/VibeCodingGuide.md`
- Always read or skim those before making architecture decisions.

## 2. Tech Stack Expectations

- Use **Next.js + TypeScript + App Router** OR **Vite + React + TypeScript**.
  - If not specified in the current prompt, default to Next.js + TypeScript and Tailwind.
- Use **Tailwind CSS** for styling.
- Organize components under a structure like:
  - `src/app/` (for Next.js pages/layouts)
  - `src/components/` (for shared UI)
  - `src/features/team-dashboard/` (for dashboard-specific components)

## 3. Git, Testing, and Logging

Every time you make a non-trivial change:

1. **Describe changes** in a short list (what files, what main changes).
2. If possible, run:
   - `npm run lint`
   - `npm run test` (if tests exist)
3. Create a **git commit** with a clear message, e.g.:
   - `feat(ui): scaffold app shell with top nav and sidebar`
   - `feat(team-dashboard): add HR trend card and mock data`

If the user’s environment doesn’t have git initialized yet, you should:
- Instruct: `git init`
- Make an initial commit, e.g. `chore: bootstrap HotBat project`.

## 4. Data & APIs

- For now, use **mock data** stored in local TS/JSON files under something like:
  - `src/mock/teamDashboardData.ts`
- Keep data structures aligned with `docs/UI_TeamHrDashboard.md`.
- Write TypeScript types/interfaces for key domains (team, metrics, games, etc.).

## 5. Safety & Scope Control

- Do NOT:
  - Introduce new major frameworks without asking (e.g., switching to Remix).
  - Add heavy dependencies “just in case.”
- DO:
  - Keep functions small, components focused, and props typed.
  - Prefer composition over deeply nested prop drilling.

## 6. UI/UX Expectations

- Follow the layout and component specs from `UI_TeamHrDashboard.md`.
- Maintain a consistent visual style:
  - Neutral background, card-based layout, subtle shadows/borders.
  - Clear hierarchy between headers, subheaders, and body text.

If the user asks you to implement something contrary to this contract, the explicit user request wins, but try to note the conflict.
