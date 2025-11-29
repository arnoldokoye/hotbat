import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type TodayGame = {
  id: number;
  date: string;
  startTimeLocal?: string;
  homeTeamId: number;
  awayTeamId: number;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamAbbrev: string;
  awayTeamAbbrev: string;
  homeTeamLogoUrl?: string;
  awayTeamLogoUrl?: string;
  parkName: string;
  parkHrFactor?: number;
  homePredictedHrMean?: number;
  awayPredictedHrMean?: number;
  hotbatScore?: number;
};

type TodayGamesResponse = {
  date: string;
  games: TodayGame[];
};

const parseDateParam = (value: string | null) => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");
  const date = parseDateParam(dateParam);

  if (!dateParam || !date) {
    return NextResponse.json(
      { error: "date query param is required (YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  const endOfDay = new Date(date);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

  const games = await prisma.game.findMany({
    where: { date: { gte: date, lt: endOfDay } },
    orderBy: { date: "asc" },
    include: {
      homeTeam: true,
      awayTeam: true,
      park: { include: { parkHrFactors: true } },
      gamePredictions: true,
    },
  });

  const response: TodayGamesResponse = {
    date: dateParam,
    games: games.map((game) => {
      const homePrediction = game.gamePredictions.find(
        (p) => p.teamId === game.homeTeamId,
      );
      const awayPrediction = game.gamePredictions.find(
        (p) => p.teamId === game.awayTeamId,
      );
      const parkFactorEntry =
        game.park.parkHrFactors.find((f) => f.season === game.season) ??
        game.park.parkHrFactors[0];
      const hotbatScore =
        game.gamePredictions.length > 0
          ? game.gamePredictions.reduce(
              (total, prediction) => total + prediction.hotbatScore,
              0,
            ) / game.gamePredictions.length
          : undefined;

      return {
        id: game.id,
        date: game.date.toISOString(),
        startTimeLocal: game.startTime?.toISOString(),
        homeTeamId: game.homeTeamId,
        awayTeamId: game.awayTeamId,
        homeTeamName: game.homeTeam.name,
        awayTeamName: game.awayTeam.name,
        homeTeamAbbrev: game.homeTeam.abbrev,
        awayTeamAbbrev: game.awayTeam.abbrev,
        homeTeamLogoUrl: game.homeTeam.logoUrl ?? undefined,
        awayTeamLogoUrl: game.awayTeam.logoUrl ?? undefined,
        parkName: game.park.name,
        parkHrFactor:
          parkFactorEntry?.hrFactor ?? game.park.defaultHrFactor ?? undefined,
        homePredictedHrMean: homePrediction?.predictedHrMean ?? undefined,
        awayPredictedHrMean: awayPrediction?.predictedHrMean ?? undefined,
        hotbatScore,
      };
    }),
  };

  return NextResponse.json(response);
}
