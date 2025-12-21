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

    const stats = await prisma.teamGameHrStats.findMany({
      where: { teamId, ...(season ? { season } : {}) },
      orderBy: { date: "desc" },
      include: {
        opponentTeam: true,
        game: { include: { park: true } },
      },
      take: 50,
    });

    const games = stats.map((s) => {
      const isHome = s.homeOrAway === "home";
      const game = s.game;
      const teamScore =
        game.homeTeamId === s.teamId ? game.homeScore : game.awayScore;
      const opponentScore =
        game.homeTeamId === s.teamId ? game.awayScore : game.homeScore;
      const result =
        teamScore !== null &&
        teamScore !== undefined &&
        opponentScore !== null &&
        opponentScore !== undefined
          ? `${teamScore > opponentScore ? "W" : "L"} ${teamScore}-${opponentScore}`
          : undefined;
      return {
        gameId: s.gameId,
        date: s.date.toISOString(),
        opponent: s.opponentTeam?.name ?? "Unknown",
        park: game.park.name,
        homeAway: isHome ? "home" : "away",
        hr: s.hr,
        xHr: s.xHr ?? null,
        avgEv: s.avgEv ?? null,
        barrels: s.barrels ?? null,
        pa: s.pa ?? null,
        result,
      };
    });

    return NextResponse.json({
      teamId,
      season: season ?? null,
      games,
    });
  } catch (error) {
    console.error("Error in /api/teams/[teamId]/game-log", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
