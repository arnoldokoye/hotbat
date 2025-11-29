import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type KeyMetric = {
  id: string;
  label: string;
  value: string;
  comparisonText?: string;
  trendDirection?: "up" | "down" | "flat";
};

type TeamSplitRow = {
  label: string;
  hrPerGame: number;
  leagueAvgHrPerGame?: number;
};

type GameRow = {
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
};

type TeamDashboardResponse = {
  teamInfo: {
    id: number;
    name: string;
    abbrev: string;
    league: string;
    division: string;
    logoUrl?: string;
  };
  keyMetrics: KeyMetric[];
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
    overview: TeamSplitRow[];
    homeAway: TeamSplitRow[];
    lhpRhp: TeamSplitRow[];
    monthly: TeamSplitRow[];
  };
  games: GameRow[];
};

const parseDateParam = (value: string | null) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toSplitRow = (summary: { hrPerGame: number }): TeamSplitRow => ({
  label: "HR/G",
  hrPerGame: summary.hrPerGame,
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const teamIdParam = searchParams.get("teamId");
  const seasonParam = searchParams.get("season");
  const splitParam = searchParams.get("split") ?? "overall";
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const teamId = teamIdParam ? Number(teamIdParam) : Number.NaN;
  if (!teamIdParam || Number.isNaN(teamId)) {
    return NextResponse.json(
      { error: "teamId query param is required and must be a number" },
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

  const fromDate = parseDateParam(fromParam);
  const toDate = parseDateParam(toParam);

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

  const gameStats = await prisma.teamGameHrStats.findMany({
    where: {
      teamId,
      ...(season ? { season } : {}),
      ...dateFilter,
    },
    orderBy: { date: "asc" },
    include: {
      opponentTeam: true,
      game: {
        include: {
          park: true,
        },
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

  const summaryForSplit =
    summaries.find((entry) => entry.splitKey === splitParam) ??
    summaries.find((entry) => entry.splitKey === "overall");

  const keyMetrics: KeyMetric[] = summaryForSplit
    ? [
        {
          id: "hr_per_game",
          label: "HR/Game",
          value: summaryForSplit.hrPerGame.toFixed(2),
        },
        {
          id: "games_played",
          label: "Games",
          value: summaryForSplit.gamesPlayed.toString(),
        },
        {
          id: "total_hr",
          label: "Total HR",
          value: summaryForSplit.hr.toString(),
        },
        summaryForSplit.hrVsLeaguePct !== null
          ? {
              id: "hr_vs_league_pct",
              label: "HR vs League %",
              value: `${summaryForSplit.hrVsLeaguePct.toFixed(1)}%`,
            }
          : undefined,
        summaryForSplit.avgEv !== null
          ? {
              id: "avg_ev",
              label: "Avg EV",
              value: summaryForSplit.avgEv.toFixed(1),
            }
          : undefined,
      ].filter(Boolean) as KeyMetric[]
    : [];

  const hrTimeSeries = gameStats.map((stat) => ({
    date: stat.date.toISOString(),
    hr: stat.hr,
    xHr: stat.xHr ?? undefined,
    avgEv: stat.avgEv ?? undefined,
    barrels: stat.barrels ?? undefined,
  }));

  const games: GameRow[] = gameStats.map((stat) => {
    const game = stat.game;
    const teamScore =
      game.homeTeamId === stat.teamId ? game.homeScore : game.awayScore;
    const opponentScore =
      game.homeTeamId === stat.teamId ? game.awayScore : game.homeScore;
    const result =
      teamScore !== null &&
      teamScore !== undefined &&
      opponentScore !== null &&
      opponentScore !== undefined
        ? `${teamScore > opponentScore ? "W" : "L"} ${teamScore}-${opponentScore}`
        : undefined;

    return {
      id: game.id,
      date: game.date.toISOString(),
      opponent: stat.opponentTeam?.name ?? "Unknown",
      park: game.park.name,
      result,
      hr: stat.hr,
      xHr: stat.xHr ?? undefined,
      hrDiff:
        stat.xHr !== null && stat.xHr !== undefined
          ? Number((stat.hr - stat.xHr).toFixed(2))
          : undefined,
      opposingSp: undefined,
      opposingSpHr9: undefined,
    };
  });

  const splits = {
    overview: summaries
      .filter((s) => s.splitKey === "overall")
      .map((s) => ({ ...toSplitRow(s), label: "Overall HR/G" })),
    homeAway: summaries
      .filter((s) => s.splitKey === "home" || s.splitKey === "away")
      .map((s) => ({
        ...toSplitRow(s),
        label: s.splitKey === "home" ? "Home HR/G" : "Away HR/G",
      })),
    lhpRhp: summaries
      .filter((s) => s.splitKey === "vs_lhp" || s.splitKey === "vs_rhp")
      .map((s) => ({
        ...toSplitRow(s),
        label: s.splitKey === "vs_lhp" ? "vs LHP HR/G" : "vs RHP HR/G",
      })),
    monthly: summaries
      .filter((s) => s.splitKey.startsWith("month:"))
      .map((s) => ({
        ...toSplitRow(s),
        label: `Month ${s.splitKey.replace("month:", "")} HR/G`,
      })),
  };

  const upcomingGamesRaw = await prisma.game.findMany({
    where: {
      OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
      date: { gte: new Date() },
      ...(season ? { season } : {}),
    },
    orderBy: { date: "asc" },
    take: 10,
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

  const upcomingGames: TeamDashboardResponse["upcomingGames"] =
    upcomingGamesRaw.map((game) => {
      const isHome = game.homeTeamId === teamId;
      const opponent = isHome ? game.awayTeam : game.homeTeam;
      const parkFactor =
        game.park.parkHrFactors[0]?.hrFactor ??
        game.park.defaultHrFactor ??
        undefined;
      const prediction = game.gamePredictions[0];

      return {
        gameId: game.id,
        date: game.date.toISOString(),
        opponentName: opponent.name,
        opponentAbbrev: opponent.abbrev,
        parkName: game.park.name,
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
