import { simulateNetworkLatency } from "./utils";
import type {
  ParkProfileRow,
  PitchDamageRow,
  PlayerGameLogRow,
  PlayerHrEventRow,
  PlayerHrTimePoint,
  PlayerInfo,
  PlayerKeyMetric,
  PlayerSplitRow,
} from "@/features/player-dashboard/mock/playerDashboardData";

export type PlayerDashboardResponse = {
  availableDates?: string[];
  availableMonths?: string[];
  effectiveDate?: string;
  playerInfo: {
    id: number;
    firstName: string;
    lastName: string;
    bats: string;
    position: string;
    team: {
      id: number;
      name: string;
      abbrev: string;
      league?: string;
      division?: string;
      logoUrl?: string;
    };
  };
  baseline?: {
    hrProb?: number | null;
    expectedHr?: number | null;
    seasonHr?: number | null;
    seasonPa?: number | null;
    notes?: string;
  };
  keyMetrics: {
    label: string;
    value: number | null;
  }[];
  splits: Record<
    string,
    {
      season: number;
      gamesPlayed: number;
      hr: number;
      pa?: number;
      xHr: number | null;
      hrPerPa: number | null;
      barrelRate: number | null;
      avgEv: number | null;
      iso: number | null;
      hardHitRate: number | null;
    }
  >;
  handednessSplits?: {
    vsLHP: { hr: number; pa: number; rate: number | null } | null;
    vsRHP: { hr: number; pa: number; rate: number | null } | null;
  };
  recentForm?: {
    last10PA: { hr: number; pa: number; rate: number | null } | null;
    last25PA: { hr: number; pa: number; rate: number | null } | null;
    last50PA: { hr: number; pa: number; rate: number | null } | null;
  };
  hrTimeSeries: {
    date: string;
    gameId: number;
    hr: number;
    xHr: number | null;
    avgEv: number | null;
    opponent: string;
    park: string;
  }[];
  recentGames: {
    gameId: number;
    date: string;
    opponent: string;
    park: string;
    hr: number;
    xHr: number | null;
    avgEv: number | null;
  }[];
  upcomingGames: unknown[];
  parkProfile?: {
    parkName: string;
    hrAtPark: number;
    hrPerPaAtPark: number;
    parkHrFactor?: number | null;
  }[];
};

export type PlayerDashboardData = {
  playerInfo: PlayerInfo;
  playerKeyMetrics: PlayerKeyMetric[];
  playerHrTimeSeries: PlayerHrTimePoint[];
  pitchDamageRows: PitchDamageRow[];
  parkProfileRows: ParkProfileRow[];
  baseline?: {
    hrProb?: number | null;
    expectedHr?: number | null;
    seasonHr?: number | null;
    seasonPa?: number | null;
    notes?: string;
  };
  splits: {
    overview: PlayerSplitRow[];
    homeAway: PlayerSplitRow[];
    lhpRhp: PlayerSplitRow[];
    monthly: PlayerSplitRow[];
  };
  gameLog: PlayerGameLogRow[];
  hrEvents: PlayerHrEventRow[];
  availableDates?: string[];
  availableMonths?: string[];
  effectiveDate?: string;
  recentForm?: PlayerDashboardResponse["recentForm"];
  handednessSplits?: PlayerDashboardResponse["handednessSplits"];
  filters: {
    defaultSeason: string;
    defaultSplit: string;
    defaultDateRange: string;
    defaultPitchType: string;
  };
};

export type PlayerDashboardParams = {
  season?: number;
  split?: string;
  date?: string;
} & ({ playerId: number } | { player_id: string });

function resolveBaseUrl(explicit?: string) {
  if (explicit) return explicit;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
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

export async function fetchPlayerDashboard(
  params: PlayerDashboardParams,
): Promise<PlayerDashboardData> {
  await simulateNetworkLatency();

  const { season = 2024, split = "overall" } = params;
  const search = new URLSearchParams();
  if ("player_id" in params) {
    search.set("player_id", params.player_id);
  } else {
    search.set("playerId", String(params.playerId));
  }
  search.set("season", String(season));
  if (split) search.set("split", split);
  if (params.date) search.set("date", params.date);

  const url = new URL("/api/player-dashboard", resolveBaseUrl());
  url.search = search.toString();

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message =
      body?.error ?? `Failed to fetch player dashboard: ${res.status}`;
    throw new Error(message);
  }
  const apiData = (await res.json()) as PlayerDashboardResponse;

  const stablePlayerId =
    res.headers.get("x-hotbat-source") === "csv" && "player_id" in params
      ? params.player_id
      : String(apiData.playerInfo.id);

  const playerInfo: PlayerInfo = {
    playerId: stablePlayerId,
    name: `${apiData.playerInfo.firstName} ${apiData.playerInfo.lastName}`,
    teamName: apiData.playerInfo.team.name,
    teamLogoUrl:
      apiData.playerInfo.team.logoUrl ??
      (apiData.playerInfo.team.abbrev
        ? `/team-logos/${apiData.playerInfo.team.abbrev.toLowerCase()}.svg`
        : "/team-logos/default.svg"),
    position: apiData.playerInfo.position,
    bats: (apiData.playerInfo.bats as PlayerInfo["bats"]) ?? "R",
    throws: "R",
  };

  const playerKeyMetrics: PlayerKeyMetric[] = apiData.keyMetrics.map((m, idx) => ({
    id: `metric-${idx}`,
    label: m.label,
    value: m.value !== null && m.value !== undefined ? String(m.value) : "—",
    comparisonText: undefined,
    trendDirection: undefined,
  }));

  const playerHrTimeSeries: PlayerHrTimePoint[] = apiData.hrTimeSeries.map((p) => ({
    date: p.date,
    hr: p.hr,
    xHr: p.xHr,
    avgEv: p.avgEv ?? 0,
    barrels: 0,
    opponentTeamName: p.opponent,
    parkName: p.park,
  }));

  const gameLog: PlayerGameLogRow[] = apiData.recentGames.map((g) => ({
    id: `game-${g.gameId}`,
    date: g.date,
    opponent: g.opponent,
    park: g.park,
    result: "-",
    ab: 0,
    pa: 4,
    hr: g.hr,
    rbi: 0,
    bb: 0,
    k: 0,
  }));

  const splitRow = (label: string, s: PlayerDashboardResponse["splits"][string]): PlayerSplitRow => ({
    label,
    hr: s.hr,
    pa: s.pa ?? (s.hrPerPa && s.hrPerPa > 0 ? Math.round(s.hr / s.hrPerPa) : 0),
    hrPerPa: s.hrPerPa ?? null,
  });

  const splitsOverview: PlayerSplitRow[] = apiData.splits.overall
    ? [splitRow("Overall", apiData.splits.overall)]
    : [];
  const splitsHomeAway: PlayerSplitRow[] = [
    apiData.splits.home ? splitRow("Home", apiData.splits.home) : null,
    apiData.splits.away ? splitRow("Away", apiData.splits.away) : null,
  ].filter(Boolean) as PlayerSplitRow[];
  const splitsLhpRhp: PlayerSplitRow[] = [
    apiData.splits.lhp ? splitRow("vs LHP", apiData.splits.lhp) : null,
    apiData.splits.rhp ? splitRow("vs RHP", apiData.splits.rhp) : null,
  ].filter(Boolean) as PlayerSplitRow[];
  const splitsMonthly: PlayerSplitRow[] = Object.entries(apiData.splits)
    .filter(([key]) => key.startsWith("month:"))
    .map(([key, s]) => splitRow(key.replace("month:", ""), s));

  const parkProfileRows: ParkProfileRow[] =
    apiData.parkProfile?.map((p, idx) => ({
      parkName: p.parkName,
      hrAtPark: p.hrAtPark,
      hrPerPaAtPark: Number.isFinite(p.hrPerPaAtPark) ? p.hrPerPaAtPark : 0,
      parkHrFactor: p.parkHrFactor ?? 1,
      id: `park-${idx}`,
    })) ?? [];

  const asBaseline = apiData.baseline;
  const cleanNumber = (v: unknown, allowZero = true) => {
    const num = typeof v === "number" ? v : Number.NaN;
    if (!Number.isFinite(num)) return null;
    if (!allowZero && num === 0) return null;
    return num;
  };

  const baseline = asBaseline
    ? {
        hrProb: cleanNumber(asBaseline.hrProb),
        expectedHr: cleanNumber(asBaseline.expectedHr),
        seasonHr: cleanNumber(asBaseline.seasonHr, true),
        seasonPa: cleanNumber(asBaseline.seasonPa, true),
        notes: asBaseline.notes,
      }
    : undefined;

  return {
    playerInfo,
    playerKeyMetrics,
    playerHrTimeSeries,
    pitchDamageRows: [],
    parkProfileRows,
    baseline,
    splits: {
      overview: splitsOverview,
      homeAway: splitsHomeAway,
      lhpRhp: splitsLhpRhp,
      monthly: splitsMonthly,
    },
    gameLog,
    hrEvents: [],
    availableDates: apiData.availableDates,
    availableMonths: apiData.availableMonths,
    effectiveDate: apiData.effectiveDate,
    recentForm: apiData.recentForm,
    handednessSplits: apiData.handednessSplits,
    filters: {
      defaultSeason: String(season),
      defaultSplit: split,
      defaultDateRange: "",
      defaultPitchType: "All",
    },
  };
}
