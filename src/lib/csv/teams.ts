import fs from "node:fs/promises";
import path from "node:path";

import type { TeamSummary } from "@/lib/backend/DataBackend";

const GAMELOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 GAMELOGS");
const TEAMS_CSV_PATH = path.join(GAMELOGS_DIR, "teams.csv");

let cache:
  | {
      mtimeMs: number;
      teams: TeamSummary[];
    }
  | null = null;

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

function parseIntSafe(value: string): number | null {
  const v = value.trim();
  if (!v) return null;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
}

export async function loadTeams(options?: {
  minSeason?: number;
  maxSeason?: number;
  leagues?: string[];
}): Promise<TeamSummary[]> {
  const stat = await fs.stat(TEAMS_CSV_PATH);
  if (cache && cache.mtimeMs === stat.mtimeMs) return cache.teams;

  const csvText = await fs.readFile(TEAMS_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  if (!text) {
    cache = { mtimeMs: stat.mtimeMs, teams: [] };
    return [];
  }

  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    cache = { mtimeMs: stat.mtimeMs, teams: [] };
    return [];
  }

  const header = splitCsvLine(lines[0]).map((h) => h.trim().toUpperCase());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cols: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cols[i] ?? "").trim();
  }

  const minSeason = options?.minSeason ?? 2020;
  const maxSeason = options?.maxSeason ?? 2025;
  const leagues =
    options?.leagues?.map((l) => l.trim().toUpperCase()).filter(Boolean) ?? ["AL", "NL"];

  type Candidate = { first: number; last: number; league: string | null; name: string };
  const bestByTeam = new Map<string, Candidate>();

  for (const line of lines.slice(1)) {
    const cols = splitCsvLine(line);
    const team_id = cell(cols, "TEAM");
    const league = cell(cols, "LEAGUE").toUpperCase();
    const city = cell(cols, "CITY");
    const nickname = cell(cols, "NICKNAME");
    const first = parseIntSafe(cell(cols, "FIRST")) ?? 0;
    const last = parseIntSafe(cell(cols, "LAST")) ?? 9999;
    if (!team_id || !city || !nickname) continue;
    if (leagues.length && league && !leagues.includes(league)) continue;
    if (last < minSeason || first > maxSeason) continue;

    const name = `${city} ${nickname}`;
    const cand: Candidate = { first, last, league: league || null, name };
    const existing = bestByTeam.get(team_id);
    if (!existing) {
      bestByTeam.set(team_id, cand);
      continue;
    }
    // Prefer the most recent era (highest FIRST), then lexicographic name for determinism.
    if (cand.first > existing.first) {
      bestByTeam.set(team_id, cand);
    } else if (cand.first === existing.first && cand.name < existing.name) {
      bestByTeam.set(team_id, cand);
    }
  }

  const teams: TeamSummary[] = Array.from(bestByTeam.entries()).map(([team_id, cand]) => ({
    team_id,
    team_name: cand.name,
    league: cand.league,
  }));

  teams.sort((a, b) => {
    if (a.team_name !== b.team_name) return a.team_name.localeCompare(b.team_name);
    return a.team_id.localeCompare(b.team_id);
  });

  cache = { mtimeMs: stat.mtimeMs, teams };
  return teams;
}

