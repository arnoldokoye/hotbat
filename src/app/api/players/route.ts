import { NextResponse } from "next/server";

import { getBackendFromEnv } from "@/lib/backend";

export async function GET() {
  try {
    const backend = getBackendFromEnv();
    const players = await backend.getPlayers();
    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    console.error("/api/players error", error);
    return NextResponse.json([], {
      status: 200,
      headers: { "x-hotbat-error": "1" },
    });
  }
}

