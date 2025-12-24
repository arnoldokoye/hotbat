import fs from "node:fs/promises";
import path from "node:path";

const GAMELOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 GAMELOGS");
const BALLPARKS_CSV_PATH = path.join(GAMELOGS_DIR, "ballparks.csv");

let cache: { mtimeMs: number; byParkId: Map<string, string> } | null = null;

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];

    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }

    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }

    cur += ch;
  }

  out.push(cur);
  return out;
}

export async function loadBallparks(): Promise<Map<string, string>> {
  const stat = await fs.stat(BALLPARKS_CSV_PATH);
  if (cache && cache.mtimeMs === stat.mtimeMs) return cache.byParkId;

  const csvText = await fs.readFile(BALLPARKS_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error(`ballparks.csv is empty: ${BALLPARKS_CSV_PATH}`);

  const header = splitCsvLine(lines[0]).map((h) => h.trim().toUpperCase());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cols: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cols[i] ?? "").trim();
  }

  const byParkId = new Map<string, string>();
  for (const line of lines.slice(1)) {
    const cols = splitCsvLine(line);
    const parkId = cell(cols, "PARKID");
    const name = cell(cols, "NAME");
    if (!parkId || !name) continue;
    if (!byParkId.has(parkId)) byParkId.set(parkId, name);
  }

  cache = { mtimeMs: stat.mtimeMs, byParkId };
  return byParkId;
}

