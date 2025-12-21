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
      orderBy: { date: "asc" },
      take: 50,
    });

    const series = stats.map((s) => ({
      date: s.date.toISOString(),
      gameId: s.gameId,
      hr: s.hr,
      xHr: s.xHr ?? null,
      avgEv: s.avgEv ?? null,
      barrels: s.barrels ?? null,
    }));

    return NextResponse.json({
      teamId,
      season: season ?? null,
      series,
    });
  } catch (error) {
    console.error("Error in /api/teams/[teamId]/trend", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
