import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { playerId: string } },
) {
  try {
    const { searchParams } = req.nextUrl;
    const seasonParam = searchParams.get("season");
    const playerId = Number(params.playerId);
    if (!params.playerId || Number.isNaN(playerId)) {
      return NextResponse.json(
        { error: "playerId path param is required and must be a valid integer" },
        { status: 400 },
      );
    }
    const season = seasonParam ? Number(seasonParam) : 2024;
    const seasonValue = Number.isNaN(season) ? 2024 : season;

    const player = await prisma.player.findUnique({ where: { id: playerId } });
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const stats = await prisma.playerGameStats.findMany({
      where: { playerId, season: seasonValue },
      orderBy: { date: "desc" },
      include: {
        game: { include: { homeTeam: true, awayTeam: true, park: true } },
      },
      take: 50,
    });

    const games = stats.map((s) => {
      const isHome = s.game.homeTeamId === s.teamId;
      const opponent =
        s.game.homeTeamId === s.teamId
          ? s.game.awayTeam?.name ?? "Opponent"
          : s.game.homeTeam?.name ?? "Opponent";
      const teamScore = isHome ? s.game.homeScore : s.game.awayScore;
      const oppScore = isHome ? s.game.awayScore : s.game.homeScore;
      const result =
        teamScore !== null && teamScore !== undefined && oppScore !== null && oppScore !== undefined
          ? `${teamScore > oppScore ? "W" : "L"} ${teamScore}-${oppScore}`
          : undefined;
      return {
        gameId: s.gameId,
        date: s.date.toISOString(),
        opponent,
        park: s.game.park.name,
        homeAway: isHome ? "home" : "away",
        hr: s.hr,
        xHr: s.xHr ?? null,
        avgEv: s.avgEv ?? null,
        barrels: s.barrels ?? null,
        barrelRate: s.barrelRate ?? null,
        hardHitRate: s.hardHitRate ?? null,
        iso: s.iso ?? null,
        woba: s.woba ?? null,
        result,
      };
    });

    return NextResponse.json({
      playerId,
      season: seasonValue,
      games,
    });
  } catch (error) {
    console.error("Error in /api/players/[playerId]/game-log", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
