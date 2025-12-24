import path from "node:path";

import { readCsvFile } from "@/lib/csv/csv";

const DAILY_LOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");

export type DailyBattingRow = {
  gid: string;
  player_id: string;
  team: string;
  opp: string;
  vishome: "h" | "v" | "";
  site: string;
  date: string; // YYYYMMDD
  b_pa: number;
  b_ab: number;
  b_hr: number;
  b_d: number;
  b_t: number;
  b_rbi: number;
  b_w: number;
  b_k: number;
};

let cache:
  | {
      season: number;
      mtimeMs: number;
      rows: DailyBattingRow[];
    }
  | null = null;

function asInt(value: string): number {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : 0;
}

export async function loadDailyBatting(season: number): Promise<DailyBattingRow[]> {
  const filePath = path.join(DAILY_LOGS_DIR, `${season}DAILY_LOGScsvs`, `${season}batting.csv`);

  const { header, rows, mtimeMs } = await readCsvFile(filePath);
  if (cache && cache.season === season && cache.mtimeMs === mtimeMs) return cache.rows;

  const idx = new Map(header.map((h, i) => [h, i] as const));
  const cell = (cols: string[], key: string) => {
    const i = idx.get(key);
    return i === undefined ? "" : (cols[i] ?? "");
  };

  const parsed: DailyBattingRow[] = [];
  for (const cols of rows) {
    const stattype = cell(cols, "stattype").toLowerCase();
    if (stattype && stattype !== "value") continue;

    const gid = cell(cols, "gid");
    const player_id = cell(cols, "id");
    const team = cell(cols, "team");
    const opp = cell(cols, "opp");
    const vishome = cell(cols, "vishome") as DailyBattingRow["vishome"];
    const site = cell(cols, "site");
    const date = cell(cols, "date");

    if (!gid || !player_id || !team || !date) continue;

    parsed.push({
      gid,
      player_id,
      team,
      opp,
      vishome: vishome === "h" || vishome === "v" ? vishome : "",
      site,
      date,
      b_pa: asInt(cell(cols, "b_pa")),
      b_ab: asInt(cell(cols, "b_ab")),
      b_hr: asInt(cell(cols, "b_hr")),
      b_d: asInt(cell(cols, "b_d")),
      b_t: asInt(cell(cols, "b_t")),
      b_rbi: asInt(cell(cols, "b_rbi")),
      b_w: asInt(cell(cols, "b_w")),
      b_k: asInt(cell(cols, "b_k")),
    });
  }

  // Deterministic ordering.
  parsed.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    if (a.gid !== b.gid) return a.gid.localeCompare(b.gid);
    if (a.player_id !== b.player_id) return a.player_id.localeCompare(b.player_id);
    return a.team.localeCompare(b.team);
  });

  cache = { season, mtimeMs, rows: parsed };
  return parsed;
}

