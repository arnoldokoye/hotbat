import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { teamId: string } },
) {
  try {
    const { searchParams } = req.nextUrl;
    const seasonParam = searchParams.get("season");
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

    const team = await prisma.team.findUnique({ where: { id: teamId } });
    if (!team) {
      return NextResponse.json({ error: "Team not found" }, { status: 404 });
    }

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

    const games = upcoming.map((g) => {
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

    return NextResponse.json({
      teamId,
      season: season ?? null,
      games,
    });
  } catch (error) {
    console.error("Error in /api/teams/[teamId]/upcoming-games", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
