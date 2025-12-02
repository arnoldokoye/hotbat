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
      xHr: number | null;
      hrPerPa: number | null;
      barrelRate: number | null;
      avgEv: number | null;
      iso: number | null;
      hardHitRate: number | null;
    }
  >;
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
};

export type PlayerDashboardData = {
  playerInfo: PlayerInfo;
  playerKeyMetrics: PlayerKeyMetric[];
  playerHrTimeSeries: PlayerHrTimePoint[];
  pitchDamageRows: PitchDamageRow[];
  parkProfileRows: ParkProfileRow[];
  splits: {
    overview: PlayerSplitRow[];
    homeAway: PlayerSplitRow[];
    lhpRhp: PlayerSplitRow[];
    monthly: PlayerSplitRow[];
  };
  gameLog: PlayerGameLogRow[];
  hrEvents: PlayerHrEventRow[];
  filters: {
    defaultSeason: string;
    defaultSplit: string;
    defaultDateRange: string;
    defaultPitchType: string;
  };
};

export type PlayerDashboardParams = {
  playerId: number;
  season?: number;
  split?: string;
};

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

  const { playerId, season = 2024, split = "overall" } = params;
  const search = new URLSearchParams();
  search.set("playerId", String(playerId));
  search.set("season", String(season));
  if (split) search.set("split", split);

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

  const playerInfo: PlayerInfo = {
    playerId: String(apiData.playerInfo.id),
    name: `${apiData.playerInfo.firstName} ${apiData.playerInfo.lastName}`,
    teamName: apiData.playerInfo.team.name,
    teamLogoUrl: apiData.playerInfo.team.logoUrl,
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
    xHr: p.xHr ?? 0,
    avgEv: p.avgEv ?? 0,
    barrels: 0,
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

  const splitsOverview: PlayerSplitRow[] = Object.entries(apiData.splits).map(
    ([key, s]) => ({
      label: key,
      hr: s.hr,
      pa: s.hrPerPa && s.hrPerPa > 0 ? Math.round(s.hr / s.hrPerPa) : 0,
      hrPerPa: s.hrPerPa ?? 0,
    }),
  );

  return {
    playerInfo,
    playerKeyMetrics,
    playerHrTimeSeries,
    pitchDamageRows: [],
    parkProfileRows: [],
    splits: {
      overview: splitsOverview,
      homeAway: [],
      lhpRhp: [],
      monthly: [],
    },
    gameLog,
    hrEvents: [],
    filters: {
      defaultSeason: String(season),
      defaultSplit: split,
      defaultDateRange: "",
      defaultPitchType: "All",
    },
  };
}
