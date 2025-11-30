import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is required to initialize Prisma");
}

// Ensure a single PrismaClient/Pool instance across hot reloads in dev.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pool?: Pool;
  adapter?: PrismaPg;
};

const defaultCaPath =
  process.env.NODE_EXTRA_CA_CERTS ||
  path.join(process.cwd(), "prod-ca-2021.crt");
const sslConfig: { rejectUnauthorized: boolean; ca?: Buffer } = {
  rejectUnauthorized: true,
};
if (fs.existsSync(defaultCaPath)) {
  sslConfig.ca = fs.readFileSync(defaultCaPath);
}

// Create a Pool with SSL verification enabled; rely on system trust or NODE_EXTRA_CA_CERTS for Supabase CA.
const pool =
  globalForPrisma.pool ??
  new Pool({
    connectionString,
    ssl: sslConfig,
  });
const adapter = globalForPrisma.adapter ?? new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.pool = pool;
  globalForPrisma.adapter = adapter;
  globalForPrisma.prisma = prisma;
}

export default prisma;
