import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const IS_HOSTED_PROD =
  process.env.VERCEL === "1" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production" ||
  process.env.NETLIFY === "true" ||
  process.env.CF_PAGES === "1";

export async function GET() {
  if (IS_HOSTED_PROD) {
    return NextResponse.json({ error: "Not found" }, {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  try {
    const player = await prisma.player.findFirst({
      select: { id: true, firstName: true, lastName: true },
      orderBy: { id: "asc" },
    });
    const team = await prisma.team.findFirst({
      select: { id: true, name: true },
      orderBy: { id: "asc" },
    });

    return NextResponse.json(
      {
        playerId: player?.id ?? null,
        playerName: player ? `${player.firstName} ${player.lastName}`.trim() : null,
        teamId: team?.id ?? null,
        teamName: team?.name ?? null,
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("default-ids fixture error", error);
    return NextResponse.json(
      {
        playerId: null,
        playerName: null,
        teamId: null,
        teamName: null,
        error: "unavailable",
      },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
