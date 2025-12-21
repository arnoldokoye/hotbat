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
    });

    const totalHr = stats.reduce((sum, s) => sum + s.hr, 0);
    const totalXhr = stats.reduce((sum, s) => sum + (s.xHr ?? 0), 0);
    const entries = [
      {
        pitchType: "All",
        hr: totalHr,
        xHr: Number(totalXhr.toFixed(2)),
        avgEv:
          stats.length > 0
            ? Number(
                (
                  stats.reduce((sum, s) => sum + (s.avgEv ?? 0), 0) / stats.length
                ).toFixed(1),
              )
            : null,
        samples: stats.length,
      },
    ];

    return NextResponse.json({
      playerId,
      season: seasonValue,
      rows: entries,
    });
  } catch (error) {
    console.error("Error in /api/players/[playerId]/pitch-damage", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
