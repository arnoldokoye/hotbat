import { simulateNetworkLatency } from "./utils";

// Types aligned with docs/Backend_API_Contracts.md
export type TeamDashboardResponse = {
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
    date: string;
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
    overview: { label: string; hrPerGame: number; leagueAvgHrPerGame?: number }[];
    homeAway: { label: string; hrPerGame: number; leagueAvgHrPerGame?: number }[];
    lhpRhp: { label: string; hrPerGame: number; leagueAvgHrPerGame?: number }[];
    monthly: { label: string; hrPerGame: number; leagueAvgHrPerGame?: number }[];
  };
  games: {
    id: number;
    date: string;
    opponent: string;
    park: string;
    result?: string;
    hr: number;
    xHr?: number;
    hrDiff?: number;
    opposingSp?: string;
    opposingSpHr9?: number;
  }[];
};

export type TeamDashboardData = TeamDashboardResponse & {
  filters: {
    defaultSeason: string;
    defaultSplit: string;
    defaultPark: string;
    defaultHomeAway: string;
    defaultDateRange: string;
    defaultPitcherHand: string;
    defaultMinPa: number;
  };
};

export async function fetchTeamDashboard(params: {
  teamId: number | string;
  season?: number;
  split?: string;
  from?: string;
  to?: string;
}): Promise<TeamDashboardData> {
  await simulateNetworkLatency();

  const {
    teamId,
    season = 2024,
    split = "overall",
    from,
    to,
  } = params;

  const search = new URLSearchParams();
  search.set("teamId", String(teamId));
  if (season !== undefined) search.set("season", String(season));
  if (split) search.set("split", split);
  if (from) search.set("from", from);
  if (to) search.set("to", to);

  const res = await fetch(`/api/team-dashboard?${search.toString()}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch team dashboard: ${res.status} ${text}`);
  }
  const data = (await res.json()) as TeamDashboardResponse;

  // Filters: keep previous defaults for UI compatibility
  return {
    ...data,
    filters: {
      defaultSeason: String(season ?? "2024"),
      defaultSplit: split ?? "overall",
      defaultPark: "",
      defaultHomeAway: "all",
      defaultDateRange: "",
      defaultPitcherHand: "all",
      defaultMinPa: 0,
    },
  };
}
