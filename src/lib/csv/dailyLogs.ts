import fs from "node:fs/promises";
import path from "node:path";

const DAILY_LOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");

export async function discoverDailyLogsSeasons(): Promise<number[]> {
  try {
    const entries = await fs.readdir(DAILY_LOGS_DIR, { withFileTypes: true });
    const seasons = entries
      .filter((e) => e.isDirectory())
      .map((e) => e.name.slice(0, 4))
      .filter((s) => /^\d{4}$/.test(s))
      .map((s) => Number.parseInt(s, 10))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);
    return Array.from(new Set(seasons));
  } catch {
    return [];
  }
}

