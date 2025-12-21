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
      include: { park: true },
    });

    const parkMap = new Map<
      number,
      {
        parkId: number;
        parkName: string;
        games: number;
        hr: number;
        xHr: number;
        avgEvSum: number;
        avgEvCount: number;
      }
    >();

    for (const s of stats) {
      const key = s.parkId;
      const entry =
        parkMap.get(key) ??
        {
          parkId: s.parkId,
          parkName: s.park.name,
          games: 0,
          hr: 0,
          xHr: 0,
          avgEvSum: 0,
          avgEvCount: 0,
        };
      entry.games += 1;
      entry.hr += s.hr;
      entry.xHr += s.xHr ?? 0;
      if (s.avgEv !== null && s.avgEv !== undefined) {
        entry.avgEvSum += s.avgEv;
        entry.avgEvCount += 1;
      }
      parkMap.set(key, entry);
    }

    const parks = Array.from(parkMap.values()).map((p) => ({
      parkId: p.parkId,
      parkName: p.parkName,
      games: p.games,
      hr: p.hr,
      xHr: Number(p.xHr.toFixed(2)),
      avgEv:
        p.avgEvCount > 0 ? Number((p.avgEvSum / p.avgEvCount).toFixed(1)) : null,
    }));

    return NextResponse.json({
      playerId,
      season: seasonValue,
      parks,
    });
  } catch (error) {
    console.error("Error in /api/players/[playerId]/park-profile", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
