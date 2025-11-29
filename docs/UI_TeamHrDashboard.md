# HotBat – Team HR Dashboard UI Spec

This document defines the UI and components for the **Team HR Dashboard** page.

## 1. Global Layout (App Shell)

### 1.1 Top Navigation (`<TopNav />`)

- Left:
  - HotBat logo / wordmark (text for now)
- Center:
  - `[Season ⌄]` dropdown (e.g. 2024, 2025, All Seasons)
- Right:
  - Theme toggle (☾ / ☀)
  - Login / avatar placeholder

On mobile:
- A hamburger `[≡]` icon appears to open the sidebar.

---

### 1.2 Sidebar Navigation (`<SidebarNav />`)

- Items:
  - Teams
  - Today’s Games
  - Players
  - Tools
- Vertical layout on desktop.
- On mobile:
  - Hidden by default, shown as drawer when `[≡]` is tapped.

---

### 1.3 Layout ASCII Sketch

```text
+----------------------------------------------------------------------------------+
| HOTBAT LOGO/WORDMARK          [Season ⌄]   [Login/Avatar]         [Dark ☾/☀]     |
+----------------------------------------------------------------------------------+
| TEAMS  |                               |                                          |
|  TODAY |                               |                                          |
|  GAMES |                               |     TEAM HR DASHBOARD CONTENT            |
|  PLAY- |                               |                                          |
|  ERS   |                               |                                          |
|  TOOLS |                               |                                          |
+--------+-------------------------------+------------------------------------------+
|               FOOTER: version, links, etc.                                       |
+----------------------------------------------------------------------------------+
2.1 Layout Overview

Components on the page:

TeamHeader

TeamFiltersStrip

TeamKeyMetricsRow

Main cards grid:

TeamHrTrendCard

PitcherHrVulnerabilityCard

UpcomingGamesCard

TeamSplitsCard

GameHrTable

Desktop ASCII wireframe:
|  TEAM DASHBOARD HEADER                                            |
|  ---------------------------------------------------------------- |
|  [Team Badge]  [TEAM NAME] [Season ⌄] [Split ⌄] [Park ⌄]          |
|  [League / Division] [Home/Away ⌄] [Save as Favorite ★]           |
|                                                                   |
|  FILTER STRIP                                                     |
|  [Date Range ⌄] [Vs Pitcher Hand ⌄] [Min PA slider] [Reset ⟳]     |
|                                                                   |
|  KEY METRICS ROW                                                  |
|  +-----------------+  +-----------------+  +-------------------+   |
|  | Team HR / G     |  | HR% vs League   |  | Top HR Park      |   |
|  | 1.34 (rank 3rd) |  | +18% above avg  |  | Yankee Stadium   |   |
|  +-----------------+  +-----------------+  +-------------------+   |
|                                                                   |
|  MAIN GRID                                                        |
|  +-------------------------+   +-------------------------------+   |
|  | TEAM HR TREND           |   | PITCHER HR VULNERABILITY      |   |
|  | (line chart: HR/G, xEV) |   | (table / bar chart)           |   |
|  | [HR/G] [EV] [Barrels]   |   |                               |   |
|  +-------------------------+   +-------------------------------+   |
|                                                                   |
|  +-------------------------+   +-------------------------------+   |
|  | UPCOMING GAMES / SERIES |   | TEAM SPLITS SNAPSHOT          |   |
|  | (cards per game)        |   | vs LHP/RHP/Home/Away/Month    |   |
|  +-------------------------+   +-------------------------------+   |
|                                                                   |
|  FULL-WIDTH TABLE                                                |
|  +------------------------------------------------------------+   |
|  | GAME-LEVEL HR VIEW                                         |   |
|  | [Date] [Opponent] [Park] [HRs] [xHR] [Pitcher HR/9] ...    |   |
|  +------------------------------------------------------------+   |

3. Component Specs
3.1 TeamHeader

Props (conceptually):

teamId

teamName

teamLogoUrl

divisionLabel

season, onSeasonChange

split, onSplitChange

park, onParkChange

homeAway, onHomeAwayChange

isFavorite, onToggleFavorite

UI:

Team logo + name

League/division text

Dropdowns:

Season

Split (Full season, Last 30 days, Post-ASB, etc.)

Park (All Parks or specific)

Home/Away

Star button to save/remove as favorite.

3.2 TeamFiltersStrip

Controls:

[Date Range ⌄] – presets + custom later

[Vs Pitcher Hand ⌄] – All / vs LHP / vs RHP

[Min PA] slider or numeric input

Advanced Filters ⌄ (placeholder)

Reset ⟳ button

3.3 TeamKeyMetricsRow & MetricCard

Displays 3–4 key metrics:

Team HR/G

HR% vs league average

xHR – HR difference

Top HR park and % of HRs there

Metric card layout:

Title (small text)

Main value (big text)

Subtext (e.g., “3rd in MLB”)

Optional trend indicator (arrow up/down, e.g., “Last 14 days vs season”).

3.4 TeamHrTrendCard

Header:

Title: “Team HR Trend”

Metric toggles: [HR/G] [Avg EV] [Barrels]

Body:

Line/area chart (mock data)

Tooltip on hover

Footer:

Note: “Rolling 7-game average” (for example)

Data structure (mock):

type TeamHrTimePoint = {
  date: string;
  hr: number;
  xHr: number;
  avgEv: number;
  barrels: number;
};

3.5 PitcherHrVulnerabilityCard

Header:

Title: “Pitcher HR Vulnerability vs [TEAM]”

Filters: [Min BF ⌄], [Sort by ⌄]

Body:

Table with columns:

Pitcher

Team

HR allowed

HR/9 vs this team

Avg EV allowed

Max distance

Mock type:

type PitcherRow = {
  pitcherName: string;
  pitcherTeam: string;
  hrAllowed: number;
  hrPer9: number;
  avgEvAllowed: number;
  maxDistance: number;
};

3.6 UpcomingGamesCard

Header:

Title: “Upcoming Games / Series”

[Next: 7 days ⌄]

Body:

List of upcoming games:

Opponent logo + name

Date/time

Park + HR factor

Projected HR range for team

Mock type:

type UpcomingGame = {
  date: string;
  opponentName: string;
  opponentLogoUrl?: string;
  parkName: string;
  parkHrFactor: number;
  projectedHrMin: number;
  projectedHrMax: number;
};

3.7 TeamSplitsCard

Tabs:

Overview

Home vs Away

LHP vs RHP

Monthly

Each tab shows small tables or mini bar rows for HR/G and similar metrics.

3.8 GameHrTable

Full-width table at bottom.

Controls:

Search box

Column picker placeholder

Columns:

Date

Opponent

Park

Result

HR

xHR

HR diff (HR – xHR)

Opposing SP

Opposing SP HR/9

Pagination controls at bottom.

Mock type:
type GameRow = {
  id: string;
  date: string;
  opponent: string;
  park: string;
  result: string;
  hr: number;
  xHr: number;
  hrDiff: number;
  opposingSp: string;
  opposingSpHr9: number;
};
