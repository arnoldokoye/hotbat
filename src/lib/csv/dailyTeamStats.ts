import path from "node:path";

import { readCsvFile } from "@/lib/csv/csv";

const DAILY_LOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");

export type DailyTeamStatsRow = {
  gid: string;
  team_id: string;
  opp: string;
  vishome: "h" | "v" | "";
  site: string;
  date: string; // YYYYMMDD
  b_hr: number;
  b_pa: number;
  win: number;
  loss: number;
  tie: number;
};

let cache:
  | {
      season: number;
      mtimeMs: number;
      rows: DailyTeamStatsRow[];
    }
  | null = null;

function asInt(value: string): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

export async function loadDailyTeamStats(season: number): Promise<DailyTeamStatsRow[]> {
  const filePath = path.join(DAILY_LOGS_DIR, `${season}DAILY_LOGScsvs`, `${season}teamstats.csv`);
  const { header, rows, mtimeMs } = await readCsvFile(filePath);

  if (cache && cache.season === season && cache.mtimeMs === mtimeMs) return cache.rows;

  const idx = new Map(header.map((h, i) => [h, i] as const));
  const cell = (cols: string[], key: string) => {
    const i = idx.get(key);
    return i === undefined ? "" : (cols[i] ?? "");
  };

  const parsed: DailyTeamStatsRow[] = [];
  for (const cols of rows) {
    const stattype = cell(cols, "stattype").toLowerCase();
    if (stattype && stattype !== "value") continue;

    const gid = cell(cols, "gid");
    const team_id = cell(cols, "team");
    const opp = cell(cols, "opp");
    const vishome = cell(cols, "vishome") as DailyTeamStatsRow["vishome"];
    const site = cell(cols, "site");
    const date = cell(cols, "date");

    if (!gid || !team_id || !date) continue;

    parsed.push({
      gid,
      team_id,
      opp,
      vishome: vishome === "h" || vishome === "v" ? vishome : "",
      site,
      date,
      b_hr: asInt(cell(cols, "b_hr")),
      b_pa: asInt(cell(cols, "b_pa")),
      win: asInt(cell(cols, "win")),
      loss: asInt(cell(cols, "loss")),
      tie: asInt(cell(cols, "tie")),
    });
  }

  // Deterministic ordering.
  parsed.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.gid !== b.gid) return a.gid.localeCompare(b.gid);
    return a.team_id.localeCompare(b.team_id);
  });

  cache = { season, mtimeMs, rows: parsed };
  return parsed;
}

