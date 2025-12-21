import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type PlayerDashboardResponse = {
  parkProfile?: {
    parkName: string;
    hrAtPark: number;
    hrPerPaAtPark: number;
    parkHrFactor?: number | null;
  }[];
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

const logoPath = (abbrev?: string | null) => {
  return abbrev
    ? `/team-logos/${abbrev.toLowerCase()}.svg`
    : "/team-logos/default.svg";
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const playerIdParam = searchParams.get("playerId");
    const seasonParam = searchParams.get("season");
    const splitParam = searchParams.get("split") ?? "overall";

    const playerId = playerIdParam ? Number(playerIdParam) : Number.NaN;
    if (!playerIdParam || Number.isNaN(playerId)) {
      return NextResponse.json(
        { error: "playerId query param is required and must be a valid integer" },
        { status: 400 },
      );
    }

    const season = seasonParam ? Number(seasonParam) : 2024;
    const seasonValue = Number.isNaN(season) ? 2024 : season;

    const player = await prisma.player.findUnique({
      where: { id: playerId },
      include: { team: true },
    });
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const summary = await prisma.playerHrSummary.findFirst({
      where: { playerId, season: seasonValue, splitKey: splitParam },
      orderBy: { updatedAt: "desc" },
    });

    const summaries = await prisma.playerHrSummary.findMany({
      where: { playerId, season: seasonValue },
    });

    const stats = await prisma.playerGameStats.findMany({
      where: { playerId, season: seasonValue },
      orderBy: { date: "desc" },
      include: {
        game: { include: { homeTeam: true, awayTeam: true, park: true } },
      },
      take: 10,
    });

    const hrTimeSeries = [...stats]
      .reverse()
      .map((s) => ({
        date: s.date.toISOString(),
        gameId: s.gameId,
        hr: s.hr,
        xHr: s.xHr ?? null,
        avgEv: s.avgEv ?? null,
        opponent:
          s.game.homeTeamId === s.teamId
            ? s.game.awayTeam?.name ?? "Opponent"
            : s.game.homeTeam?.name ?? "Opponent",
        park: s.game.park.name,
      }));

    const recentGames = stats.slice(0, 5).map((s) => ({
      gameId: s.gameId,
      date: s.date.toISOString(),
      opponent:
        s.game.homeTeamId === s.teamId
          ? s.game.awayTeam?.name ?? "Opponent"
          : s.game.homeTeam?.name ?? "Opponent",
      park: s.game.park.name,
      hr: s.hr,
      xHr: s.xHr ?? null,
      avgEv: s.avgEv ?? null,
    }));

    const keyMetrics = [
      { label: "HR", value: summary?.hr ?? 0 },
      { label: "xHR", value: summary?.xHr ?? null },
      { label: "HR/PA", value: summary?.hrPerPa ?? null },
      { label: "Barrel%", value: summary?.barrelRate ?? null },
      { label: "Avg EV", value: summary?.avgEv ?? null },
      { label: "ISO", value: summary?.iso ?? null },
      { label: "HardHit%", value: summary?.hardHitRate ?? null },
    ];

    const splits: PlayerDashboardResponse["splits"] = {};
    const targetSummaries = summaries.length > 0 ? summaries : summary ? [summary] : [];
    for (const s of targetSummaries) {
      splits[s.splitKey] = {
        season: s.season,
        gamesPlayed: s.gamesPlayed,
        hr: s.hr,
        xHr: s.xHr ?? null,
        hrPerPa: s.hrPerPa ?? null,
        barrelRate: s.barrelRate ?? null,
        avgEv: s.avgEv ?? null,
        iso: s.iso ?? null,
        hardHitRate: s.hardHitRate ?? null,
      };
    }
    if (Object.keys(splits).length === 0) {
      splits[splitParam] = {
        season: seasonValue,
        gamesPlayed: 0,
        hr: 0,
        xHr: null,
        hrPerPa: null,
        barrelRate: null,
        avgEv: null,
        iso: null,
        hardHitRate: null,
      };
    }

    const parkAgg = stats.reduce<Record<string, { hr: number; pa: number; factor?: number | null }>>(
      (acc, stat) => {
        const parkName = stat.game.park.name ?? "Unknown Park";
        const hr = stat.hr ?? 0;
        const pa = stat.pa ?? 0;
        const factor = stat.game.park.defaultHrFactor ?? null;
        const current = acc[parkName] ?? { hr: 0, pa: 0, factor };
        acc[parkName] = {
          hr: current.hr + hr,
          pa: current.pa + pa,
          factor: current.factor ?? factor,
        };
        return acc;
      },
      {},
    );

    const parkProfile = Object.entries(parkAgg).map(([parkName, agg]) => ({
      parkName,
      hrAtPark: agg.hr,
      hrPerPaAtPark: agg.pa > 0 ? agg.hr / agg.pa : 0,
      parkHrFactor: agg.factor,
    }));

    const response: PlayerDashboardResponse = {
      playerInfo: {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        bats: player.bats,
        position: player.position,
        team: {
          id: player.team.id,
          name: player.team.name,
          abbrev: player.team.abbrev,
          league: player.team.league,
          division: player.team.division,
          logoUrl: logoPath(player.team.abbrev),
        },
      },
      keyMetrics,
      splits,
      hrTimeSeries,
      recentGames,
      parkProfile,
      upcomingGames: [],
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in /api/player-dashboard", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
