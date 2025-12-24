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
  __dbUsedInsecureSsl?: boolean;
};

const defaultCaPath =
  process.env.NODE_EXTRA_CA_CERTS ||
  path.join(process.cwd(), "prod-ca-2021.crt");
const caFileExists = defaultCaPath ? fs.existsSync(defaultCaPath) : false;
const caBuffer = caFileExists ? fs.readFileSync(defaultCaPath) : undefined;
const allowInsecureEnv =
  process.env.DB_SSL_ALLOW_INSECURE === "1" ||
  process.env.DB_SSL_ALLOW_INSECURE === "true" ||
  process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0";
const connectionTimeoutMs =
  Number.parseInt(process.env.DB_CONNECTION_TIMEOUT_MS ?? "", 10) || 5000;

type PoolInit = {
  pool: Pool;
  usedInsecure: boolean;
};

const buildPool = (rejectUnauthorized: boolean): PoolInit => {
  const ssl: { rejectUnauthorized: boolean; ca?: Buffer } = { rejectUnauthorized };
  if (caBuffer) {
    ssl.ca = caBuffer;
  }
  return {
    pool: new Pool({
      connectionString,
      ssl,
      connectionTimeoutMillis: connectionTimeoutMs,
    }),
    usedInsecure: !rejectUnauthorized,
  };
};

const isTlsError = (error: unknown) => {
  if (!error || typeof error !== "object") return false;
  const code = (error as { code?: string }).code ?? "";
  const message = (error as { message?: string }).message ?? "";
  const tlsCodes = [
    "SELF_SIGNED_CERT_IN_CHAIN",
    "DEPTH_ZERO_SELF_SIGNED_CERT",
    "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
    "ERR_TLS_CERT_ALTNAME_INVALID",
    "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  ];
  return tlsCodes.includes(code) || message.toLowerCase().includes("certificate");
};

const initPool = async (): Promise<PoolInit> => {
  const primary = buildPool(!allowInsecureEnv);

  const warmupResult = await primary.pool
    .query("SELECT 1")
    .then(() => "ok" as const)
    .catch((error) => {
      if (!allowInsecureEnv && isTlsError(error)) {
        return "tls-error" as const;
      }
      console.warn(
        "Database warm-up query failed; continuing with current SSL config.",
        error,
      );
      return "failed" as const;
    });

  if (warmupResult === "tls-error") {
    await primary.pool.end().catch(() => {});
    console.warn(
      "Database TLS verification failed; retrying with rejectUnauthorized=false. " +
        "Provide NODE_EXTRA_CA_CERTS with your trusted root to restore verification.",
    );
    return buildPool(false);
  }

  return primary;
};

const { pool, usedInsecure } =
  globalForPrisma.pool && typeof globalForPrisma.__dbUsedInsecureSsl === "boolean"
    ? { pool: globalForPrisma.pool, usedInsecure: globalForPrisma.__dbUsedInsecureSsl }
    : await initPool();

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
  globalForPrisma.__dbUsedInsecureSsl = usedInsecure;
}

export default prisma;
