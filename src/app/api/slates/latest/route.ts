import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const latest = await prisma.game.findFirst({
      orderBy: { date: "desc" },
      select: { date: true },
    });

    const latestDate = latest ? latest.date.toISOString().slice(0, 10) : null;
    return NextResponse.json({ latestDate }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/slates/latest", error);
    // Fall back to null latestDate so the UI can show an empty-state message instead of failing.
    return NextResponse.json({ latestDate: null }, { status: 200 });
  }
}
