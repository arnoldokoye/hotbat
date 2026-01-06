import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { loadBallparks } from "@/lib/csv/ballparks";
import { loadDailyTeamStats } from "@/lib/csv/dailyTeamStats";
import { loadDailyPitchingStartersByGame } from "@/lib/csv/dailyPitching";
import { loadDailyPlays } from "@/lib/csv/dailyPlays";
import { buildParkFactorMap } from "@/lib/csv/parkFactors";
import { loadPlayerRegistry } from "@/lib/csv/playerRegistry";
import { loadTeams } from "@/lib/csv/teams";

type TeamDashboardResponse = {
  teamInfo: {
    id: number;
    name: string;
    abbrev: string;
    league: string;
    division: string;
    logoUrl?: string;
    parkFactor?: number;
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
    opponent?: string;
    opposingSp?: string;
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
    vsLHP?: { hr: number; pa: number; rate: number | null } | null;
    vsRHP?: { hr: number; pa: number; rate: number | null } | null;
  };
  recentForm?: {
    last10PA: { hr: number; pa: number; rate: number | null } | null;
    last25PA: { hr: number; pa: number; rate: number | null } | null;
    last50PA: { hr: number; pa: number; rate: number | null } | null;
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

const parseDate = (value: string | null) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const logoPath = (abbrev?: string | null) => {
  return abbrev
    ? `/team-logos/${abbrev.toLowerCase()}.svg`
    : "/team-logos/default.svg";
};

const logoFromRetrosheetTeam = (teamId: string) => {
  const id = teamId.trim().toUpperCase();
  if (id === "NYA") return logoPath("nyy");
  if (id === "BOS") return logoPath("bos");
  return logoPath(null);
};

function yyyymmddToIsoDate(value: string): string | null {
  const v = value.trim();
  if (!/^\d{8}$/.test(v)) return null;
  return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
}

function isoDateToTimestamp(value: string): string {
  return `${value}T00:00:00.000Z`;
}

function hash32FNV1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function safeDiv(numer: number, denom: number): number | null {
  if (!Number.isFinite(numer) || !Number.isFinite(denom) || denom <= 0) return null;
  return numer / denom;
}

type RecentFormWindow = { hr: number; pa: number; rate: number | null };
type RecentForm = {
  last10PA: RecentFormWindow | null;
  last25PA: RecentFormWindow | null;
  last50PA: RecentFormWindow | null;
};

function buildRecentForm(events: { hr: number }[]): RecentForm {
  const windowStats = (window: number): RecentFormWindow | null => {
    if (events.length < window) return null;
    const slice = events.slice(events.length - window);
    const hr = slice.reduce((sum, e) => sum + e.hr, 0);
    const pa = slice.length;
    const rate = safeDiv(hr, pa);
    return { hr, pa, rate };
  };

  return {
    last10PA: windowStats(10),
    last25PA: windowStats(25),
    last50PA: windowStats(50),
  };
}

async function loadTeamDashboardFromCsv(args: {
  teamId: string;
  season: number;
  from: Date | undefined;
  to: Date | undefined;
  splitKey: string;
}): Promise<TeamDashboardResponse | null> {
  const { teamId, season, from, to, splitKey: _splitKey } = args;
  void _splitKey;

  const [rows, teams, parks, startersByGame, players, paEvents] = await Promise.all([
    loadDailyTeamStats(season),
    loadTeams().catch(() => []),
    loadBallparks().catch(() => new Map<string, string>()),
    loadDailyPitchingStartersByGame(season).catch(() => new Map()),
    loadPlayerRegistry().catch(() => []),
    loadDailyPlays(season).catch(() => []),
  ]);

  const teamNameById = new Map(teams.map((t) => [t.team_id, t.team_name] as const));
  const teamLeagueById = new Map(teams.map((t) => [t.team_id, t.league] as const));
  const playerNameById = new Map(players.map((p) => [p.player_id, p.player_name] as const));
  const playerThrowsById = new Map(
    players.map((p) => [p.player_id, p.throws] as const),
  );

  const fromIso = from ? from.toISOString().slice(0, 10) : null;
  const toIso = to ? to.toISOString().slice(0, 10) : null;

  type TeamGame = {
    gid: string;
    date: string; // ISO YYYY-MM-DD
    opp: string;
    opponentName: string;
    vishome: "h" | "v" | "";
    site: string;
    hr: number;
    pa: number;
    win: number;
    loss: number;
    tie: number;
    opposingStarterName: string | null;
    opposingStarterThrows: "L" | "R" | null;
  };

  const byGid = new Map<string, TeamGame>();

  for (const row of rows) {
    if (row.team_id !== teamId) continue;
    const dateIso = yyyymmddToIsoDate(row.date);
    if (!dateIso) continue;
    if (fromIso && dateIso < fromIso) continue;
    if (toIso && dateIso > toIso) continue;

    const existing = byGid.get(row.gid);
    if (existing) {
      existing.hr += row.b_hr;
      existing.pa += row.b_pa;
      existing.win = existing.win || row.win;
      existing.loss = existing.loss || row.loss;
      existing.tie = existing.tie || row.tie;
      continue;
    }

    const starters = startersByGame.get(row.gid);
    const opposingStarterId =
      row.vishome === "h"
        ? starters?.away ?? null
        : row.vishome === "v"
        ? starters?.home ?? null
        : null;
    const opposingStarterName = opposingStarterId
      ? playerNameById.get(opposingStarterId) ?? opposingStarterId
      : null;
    const opposingStarterThrows =
      opposingStarterId && (playerThrowsById.get(opposingStarterId) === "L" ||
        playerThrowsById.get(opposingStarterId) === "R")
        ? (playerThrowsById.get(opposingStarterId) as "L" | "R")
        : null;

    const opponentName = teamNameById.get(row.opp) ?? row.opp ?? "Opponent";

    byGid.set(row.gid, {
      gid: row.gid,
      date: dateIso,
      opp: row.opp,
      opponentName,
      vishome: row.vishome,
      site: row.site,
      hr: row.b_hr,
      pa: row.b_pa,
      win: row.win,
      loss: row.loss,
      tie: row.tie,
      opposingStarterName,
      opposingStarterThrows,
    });
  }

  const games = Array.from(byGid.values());
  games.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.gid.localeCompare(b.gid);
  });

  if (!games.length) return null;

  const effectiveDate = games[games.length - 1]?.date ?? null;

  const gamesPlayed = games.length;
  const totalHr = games.reduce((sum, g) => sum + g.hr, 0);
  const hrPerGame = safeDiv(totalHr, gamesPlayed) ?? 0;

  const homeGames = games.filter((g) => g.vishome === "h");
  const awayGames = games.filter((g) => g.vishome === "v");
  const homeHrPerGame = safeDiv(homeGames.reduce((sum, g) => sum + g.hr, 0), homeGames.length) ?? 0;
  const awayHrPerGame = safeDiv(awayGames.reduce((sum, g) => sum + g.hr, 0), awayGames.length) ?? 0;

  const monthlyAgg = games.reduce<Record<string, { hr: number; games: number }>>((acc, g) => {
    const key = g.date.slice(0, 7);
    acc[key] ??= { hr: 0, games: 0 };
    acc[key].hr += g.hr;
    acc[key].games += 1;
    return acc;
  }, {});

  const monthly = Object.entries(monthlyAgg)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, agg]) => ({ label: month, hrPerGame: safeDiv(agg.hr, agg.games) ?? 0 }));

  const handAgg = games.reduce<Record<"L" | "R", { hr: number; pa: number; games: number }>>(
    (acc, g) => {
      if (g.opposingStarterThrows === "L" || g.opposingStarterThrows === "R") {
        const key = g.opposingStarterThrows;
        acc[key].hr += g.hr;
        acc[key].pa += g.pa;
        acc[key].games += 1;
      }
      return acc;
    },
    { L: { hr: 0, pa: 0, games: 0 }, R: { hr: 0, pa: 0, games: 0 } },
  );

  const lhpRate = handAgg.L.pa >= 30 ? safeDiv(handAgg.L.hr, handAgg.L.pa) : null;
  const rhpRate = handAgg.R.pa >= 30 ? safeDiv(handAgg.R.hr, handAgg.R.pa) : null;

  const lhpRhpSplits = [
    { label: "vs LHP HR/G", hrPerGame: safeDiv(handAgg.L.hr, handAgg.L.games) ?? 0 },
    { label: "vs RHP HR/G", hrPerGame: safeDiv(handAgg.R.hr, handAgg.R.games) ?? 0 },
  ];

  const parkFactors = buildParkFactorMap(rows);
  const homeParkCounts = homeGames.reduce<Record<string, number>>((acc, g) => {
    const key = g.site || "Unknown";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const homeParkId = Object.entries(homeParkCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const homeParkFactor = homeParkId ? parkFactors.get(homeParkId) ?? 1 : 1;

  const teamName = teamNameById.get(teamId) ?? teamId;
  const league = teamLeagueById.get(teamId) ?? "";

  const keyMetrics: TeamDashboardResponse["keyMetrics"] = [
    { id: "hr_per_game", label: "HR/Game", value: hrPerGame.toFixed(2) },
    { id: "games_played", label: "Games", value: gamesPlayed.toString() },
    { id: "total_hr", label: "Total HR", value: totalHr.toString() },
  ];

  const hrTimeSeries: TeamDashboardResponse["hrTimeSeries"] = games
    .slice()
    .sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return b.gid.localeCompare(a.gid);
    })
    .map((g) => ({
      date: isoDateToTimestamp(g.date),
      hr: g.hr,
      opponent: g.opponentName,
      opposingSp: g.opposingStarterName ?? undefined,
    }));

  const gamesTable: TeamDashboardResponse["games"] = games
    .slice()
    .sort((a, b) => {
      if (a.date !== b.date) return b.date.localeCompare(a.date);
      return b.gid.localeCompare(a.gid);
    })
    .map((g) => {
      const result = g.win ? "W" : g.loss ? "L" : g.tie ? "T" : undefined;
      return {
        id: hash32FNV1a(g.gid),
        date: isoDateToTimestamp(g.date),
        opponent: g.opponentName,
        park: parks.get(g.site) ?? g.site ?? "Park",
        result,
        hr: g.hr,
        opposingSp: g.opposingStarterName ?? undefined,
      };
    });

  const response: TeamDashboardResponse = {
    teamInfo: {
      id: 0,
      name: teamName,
      abbrev: teamId,
      league: league ?? "",
      division: "—",
      logoUrl: logoFromRetrosheetTeam(teamId),
      parkFactor: homeParkFactor,
    },
    keyMetrics,
    hrTimeSeries,
    pitcherVulnerability: [],
    upcomingGames: [],
    splits: {
      overview: [
        { label: "Overall HR/G", hrPerGame },
        { label: "Home HR/G", hrPerGame: homeHrPerGame },
        { label: "Away HR/G", hrPerGame: awayHrPerGame },
      ],
      homeAway: [
        { label: "Home HR/G", hrPerGame: homeHrPerGame },
        { label: "Away HR/G", hrPerGame: awayHrPerGame },
      ],
      lhpRhp: lhpRhpSplits,
      monthly,
      vsLHP:
        handAgg.L.pa >= 30 ? { hr: handAgg.L.hr, pa: handAgg.L.pa, rate: lhpRate } : null,
      vsRHP:
        handAgg.R.pa >= 30 ? { hr: handAgg.R.hr, pa: handAgg.R.pa, rate: rhpRate } : null,
    },
    recentForm: buildRecentForm(
      paEvents.filter(
        (e) => e.bat_team_id === teamId && (!effectiveDate || e.date <= effectiveDate),
      ),
    ),
    games: gamesTable,
  };

  return response;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const teamIdParam = searchParams.get("teamId");
  const teamIdAlt = searchParams.get("team_id");
  const seasonParam = searchParams.get("season");
  const splitParam = searchParams.get("split") ?? "overall";
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const seasonParsed = seasonParam ? Number(seasonParam) : undefined;
  if (seasonParam && Number.isNaN(seasonParsed)) {
    return NextResponse.json(
      { error: "season must be a number when provided" },
      { status: 400 },
    );
  }
  const seasonValue = typeof seasonParsed === "number" ? seasonParsed : 2024;
  const season = seasonParam ? seasonValue : undefined;

  const fromDate = parseDate(fromParam);
  const toDate = parseDate(toParam);
  if (fromParam && fromDate === null) {
    return NextResponse.json(
      { error: "from must be a valid date (YYYY-MM-DD)" },
      { status: 400 },
    );
  }
  if (toParam && toDate === null) {
    return NextResponse.json(
      { error: "to must be a valid date (YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  const mode = (process.env.HOTBAT_BACKEND ?? "auto").toLowerCase();
  const rawTeamId = (teamIdAlt ?? teamIdParam ?? "").trim();
  if (!rawTeamId) {
    return NextResponse.json({ error: "teamId query param is required" }, { status: 400 });
  }

  const tryCsv = async () =>
    loadTeamDashboardFromCsv({
      teamId: rawTeamId,
      season: seasonValue,
      from: fromDate === null ? undefined : fromDate,
      to: toDate === null ? undefined : toDate,
      splitKey: splitParam,
    });

  if (mode !== "db") {
    try {
      const csv = await tryCsv();
      if (csv) {
        console.info("team-dashboard backend=csv");
        return NextResponse.json(csv, { status: 200, headers: { "x-hotbat-source": "csv" } });
      }
    } catch (error) {
      console.warn("team-dashboard csv fallback", error);
    }
    if (mode === "csv") {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }
  }

  const teamId = Number(rawTeamId);
  if (Number.isNaN(teamId)) {
    return NextResponse.json(
      { error: "teamId must be a valid integer when HOTBAT_BACKEND=db" },
      { status: 400 },
    );
  }

  const team = await prisma.team.findUnique({
    where: { id: teamId },
    select: {
      id: true,
      name: true,
      abbrev: true,
      league: true,
      division: true,
      logoUrl: true,
    },
  });
  if (!team) {
    return NextResponse.json({ error: "Team not found" }, { status: 404 });
  }

  const dateFilter =
    fromDate || toDate
      ? {
          date: {
            ...(fromDate ? { gte: fromDate } : {}),
            ...(toDate ? { lte: toDate } : {}),
          },
        }
      : {};

  const stats = await prisma.teamGameHrStats.findMany({
    where: {
      teamId,
      ...(season ? { season } : {}),
      ...dateFilter,
    },
    orderBy: { date: "asc" },
    include: {
      opponentTeam: true,
      game: {
        include: { park: true },
      },
    },
  });

  const summaries = await prisma.teamHrSummary.findMany({
    where: {
      teamId,
      ...(season ? { season } : {}),
    },
    orderBy: [{ season: "desc" }, { updatedAt: "desc" }],
  });

  const summary =
    summaries.find((s) => s.splitKey === splitParam) ??
    summaries.find((s) => s.splitKey === "overall");

  const keyMetrics = summary
    ? ([
        {
          id: "hr_per_game",
          label: "HR/Game",
          value: summary.hrPerGame.toFixed(2),
        },
        {
          id: "games_played",
          label: "Games",
          value: summary.gamesPlayed.toString(),
        },
        {
          id: "total_hr",
          label: "Total HR",
          value: summary.hr.toString(),
        },
        summary.hrVsLeaguePct !== null && summary.hrVsLeaguePct !== undefined
          ? {
              id: "hr_vs_league_pct",
              label: "HR vs League %",
              value: `${summary.hrVsLeaguePct.toFixed(1)}%`,
            }
          : undefined,
        summary.avgEv !== null && summary.avgEv !== undefined
          ? {
              id: "avg_ev",
              label: "Avg EV",
              value: summary.avgEv.toFixed(1),
            }
          : undefined,
      ] as const).filter(Boolean)
    : [];

  const hrTimeSeries = stats.map((s) => ({
    date: s.date.toISOString(),
    hr: s.hr,
    xHr: s.xHr ?? undefined,
    avgEv: s.avgEv ?? undefined,
    barrels: s.barrels ?? undefined,
  }));

  const games = stats.map((s) => {
    const game = s.game;
    const teamScore =
      game.homeTeamId === s.teamId ? game.homeScore : game.awayScore;
    const opponentScore =
      game.homeTeamId === s.teamId ? game.awayScore : game.homeScore;
    const result =
      teamScore !== null &&
      opponentScore !== null &&
      teamScore !== undefined &&
      opponentScore !== undefined
        ? `${teamScore > opponentScore ? "W" : "L"} ${teamScore}-${opponentScore}`
        : undefined;
    return {
      id: game.id,
      date: game.date.toISOString(),
      opponent: s.opponentTeam?.name ?? "Unknown",
      park: game.park.name,
      result,
      hr: s.hr,
      xHr: s.xHr ?? undefined,
      hrDiff:
        s.xHr !== null && s.xHr !== undefined
          ? Number((s.hr - s.xHr).toFixed(2))
          : undefined,
      opposingSp: undefined,
      opposingSpHr9: undefined,
    };
  });

  const splits = {
    overview:
      summaries
        .filter((s) => s.splitKey === "overall")
        .map((s) => ({
          label: "Overall HR/G",
          hrPerGame: s.hrPerGame,
        })) ?? [],
    homeAway: [],
    lhpRhp: [],
    monthly: [],
  };

  const upcoming = await prisma.game.findMany({
    where: {
      OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      status: "scheduled",
      ...(season ? { season } : {}),
    },
    orderBy: { date: "asc" },
    include: {
      homeTeam: true,
      awayTeam: true,
      park: {
        include: {
          parkHrFactors: {
            where: season ? { season } : {},
            orderBy: { updatedAt: "desc" },
            take: 1,
          },
        },
      },
      gamePredictions: {
        where: { teamId },
        orderBy: { predictionTimestamp: "desc" },
        take: 1,
      },
    },
  });

  const upcomingGames = upcoming.map((g) => {
    const isHome = g.homeTeamId === teamId;
    const opponent = isHome ? g.awayTeam : g.homeTeam;
    const prediction = g.gamePredictions[0];
    const parkFactor =
      g.park.parkHrFactors[0]?.hrFactor ?? g.park.defaultHrFactor ?? undefined;
    return {
      gameId: g.id,
      date: g.date.toISOString(),
      opponentName: opponent.name,
      opponentAbbrev: opponent.abbrev,
      parkName: g.park.name,
      parkHrFactor: parkFactor,
      predictedHrMean: prediction?.predictedHrMean ?? undefined,
      predictedHrStd: prediction?.predictedHrStd ?? undefined,
      hotbatScore: prediction?.hotbatScore ?? undefined,
    };
  });

  const response: TeamDashboardResponse = {
    teamInfo: {
      id: team.id,
      name: team.name,
      abbrev: team.abbrev,
      league: team.league,
      division: team.division,
      logoUrl: logoPath(team.abbrev),
    },
    keyMetrics,
    hrTimeSeries,
    pitcherVulnerability: [],
    upcomingGames,
    splits,
    games,
  };

  return NextResponse.json(response);
}
