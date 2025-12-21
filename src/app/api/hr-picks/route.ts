import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type HrPick = {
  rank: number;
  playerId: number;
  playerName: string;
  teamAbbrev: string;
  hotbatScore: number;
  pickScore: number;
  reasons: string[];
  parkName?: string;
  parkHrFactor?: number;
  hrPerPa?: number;
  seasonHr?: number;
};

type HrPicksResponse = {
  date: string;
  picks: HrPick[];
};

const parseDate = (value: string | null) => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");
  const date = parseDate(dateParam);

  if (!dateParam || !date) {
    return NextResponse.json(
      { error: "date query param is required (YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  const endOfDay = new Date(date);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

  try {
    const games = await prisma.game.findMany({
      where: { date: { gte: date, lt: endOfDay } },
      orderBy: { date: "asc" },
      include: {
        homeTeam: true,
        awayTeam: true,
        park: {
          include: {
            parkHrFactors: {
              orderBy: { updatedAt: "desc" },
              take: 1,
            },
          },
        },
        gamePredictions: true,
      },
    });

    if (!games || games.length === 0) {
      const empty: HrPicksResponse = { date: dateParam, picks: [] };
      return NextResponse.json(empty, { status: 200 });
    }

    const season = games[0].season;
    const teamIds = Array.from(
      new Set(games.flatMap((g) => [g.homeTeamId, g.awayTeamId])),
    );

    const players = await prisma.player.findMany({
      where: { teamId: { in: teamIds } },
      include: {
        team: true,
        hrSummaries: {
          where: { season },
        },
      },
    });

    const predictionsByTeam = new Map<number, number>();
    for (const game of games) {
      for (const pred of game.gamePredictions) {
        predictionsByTeam.set(pred.teamId, pred.hotbatScore);
      }
    }

    const parkFactorsByTeam = new Map<number, { parkName: string; hrFactor?: number }>();
    for (const game of games) {
      const parkFactorEntry = game.park.parkHrFactors[0];
      const factor = parkFactorEntry?.hrFactor ?? game.park.defaultHrFactor ?? undefined;
      parkFactorsByTeam.set(game.homeTeamId, { parkName: game.park.name, hrFactor: factor });
      parkFactorsByTeam.set(game.awayTeamId, { parkName: game.park.name, hrFactor: factor });
    }

    const picksUnsorted: Omit<HrPick, "rank">[] = [];

    for (const player of players) {
      const overallSummary = player.hrSummaries.find((s) => s.splitKey === "overall");
      const hrPerPa = Number.isFinite(overallSummary?.hrPerPa ?? 0)
        ? (overallSummary?.hrPerPa as number)
        : 0;
      const hr = Number.isFinite(overallSummary?.hr ?? 0) ? (overallSummary?.hr as number) : 0;

      const hotbatScore = predictionsByTeam.get(player.teamId) ?? 0;
      // Deterministic, player-informed ranking: team HotBat score + HR/PA + HR tiebreak.
      const pickScore = hotbatScore + hrPerPa * 100 + hr * 0.1;
      const parkInfo = parkFactorsByTeam.get(player.teamId);

      const reasons: string[] = [];
      if (hotbatScore >= 75) {
        reasons.push(`Elite power profile (team HotBat Score ${hotbatScore.toFixed(1)})`);
      } else if (hotbatScore > 0) {
        reasons.push(`Team HotBat Score ${hotbatScore.toFixed(1)}`);
      }
      if (parkInfo?.hrFactor && parkInfo.hrFactor > 1.1) {
        reasons.push(`HR-friendly park at ${parkInfo.parkName}`);
      }
      if (hrPerPa >= 0.25) {
        reasons.push(`Strong HR/PA (${hrPerPa.toFixed(3)})`);
      }
      if (hr > 0 && reasons.length < 3) {
        reasons.push(`Season HR total ${hr}`);
      }
      if (!reasons.length && parkInfo?.parkName) {
        reasons.push(`Playing at ${parkInfo.parkName}`);
      }

      picksUnsorted.push({
        playerId: player.id,
        playerName: `${player.firstName} ${player.lastName}`,
        teamAbbrev: player.team.abbrev,
        hotbatScore,
        pickScore,
        reasons,
        parkName: parkInfo?.parkName,
        parkHrFactor: parkInfo?.hrFactor,
        hrPerPa,
        seasonHr: hr,
      });
    }

    const sorted = picksUnsorted
      .sort((a, b) => {
        if (b.pickScore !== a.pickScore) return b.pickScore - a.pickScore;
        if (b.hotbatScore !== a.hotbatScore) return b.hotbatScore - a.hotbatScore;
        if (b.reasons.length !== a.reasons.length) return b.reasons.length - a.reasons.length;
        return b.playerName.localeCompare(a.playerName);
      })
      .slice(0, 5);

    const picks: HrPick[] = sorted.map((p, idx) => ({
      rank: idx + 1,
      ...p,
    }));

    const response: HrPicksResponse = { date: dateParam, picks };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("hr-picks handler error", error);
    const fallback: HrPicksResponse = { date: dateParam ?? "", picks: [] };
    return NextResponse.json(fallback, { status: 500, headers: { "x-hotbat-error": "1" } });
  }
}
