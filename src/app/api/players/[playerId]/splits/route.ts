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

    const summaries = await prisma.playerHrSummary.findMany({
      where: { playerId, season: seasonValue },
      orderBy: [{ season: "desc" }, { splitKey: "asc" }],
    });

    const splits = summaries.map((s) => ({
      splitKey: s.splitKey,
      gamesPlayed: s.gamesPlayed,
      hr: s.hr,
      xHr: s.xHr ?? null,
      hrPerPa: s.hrPerPa ?? null,
      barrelRate: s.barrelRate ?? null,
      avgEv: s.avgEv ?? null,
      iso: s.iso ?? null,
      hardHitRate: s.hardHitRate ?? null,
    }));

    return NextResponse.json({
      playerId,
      season: seasonValue,
      splits,
    });
  } catch (error) {
    console.error("Error in /api/players/[playerId]/splits", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
