import fs from "node:fs/promises";
import path from "node:path";

import type { Handedness, PlayerSummary, ThrowHand } from "@/lib/backend/DataBackend";

const PLAYER_REGISTRY_CSV_PATH = path.join(process.cwd(), "scripts", "ml", "data", "player_registry.csv");
const BIOFILE_CSV_PATH = path.join(
  process.cwd(),
  "data_sources",
  "NEW_DATA_SETS",
  "2020-25 GAMELOGS",
  "biofile (1)",
  "biofile.csv",
);

type PlayerRegistryRow = {
  player_id: string;
  player_name: string;
  first_name: string;
  last_name: string;
};

let cache:
  | {
      registryMtimeMs: number;
      bioMtimeMs: number | null;
      players: PlayerSummary[];
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

function normalizeBats(value: string): Handedness | null {
  const v = value.trim().toUpperCase();
  if (v === "L" || v === "R" || v === "B") return v;
  return null;
}

function normalizeThrows(value: string): ThrowHand | null {
  const v = value.trim().toUpperCase();
  if (v === "L" || v === "R") return v;
  return null;
}

function parseYearFromMmDdYyyy(value: string): number | null {
  const v = value.trim();
  const m = /^\d{2}\/\d{2}\/(\d{4})$/.exec(v);
  if (!m) return null;
  const year = Number.parseInt(m[1], 10);
  return Number.isFinite(year) ? year : null;
}

async function loadPlayerRegistryRows(): Promise<PlayerRegistryRow[]> {
  const csvText = await fs.readFile(PLAYER_REGISTRY_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  if (!text) return [];
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const header = splitCsvLine(lines[0]).map((h) => h.trim());
  const idx = new Map(header.map((h, i) => [h, i]));

  const idIdx = idx.get("player_id");
  const firstIdx = idx.get("first_name");
  const lastIdx = idx.get("last_name");
  const nameIdx = idx.get("full_name");
  if (idIdx === undefined || nameIdx === undefined || firstIdx === undefined || lastIdx === undefined) {
    return [];
  }

  const rows: PlayerRegistryRow[] = [];
  for (const line of lines.slice(1)) {
    const cols = splitCsvLine(line);
    const player_id = (cols[idIdx] ?? "").trim();
    const first_name = (cols[firstIdx] ?? "").trim();
    const last_name = (cols[lastIdx] ?? "").trim();
    const player_name = (cols[nameIdx] ?? "").trim();
    if (!player_id || !player_name || !first_name || !last_name) continue;
    rows.push({ player_id, player_name, first_name, last_name });
  }
  return rows;
}

async function loadBioHands(): Promise<
  Map<
    string,
    {
      bats: Handedness | null;
      throws: ThrowHand | null;
      first_season: number | null;
      last_season: number | null;
    }
  >
> {
  const byId = new Map<
    string,
    {
      bats: Handedness | null;
      throws: ThrowHand | null;
      first_season: number | null;
      last_season: number | null;
    }
  >();

  const csvText = await fs.readFile(BIOFILE_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  if (!text) return byId;

  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return byId;

  const header = splitCsvLine(lines[0]).map((h) => h.trim().toUpperCase());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cols: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cols[i] ?? "").trim();
  }

  for (const line of lines.slice(1)) {
    const cols = splitCsvLine(line);
    const playerId = cell(cols, "PLAYERID");
    if (!playerId) continue;
    if (byId.has(playerId)) continue;

    const bats = normalizeBats(cell(cols, "BATS"));
    const throws = normalizeThrows(cell(cols, "THROWS"));
    const first_season = parseYearFromMmDdYyyy(cell(cols, "PLAY.DEBUT"));
    const last_season = parseYearFromMmDdYyyy(cell(cols, "PLAY.LASTGAME"));
    byId.set(playerId, { bats, throws, first_season, last_season });
  }

  return byId;
}

export async function loadPlayerRegistry(): Promise<PlayerSummary[]> {
  const registryStat = await fs.stat(PLAYER_REGISTRY_CSV_PATH);

  let bioStat: { mtimeMs: number } | null = null;
  try {
    bioStat = await fs.stat(BIOFILE_CSV_PATH);
  } catch {
    bioStat = null;
  }

  if (
    cache &&
    cache.registryMtimeMs === registryStat.mtimeMs &&
    cache.bioMtimeMs === (bioStat ? bioStat.mtimeMs : null)
  ) {
    return cache.players;
  }

  const registryRows = await loadPlayerRegistryRows();
  if (!registryRows.length) {
    cache = { registryMtimeMs: registryStat.mtimeMs, bioMtimeMs: bioStat?.mtimeMs ?? null, players: [] };
    return [];
  }

  const bioById = bioStat ? await loadBioHands() : new Map();

  const players: PlayerSummary[] = registryRows.map((r) => {
    const bio = bioById.get(r.player_id);
    return {
      player_id: r.player_id,
      player_name: r.player_name,
      first_name: r.first_name,
      last_name: r.last_name,
      bats: bio?.bats ?? null,
      throws: bio?.throws ?? null,
      first_season: bio?.first_season ?? null,
      last_season: bio?.last_season ?? null,
    };
  });

  // Deterministic ordering.
  players.sort((a, b) => {
    if (a.player_name !== b.player_name) return a.player_name.localeCompare(b.player_name);
    return a.player_id.localeCompare(b.player_id);
  });

  cache = {
    registryMtimeMs: registryStat.mtimeMs,
    bioMtimeMs: bioStat?.mtimeMs ?? null,
    players,
  };

  return players;
}
