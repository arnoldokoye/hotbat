import fs from "node:fs";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

let prisma: InstanceType<typeof PrismaClient> | null = null;
let prismaAvailable = false;
let pool: InstanceType<typeof Pool> | null = null;

async function safeCleanup() {
  if (prisma) {
    await prisma.$disconnect().catch(() => {});
    prisma = null;
  }
  if (pool) {
    await pool.end().catch(() => {});
    pool = null;
  }
}

test.beforeAll(async () => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString || connectionString.includes("...")) {
    console.warn("Skipping Prisma-backed tests: DATABASE_URL is not set or placeholder.");
    return;
  }

  const defaultCaPath =
    process.env.NODE_EXTRA_CA_CERTS ||
    path.join(process.cwd(), "prod-ca-2021.crt");
  const hasCa = defaultCaPath && fs.existsSync(defaultCaPath);

  const attemptInit = async (rejectUnauthorized: boolean) => {
    const ssl: { rejectUnauthorized: boolean; ca?: Buffer } = { rejectUnauthorized };
    if (rejectUnauthorized && hasCa) {
      ssl.ca = fs.readFileSync(defaultCaPath);
    }

    pool = new Pool({
      connectionString,
      ssl,
    });
    const adapter = new PrismaPg(pool);
    prisma = new PrismaClient({ adapter });
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    prismaAvailable = true;
  };

  try {
    // Prefer CA verification when available; fall back to allowing self-signed if needed.
    await attemptInit(hasCa);
  } catch (error) {
    await safeCleanup();
    try {
      console.warn("Prisma init retrying with rejectUnauthorized=false due to TLS failure.");
      await attemptInit(false);
    } catch (secondError) {
      console.error("Prisma init error after TLS retry", secondError);
      prismaAvailable = false;
      await safeCleanup();
    }
  }
});

test.describe("Player seed data", () => {
  test("players exist with expected names", async () => {
    test.skip(!prismaAvailable, "PrismaClient could not be initialized; see console error.");
    const client = prisma;
    if (!client) return;

    const players = await client.player.findMany({
      include: { team: true },
      take: 20,
    });
    expect(players.length).toBeGreaterThan(0);

    const hasJudge = players.some(
      (p) =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes("judge") ||
        p.lastName.toLowerCase().includes("judge"),
    );
    expect(hasJudge).toBeTruthy();

    for (const p of players) {
      expect(p.teamId).toBeTruthy();
      expect(p.team).toBeTruthy();
    }
  });

  test("player game stats exist and have HR values", async () => {
    test.skip(!prismaAvailable, "PrismaClient could not be initialized; see console error.");
    const client = prisma;
    if (!client) return;

    const stats = await client.playerGameStats.findMany({
      include: {
        player: true,
        game: true,
        team: true,
        park: true,
      },
      take: 20,
    });
    expect(stats.length).toBeGreaterThan(0);
    expect(stats.some((s) => s.hr > 0)).toBeTruthy();
    for (const s of stats) {
      expect(s.playerId).toBeTruthy();
      expect(s.gameId).toBeTruthy();
    }
  });

  test("player HR summaries exist and have overall rows", async () => {
    test.skip(!prismaAvailable, "PrismaClient could not be initialized; see console error.");
    const client = prisma;
    if (!client) return;

    const summaries = await client.playerHrSummary.findMany({
      include: { player: true },
      take: 20,
    });
    expect(summaries.length).toBeGreaterThan(0);

    const overall = summaries.filter((s) => s.splitKey === "overall");
    expect(overall.length).toBeGreaterThan(0);
    expect(overall.some((s) => s.hr > 0 && s.gamesPlayed >= 1)).toBeTruthy();
  });
});

test.afterAll(async () => {
  await safeCleanup();
});
