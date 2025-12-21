import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type TodayGamesResponse = {
  date: string;
  games: {
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
    // Additional fields for frontend compatibility
    homeTeam: string;
    awayTeam: string;
    homeProjectedHrMin: number;
    homeProjectedHrMax: number;
    awayProjectedHrMin: number;
    awayProjectedHrMax: number;
    homeStartingPitcher: {
      name: string;
      teamName: string;
      throws: "L" | "R";
      hrPer9: number;
      era: number;
    };
    awayStartingPitcher: {
      name: string;
      teamName: string;
      throws: "L" | "R";
      hrPer9: number;
      era: number;
    };
  }[];
};

const parseDate = (value: string | null) => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const logoPath = (abbrev?: string | null) => {
  return abbrev
    ? `/team-logos/${abbrev.toLowerCase()}.svg`
    : "/team-logos/default.svg";
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

  const getPitcherFromSnapshot = (
    snapshot: unknown,
    key: "home_starting_pitcher" | "away_starting_pitcher",
  ) => {
    if (!snapshot || typeof snapshot !== "object") return undefined;
    const obj = snapshot as Record<string, unknown>;
    const raw = obj[key];
    if (!raw || typeof raw !== "object") return undefined;
    const pitcher = raw as Record<string, unknown>;
    const throws = pitcher.throws === "L" || pitcher.throws === "R" ? pitcher.throws : undefined;
    const name = typeof pitcher.name === "string" ? pitcher.name : undefined;
    const teamName = typeof pitcher.teamName === "string" ? pitcher.teamName : undefined;
    const hrPer9 = typeof pitcher.hrPer9 === "number" ? pitcher.hrPer9 : undefined;
    const era = typeof pitcher.era === "number" ? pitcher.era : undefined;
    if (!name && !throws && hrPer9 === undefined && era === undefined) return undefined;
    return { name, teamName, throws, hrPer9, era };
  };

    const response: TodayGamesResponse = {
      date: dateParam,
      games: games.map((game) => {
        const homePrediction = game.gamePredictions.find(
          (p) => p.teamId === game.homeTeamId,
        );
        const awayPrediction = game.gamePredictions.find(
          (p) => p.teamId === game.awayTeamId,
      );
      const parkFactorEntry = game.park.parkHrFactors[0];
      const hotbatScore =
        game.gamePredictions.length > 0
          ? game.gamePredictions.reduce(
              (total, prediction) => total + prediction.hotbatScore,
              0,
            ) / game.gamePredictions.length
          : undefined;

      const deriveRange = (mean?: number, std?: number) => {
        const m = mean ?? 0;
        const s = std ?? 0;
        const min = Math.max(0, Number((m - s).toFixed(1)));
        const max = Math.max(min, Number((m + s).toFixed(1)) || m || 1);
        return { min, max };
      };

      const homeRange = deriveRange(
        homePrediction?.predictedHrMean,
        homePrediction?.predictedHrStd,
      );
      const awayRange = deriveRange(
        awayPrediction?.predictedHrMean,
        awayPrediction?.predictedHrStd,
      );

      const defaultPitcher = {
        name: "TBD",
        teamName: "",
        throws: "R" as const,
        hrPer9: 0,
        era: 0,
      };

      const homePitcherSnapshot = getPitcherFromSnapshot(
        homePrediction?.featuresSnapshot,
        "home_starting_pitcher",
      );
      const awayPitcherSnapshot = getPitcherFromSnapshot(
        awayPrediction?.featuresSnapshot,
        "away_starting_pitcher",
      );

      return {
        id: game.id,
        date: dateParam,
        startTimeLocal: game.startTime?.toISOString(),
        homeTeamId: game.homeTeamId,
        awayTeamId: game.awayTeamId,
        homeTeamName: game.homeTeam.name,
        awayTeamName: game.awayTeam.name,
        homeTeamAbbrev: game.homeTeam.abbrev,
        awayTeamAbbrev: game.awayTeam.abbrev,
        homeTeamLogoUrl: logoPath(game.homeTeam.abbrev),
        awayTeamLogoUrl: logoPath(game.awayTeam.abbrev),
        parkName: game.park.name,
        parkHrFactor:
          parkFactorEntry?.hrFactor ?? game.park.defaultHrFactor ?? undefined,
        homePredictedHrMean: homePrediction?.predictedHrMean ?? undefined,
        awayPredictedHrMean: awayPrediction?.predictedHrMean ?? undefined,
        hotbatScore,
        homeTeam: game.homeTeam.name,
        awayTeam: game.awayTeam.name,
        homeProjectedHrMin: homeRange.min,
        homeProjectedHrMax: homeRange.max,
        awayProjectedHrMin: awayRange.min,
        awayProjectedHrMax: awayRange.max,
        homeStartingPitcher: {
          name: homePitcherSnapshot?.name ?? defaultPitcher.name,
          teamName: homePitcherSnapshot?.teamName ?? game.homeTeam.name,
          throws: homePitcherSnapshot?.throws ?? defaultPitcher.throws,
          hrPer9: homePitcherSnapshot?.hrPer9 ?? defaultPitcher.hrPer9,
          era: homePitcherSnapshot?.era ?? defaultPitcher.era,
        },
        awayStartingPitcher: {
          name: awayPitcherSnapshot?.name ?? defaultPitcher.name,
          teamName: awayPitcherSnapshot?.teamName ?? game.awayTeam.name,
          throws: awayPitcherSnapshot?.throws ?? defaultPitcher.throws,
          hrPer9: awayPitcherSnapshot?.hrPer9 ?? defaultPitcher.hrPer9,
          era: awayPitcherSnapshot?.era ?? defaultPitcher.era,
        },
      };
    }),
  };

  return NextResponse.json(response);
  } catch (error) {
    console.error("today-games handler error", error);
    const fallback: TodayGamesResponse = { date: dateParam, games: [] };
    return NextResponse.json(fallback, { status: 200 });
  }
}
