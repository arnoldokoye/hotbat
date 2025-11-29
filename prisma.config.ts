import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load env in the same order Next.js does: base .env then override with .env.local
dotenv.config({ path: ".env" });
dotenv.config({ path: ".env.local", override: true });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
  migrations: {
    seed: "dotenv -e .env.local -- tsx prisma/seed.ts",
  },
});
