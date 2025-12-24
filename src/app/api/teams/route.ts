import { NextResponse } from "next/server";

import { getBackendFromEnv } from "@/lib/backend";

export async function GET() {
  try {
    const backend = getBackendFromEnv();
    const teams = await backend.getTeams();
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    console.error("/api/teams error", error);
    return NextResponse.json([], {
      status: 200,
      headers: { "x-hotbat-error": "1" },
    });
  }
}

