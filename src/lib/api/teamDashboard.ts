import type {
  GameRow,
  PitcherRow,
  TeamHrTimePoint,
  TeamInfo,
  TeamKeyMetric,
  TeamSplitRow,
  UpcomingGame,
} from "@/features/team-dashboard/mock/teamDashboardData";
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

export type TeamDashboardData = {
  teamInfo: TeamInfo;
  teamKeyMetrics: TeamKeyMetric[];
  teamHrTimeSeries: TeamHrTimePoint[];
  pitcherRows: PitcherRow[];
  upcomingGames: UpcomingGame[];
  splits: {
    overview: TeamSplitRow[];
    homeAway: TeamSplitRow[];
    lhpRhp: TeamSplitRow[];
    monthly: TeamSplitRow[];
  };
  gameRows: GameRow[];
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

function resolveBaseUrl(explicit?: string) {
  if (explicit) return explicit;
  // When running in the browser, use the current origin.
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  // On the server, fall back to env vars or a local dev URL.
  const envHost =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    process.env.NEXTAUTH_URL;
  if (envHost) {
    return envHost.startsWith("http") ? envHost : `https://${envHost}`;
  }
  const port = process.env.PORT || "3000";
  return `http://127.0.0.1:${port}`;
}

export async function fetchTeamDashboard(params: {
  teamId: number | string;
  season?: number;
  split?: string;
  from?: string;
  to?: string;
  baseUrl?: string;
}): Promise<TeamDashboardData> {
  await simulateNetworkLatency();

  const {
    teamId,
    season = 2024,
    split = "overall",
    from,
    to,
    baseUrl,
  } = params;

  const url = new URL("/api/team-dashboard", resolveBaseUrl(baseUrl));
  url.searchParams.set("teamId", String(teamId));
  if (season !== undefined) url.searchParams.set("season", String(season));
  if (split) url.searchParams.set("split", split);
  if (from) url.searchParams.set("from", from);
  if (to) url.searchParams.set("to", to);

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch team dashboard: ${res.status} ${text}`);
  }
  const data = (await res.json()) as TeamDashboardResponse;

  const teamLogoUrl =
    data.teamInfo.logoUrl ??
    (data.teamInfo.abbrev
      ? `/team-logos/${data.teamInfo.abbrev.toLowerCase()}.svg`
      : "/team-logos/default.svg");

  const teamInfo: TeamInfo = {
    teamId: data.teamInfo.abbrev || String(data.teamInfo.id),
    teamName: data.teamInfo.name,
    teamLogoUrl,
    league: data.teamInfo.league,
    division: data.teamInfo.division,
  };

  const teamKeyMetrics: TeamKeyMetric[] = (data.keyMetrics ?? []).map((metric) => ({
    id: metric.id,
    label: metric.label,
    value: metric.value,
    comparisonText: metric.comparisonText ?? "",
    trendDirection: metric.trendDirection,
    trendValue: undefined,
  }));

  const teamHrTimeSeries: TeamHrTimePoint[] = (data.hrTimeSeries ?? []).map((point) => ({
    date: point.date ? point.date.slice(0, 10) : "",
    hr: point.hr,
    xHr: point.xHr ?? point.hr,
    avgEv: point.avgEv ?? 0,
    barrels: point.barrels ?? 0,
  }));

  const pitcherRows: PitcherRow[] = (data.pitcherVulnerability ?? []).map((row) => ({
    pitcherName: row.pitcherName,
    pitcherTeam: row.pitcherTeam,
    hrAllowed: row.hrAllowed,
    hrPer9: row.hrPer9,
    avgEvAllowed: row.avgEvAllowed ?? 0,
    maxDistance: row.maxDistance ?? 0,
  }));

  const upcomingGames: UpcomingGame[] = (data.upcomingGames ?? []).map((game) => {
    const projectedMean = game.predictedHrMean ?? 0;
    const std = game.predictedHrStd ?? 0;
    const projectedHrMin = Math.max(0, projectedMean - std);
    const projectedHrMax = Math.max(projectedHrMin, projectedMean + std);
    const opponentLogo =
      game.opponentAbbrev && game.opponentAbbrev.length > 0
        ? `/team-logos/${game.opponentAbbrev.toLowerCase()}.svg`
        : "/team-logos/default.svg";
    return {
      date: game.date ? game.date.slice(0, 10) : "",
      opponentName: game.opponentName,
      opponentLogoUrl: opponentLogo,
      parkName: game.parkName,
      parkHrFactor: game.parkHrFactor ?? 1,
      projectedHrMin,
      projectedHrMax,
    };
  });

  const mapSplits = (rows: TeamDashboardResponse["splits"]["overview"]): TeamSplitRow[] =>
    rows?.map((row) => ({
      label: row.label,
      hrPerGame: row.hrPerGame,
      leagueAvgHrPerGame: row.leagueAvgHrPerGame,
    })) ?? [];

  const splits = {
    overview: mapSplits(data.splits?.overview ?? []),
    homeAway: mapSplits(data.splits?.homeAway ?? []),
    lhpRhp: mapSplits(data.splits?.lhpRhp ?? []),
    monthly: mapSplits(data.splits?.monthly ?? []),
  };

  const gameRows: GameRow[] = (data.games ?? []).map((game) => ({
    id: String(game.id),
    date: game.date ? game.date.slice(0, 10) : "",
    opponent: game.opponent,
    park: game.park,
    result: game.result ?? "-",
    hr: game.hr,
    xHr: game.xHr ?? 0,
    hrDiff: game.hrDiff ?? 0,
    opposingSp: game.opposingSp ?? "—",
    opposingSpHr9: game.opposingSpHr9 ?? 0,
  }));

  return {
    teamInfo,
    teamKeyMetrics,
    teamHrTimeSeries,
    pitcherRows,
    upcomingGames,
    splits,
    gameRows,
    filters: {
      defaultSeason: String(season ?? "2024"),
      defaultSplit: "Full Season",
      defaultPark: "All Parks",
      defaultHomeAway: "All Games",
      defaultDateRange: "Last 30 days",
      defaultPitcherHand: "All",
      defaultMinPa: 0,
    },
  };
}
