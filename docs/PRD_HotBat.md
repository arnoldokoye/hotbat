# HotBat – Product Requirements Document (PRD)

## 1. Product Overview

HotBat is a multi-page MLB home-run intelligence web app.

It focuses on:
- Team and player level **home run (HR) analytics**
- Statcast-driven metrics (EV, LA, barrel rate, xHR, park factors, pitcher HR vulnerability, etc.)
- Presenting information in a **clean, modern, low-friction UI** with strong visualizations

Primary users:
- Casual fans who want to know "Which teams/players are hot?"
- Sports nerds who care about advanced metrics
- (Later) DFS / sports betting users (but the app is analytics-first, not a sportsbook)

MVP focuses on **team-level HR analytics** via a **Team HR Dashboard**.

---

## 2. MVP Scope

### 2.1 Core MVP Pages

1. **Team HR Dashboard (Step 1 / current focus)**
   - Team-level metrics:
     - HR per game (HR/G)
     - HR% vs league average
     - xHR vs HR (over/underperformance)
     - Splits (home/away, vs LHP/RHP, monthly)
   - Time series trend chart:
     - HR/G over time
     - Optional overlays: average exit velocity, barrels
   - Pitcher HR vulnerability:
     - List of opposing pitchers who have allowed HRs vs this team
   - Upcoming games / series:
     - Opponents, park, HR-friendliness, projected HR range
   - Game-level HR table:
     - One row per game with key HR metrics

2. **Future pages (for later, not part of this coding task)**
   - Player HR Dashboard
   - Today’s Games view
   - Tools (playground for filters and experiments)

---

## 3. Non-Functional Requirements

- Built as a **React + TypeScript** multi-page app (Next.js or React Router is acceptable).
- **Tailwind CSS** for styling.
- Layout must be **responsive** (desktop, tablet, mobile).
- Code should be structured in small, reusable components.
- Prepared for future integration with:
  - Real stat feeds or APIs
  - User accounts / saved favorites
- Initial version can assume **mock data** (JSON) but keep structure ready for real APIs.

---

## 4. Data & Metrics (Conceptual)

For the UI build, it’s okay to use mocked data with fields like:

- Team:
  - `teamId`, `teamName`, `teamLogoUrl`, `league`, `division`
- Metrics:
  - `hrPerGame`
  - `hrVsLeaguePercent`
  - `xHr`, `hrMinusXhr`
  - `splits` (home/away, LHP/RHP, monthly)
- Time series:
  - `{ date, hr, xHr, avgEv, barrels }`
- Pitcher vulnerability:
  - `{ pitcherName, team, hrAllowed, hrPer9, avgEvAllowed, maxDistance }`
- Upcoming games:
  - `{ date, opponent, park, parkHrFactor, projectedHrMin, projectedHrMax }`
- Game table rows:
  - `{ date, opponent, park, result, hr, xHr, hrDiff, opposingSp, opposingSpHr9 }`

The current coding task focuses on **UI and component structure**, not real data ingestion.

---

## 5. UX Principles

- Minimal, clean, modern.
- Emphasis on **readability of stats**:
  - Large main numbers
  - Clear labels
  - Light grid lines in charts
- Cards and dashboards should feel “dashboard-like” but not cluttered.
- Mobile experience must still be great: vertical stacking, scrollable table, large tap targets.

---

## 6. Current Task (Step 3)

Implement the **Team HR Dashboard page UI**, including:
- Global AppShell (top nav, sidebar, footer)
- Team HR Dashboard page and components as described in `UI_TeamHrDashboard.md`
- Use **mock data** and proper TypeScript types.
- Use **clean file structure** and **git commits** after logical milestones.
