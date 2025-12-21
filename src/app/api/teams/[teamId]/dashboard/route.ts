import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

const parseDate = (value: string | null) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export async function GET(
  req: NextRequest,
  { params }: { params: { teamId: string } },
) {
  const { searchParams } = req.nextUrl;
  const seasonParam = searchParams.get("season");
  const splitParam = searchParams.get("split") ?? "overall";
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const teamId = Number(params.teamId);
  if (!params.teamId || Number.isNaN(teamId)) {
    return NextResponse.json(
      { error: "teamId path param is required and must be a number" },
      { status: 400 },
    );
  }

  const season = seasonParam ? Number(seasonParam) : undefined;
  if (seasonParam && Number.isNaN(season)) {
    return NextResponse.json(
      { error: "season must be a number when provided" },
      { status: 400 },
    );
  }

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
      logoUrl: team.logoUrl ?? undefined,
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
