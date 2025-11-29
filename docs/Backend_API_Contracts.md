# HotBat Backend API Contracts (v1)

These are the main JSON shapes the frontend expects from the backend.

## 1. Team Dashboard API

**Endpoint (HTTP):**

`GET /api/team-dashboard?teamId=TEAM_ID&season=2024&split=overall&from=YYYY-MM-DD&to=YYYY-MM-DD`

**Response shape (TypeScript-style):**

```ts
type TeamDashboardResponse = {
  teamInfo: {
    id: number;
    name: string;
    abbrev: string;
    league: string;
    division: string;
    logoUrl?: string;
  };
  keyMetrics: {
    id: string;
    label: string;
    value: string;
    comparisonText?: string;
    trendDirection?: "up" | "down" | "flat";
  }[];
  hrTimeSeries: {
    date: string;     // ISO date
    hr: number;
    xHr?: number;
    avgEv?: number;
    barrels?: number;
  }[];
  pitcherVulnerability: {
    pitcherName: string;
    pitcherTeam: string;
    hrAllowed: number;
    hrPer9: number;
    avgEvAllowed?: number;
    maxDistance?: number;
  }[];
  upcomingGames: {
    gameId: number;
    date: string;
    opponentName: string;
    opponentAbbrev: string;
    parkName: string;
    parkHrFactor?: number;
    predictedHrMean?: number;
    predictedHrStd?: number;
    hotbatScore?: number;
  }[];
  splits: {
    overview: TeamSplitRow[];
    homeAway: TeamSplitRow[];
    lhpRhp: TeamSplitRow[];
    monthly: TeamSplitRow[];
  };
  games: GameRow[];
};

type TeamSplitRow = {
  label: string;           // "Home HR/G", "vs LHP HR/G"
  hrPerGame: number;
  leagueAvgHrPerGame?: number;
};

type GameRow = {
  id: number;
  date: string;
  opponent: string;
  park: string;
  result?: string;         // "W 6–3"
  hr: number;
  xHr?: number;
  hrDiff?: number;
  opposingSp?: string;
  opposingSpHr9?: number;
};
2. Today’s Games API

Endpoint:

GET /api/today-games?date=YYYY-MM-DD

Response:

type TodayGamesResponse = {
  date: string;
  games: TodayGame[];
};

type TodayGame = {
  id: number;              // game id
  date: string;
  startTimeLocal?: string;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamAbbrev: string;
  awayTeamAbbrev: string;
  homeTeamLogoUrl?: string;
  awayTeamLogoUrl?: string;
  parkName: string;
  parkHrFactor?: number;
  homePredictedHrMean?: number;
  awayPredictedHrMean?: number;
  hotbatScore?: number;    // HR-friendliness score for this game
};
3. Player Dashboard API (later phase)

We are not implementing this immediately in v1 of the backend, but the eventual endpoint will look like:

GET /api/player-dashboard?playerId=PLAYER_ID&season=2024&from=YYYY-MM-DD&to=YYYY-MM-DD

and return the structures already defined in docs/UI_TeamHrDashboard.md and your player-dashboard UI spec.

4. Implementation Notes

All dates are returned as ISO strings.

API handlers should:

Validate query parameters and return 400 for invalid requests.

Return 404 if the team/player/game does not exist.

The v1 backend is allowed to:

Return partial data (e.g., predictedHrMean undefined if predictions missing).

The frontend should treat all optional fields defensively.