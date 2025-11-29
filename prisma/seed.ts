import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to run the seed");
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: true },
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  // Clear existing data in dependency-safe order
  await prisma.gameHrPrediction.deleteMany();
  await prisma.teamGameHrStats.deleteMany();
  await prisma.teamHrSummary.deleteMany();
  await prisma.parkHrFactor.deleteMany();
  await prisma.game.deleteMany();
  await prisma.team.deleteMany();
  await prisma.park.deleteMany();

  // Reset sequences so seeded IDs start from 1 for predictable references
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Team_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Park_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(`ALTER SEQUENCE "Game_id_seq" RESTART WITH 1`);
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "TeamGameHrStats_id_seq" RESTART WITH 1`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "TeamHrSummary_id_seq" RESTART WITH 1`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "ParkHrFactor_id_seq" RESTART WITH 1`,
  );
  await prisma.$executeRawUnsafe(
    `ALTER SEQUENCE "GameHrPrediction_id_seq" RESTART WITH 1`,
  );

  // Parks
  const yankeeStadium = await prisma.park.create({
    data: {
      name: "Yankee Stadium",
      city: "Bronx",
      state: "NY",
      country: "USA",
      defaultHrFactor: 1.2,
      parkHrFactors: {
        create: {
          season: 2024,
          hrFactor: 1.18,
          hrFactorVsLhp: 1.12,
          hrFactorVsRhp: 1.22,
          samples: 120,
        },
      },
    },
  });

  // Teams
  const yankees = await prisma.team.create({
    data: {
      name: "New York Yankees",
      abbrev: "NYY",
      league: "AL",
      division: "AL East",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/25/NewYorkYankees_PrimaryLogo.svg",
      primaryParkId: yankeeStadium.id,
    },
  });

  const redSox = await prisma.team.create({
    data: {
      name: "Boston Red Sox",
      abbrev: "BOS",
      league: "AL",
      division: "AL East",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/en/6/6d/RedSoxPrimary_HangingSocks.svg",
    },
  });

  // Games
  const game1 = await prisma.game.create({
    data: {
      date: new Date("2024-06-10T23:05:00Z"),
      startTime: new Date("2024-06-10T23:05:00Z"),
      status: "final",
      season: 2024,
      homeTeamId: yankees.id,
      awayTeamId: redSox.id,
      parkId: yankeeStadium.id,
      homeScore: 7,
      awayScore: 3,
    },
  });

  const game2 = await prisma.game.create({
    data: {
      date: new Date("2024-06-11T23:05:00Z"),
      startTime: new Date("2024-06-11T23:05:00Z"),
      status: "final",
      season: 2024,
      homeTeamId: yankees.id,
      awayTeamId: redSox.id,
      parkId: yankeeStadium.id,
      homeScore: 5,
      awayScore: 4,
    },
  });

  const game3 = await prisma.game.create({
    data: {
      date: new Date("2024-06-15T23:05:00Z"),
      startTime: new Date("2024-06-15T23:05:00Z"),
      status: "scheduled",
      season: 2024,
      homeTeamId: yankees.id,
      awayTeamId: redSox.id,
      parkId: yankeeStadium.id,
    },
  });

  // Team game HR stats for final games
  await prisma.teamGameHrStats.createMany({
    data: [
      {
        gameId: game1.id,
        teamId: yankees.id,
        opponentTeamId: redSox.id,
        season: 2024,
        date: game1.date,
        homeOrAway: "home",
        parkId: yankeeStadium.id,
        hr: 3,
        xHr: 2.8,
        avgEv: 92.5,
        barrels: 5,
        barrelRate: 0.12,
        pa: 38,
      },
      {
        gameId: game1.id,
        teamId: redSox.id,
        opponentTeamId: yankees.id,
        season: 2024,
        date: game1.date,
        homeOrAway: "away",
        parkId: yankeeStadium.id,
        hr: 1,
        xHr: 1.2,
        avgEv: 88.1,
        barrels: 2,
        barrelRate: 0.06,
        pa: 36,
      },
      {
        gameId: game2.id,
        teamId: yankees.id,
        opponentTeamId: redSox.id,
        season: 2024,
        date: game2.date,
        homeOrAway: "home",
        parkId: yankeeStadium.id,
        hr: 2,
        xHr: 2.1,
        avgEv: 91.0,
        barrels: 4,
        barrelRate: 0.1,
        pa: 37,
      },
      {
        gameId: game2.id,
        teamId: redSox.id,
        opponentTeamId: yankees.id,
        season: 2024,
        date: game2.date,
        homeOrAway: "away",
        parkId: yankeeStadium.id,
        hr: 2,
        xHr: 1.9,
        avgEv: 89.3,
        barrels: 3,
        barrelRate: 0.08,
        pa: 38,
      },
    ],
  });

  // Team HR summaries
  await prisma.teamHrSummary.createMany({
    data: [
      {
        teamId: yankees.id,
        season: 2024,
        splitKey: "overall",
        gamesPlayed: 2,
        hr: 5,
        xHr: 4.9,
        hrPerGame: 2.5,
        hrPerPa: 0.066,
        hrVsLeaguePct: 0.2,
        avgEv: 91.8,
        barrelRate: 0.11,
      },
      {
        teamId: yankees.id,
        season: 2024,
        splitKey: "home",
        gamesPlayed: 2,
        hr: 5,
        xHr: 4.9,
        hrPerGame: 2.5,
        hrPerPa: 0.066,
        hrVsLeaguePct: 0.18,
        avgEv: 91.8,
        barrelRate: 0.11,
      },
      {
        teamId: yankees.id,
        season: 2024,
        splitKey: "month:2024-06",
        gamesPlayed: 2,
        hr: 5,
        xHr: 4.9,
        hrPerGame: 2.5,
        hrPerPa: 0.066,
        hrVsLeaguePct: 0.19,
        avgEv: 91.8,
        barrelRate: 0.11,
      },
      {
        teamId: redSox.id,
        season: 2024,
        splitKey: "overall",
        gamesPlayed: 2,
        hr: 3,
        xHr: 3.1,
        hrPerGame: 1.5,
        hrPerPa: 0.04,
        hrVsLeaguePct: -0.05,
        avgEv: 88.7,
        barrelRate: 0.07,
      },
    ],
  });

  // Game HR predictions for the scheduled game
  const predictionTimestamp = new Date();
  await prisma.gameHrPrediction.createMany({
    data: [
      {
        gameId: game3.id,
        teamId: yankees.id,
        modelVersion: "team_hr_v1_seed",
        predictionTimestamp,
        predictedHrMean: 2.2,
        predictedHrStd: 0.6,
        hotbatScore: 74.3,
        labelType: "team_total_hr",
        featuresSnapshot: { notes: "Seeded prediction for Yankees vs BOS" },
      },
      {
        gameId: game3.id,
        teamId: redSox.id,
        modelVersion: "team_hr_v1_seed",
        predictionTimestamp,
        predictedHrMean: 1.6,
        predictedHrStd: 0.5,
        hotbatScore: 61.4,
        labelType: "team_total_hr",
        featuresSnapshot: { notes: "Seeded prediction for Yankees vs BOS" },
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end().catch(() => {});
  });
