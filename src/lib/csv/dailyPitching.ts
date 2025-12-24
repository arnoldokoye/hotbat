import path from "node:path";

import { readCsvFile } from "@/lib/csv/csv";

const DAILY_LOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");

export type DailyPitchingRow = {
  gid: string;
  pitcher_id: string;
  team: string;
  opp: string;
  vishome: "h" | "v" | "";
  date: string; // YYYYMMDD
  p_seq: number;
  p_ipouts: number;
  p_er: number;
  p_hr: number;
};

export type StartersByGame = Map<string, { home?: string; away?: string }>;

let cache:
  | {
      season: number;
      mtimeMs: number;
      startersByGame: StartersByGame;
    }
  | null = null;

function asInt(value: string): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

export async function loadDailyPitchingStartersByGame(season: number): Promise<StartersByGame> {
  const filePath = path.join(DAILY_LOGS_DIR, `${season}DAILY_LOGScsvs`, `${season}pitching.csv`);
  const { header, rows, mtimeMs } = await readCsvFile(filePath);
  if (cache && cache.season === season && cache.mtimeMs === mtimeMs) return cache.startersByGame;

  const idx = new Map(header.map((h, i) => [h, i] as const));
  const cell = (cols: string[], key: string) => {
    const i = idx.get(key);
    return i === undefined ? "" : (cols[i] ?? "");
  };

  const startersByGame: StartersByGame = new Map();

  for (const cols of rows) {
    const stattype = cell(cols, "stattype").toLowerCase();
    if (stattype && stattype !== "value") continue;

    const pSeq = asInt(cell(cols, "p_seq"));
    if (pSeq !== 1) continue;

    const gid = cell(cols, "gid");
    const pitcher_id = cell(cols, "id");
    const vishome = cell(cols, "vishome");
    if (!gid || !pitcher_id) continue;

    const entry = startersByGame.get(gid) ?? {};
    if (vishome === "h") entry.home = pitcher_id;
    if (vishome === "v") entry.away = pitcher_id;
    startersByGame.set(gid, entry);
  }

  cache = { season, mtimeMs, startersByGame };
  return startersByGame;
}

