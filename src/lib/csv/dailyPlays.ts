import path from "node:path";

import { readCsvFile } from "@/lib/csv/csv";

const DAILY_LOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");

export type DailyPlayPa = {
  gid: string;
  date: string; // ISO YYYY-MM-DD
  batter_id: string;
  bat_team_id: string;
  pa_index: number;
  hr: number;
};

let cache:
  | {
      season: number;
      mtimeMs: number;
      rows: DailyPlayPa[];
    }
  | null = null;

function asInt(value: string): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

function yyyymmddToIsoDate(value: string): string | null {
  const v = value.trim();
  if (!/^\d{8}$/.test(v)) return null;
  return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
}

export async function loadDailyPlays(season: number): Promise<DailyPlayPa[]> {
  const filePath = path.join(DAILY_LOGS_DIR, `${season}DAILY_LOGScsvs`, `${season}plays.csv`);
  const { header, rows, mtimeMs } = await readCsvFile(filePath);

  if (cache && cache.season === season && cache.mtimeMs === mtimeMs) return cache.rows;

  const idx = new Map(header.map((h, i) => [h, i] as const));
  const cell = (cols: string[], key: string) => {
    const i = idx.get(key);
    return i === undefined ? "" : (cols[i] ?? "");
  };

  const parsed: DailyPlayPa[] = [];
  for (const cols of rows) {
    const gid = cell(cols, "gid");
    const batter_id = cell(cols, "batter");
    const bat_team_id = cell(cols, "batteam");
    const dateRaw = cell(cols, "date");
    const paFlag = asInt(cell(cols, "pa"));

    if (!gid || !batter_id || !bat_team_id || !dateRaw) continue;
    if (paFlag !== 1) continue;

    const date = yyyymmddToIsoDate(dateRaw);
    if (!date) continue;

    const pa_index = asInt(cell(cols, "pn"));
    const hr = asInt(cell(cols, "hr"));

    parsed.push({
      gid,
      date,
      batter_id,
      bat_team_id,
      pa_index,
      hr,
    });
  }

  // Deterministic ordering: date ASC, game ASC, PA index ASC.
  parsed.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.gid !== b.gid) return a.gid.localeCompare(b.gid);
    if (a.pa_index !== b.pa_index) return a.pa_index - b.pa_index;
    return a.batter_id.localeCompare(b.batter_id);
  });

  cache = { season, mtimeMs, rows: parsed };
  return parsed;
}
