import fs from "node:fs/promises";
import path from "node:path";

import prisma from "@/lib/prisma";

export type CsvDateIndex = {
  dates: string[];
  seasons: number[];
  datesBySeason: Record<number, string[]>;
  minDate: string;
  maxDate: string;
};

export type Availability = {
  csv: {
    seasons: number[];
    datesBySeason: Record<number, string[]>;
  };
  db: {
    seasons: number[];
  };
};

const BASELINE_PUBLIC_CSV_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "player_game_baseline.csv",
);

let csvIndexCache: { mtimeMs: number; value: CsvDateIndex } | null = null;
let dbSeasonsCache:
  | { fetchedAtMs: number; value: number[] }
  | null = null;

function emptyCsvIndex(): CsvDateIndex {
  return { dates: [], seasons: [], datesBySeason: {}, minDate: "", maxDate: "" };
}

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

function isIsoDate(value: string): boolean {
  const v = value.trim();
  return (
    v.length === 10 &&
    v[4] === "-" &&
    v[7] === "-" &&
    /^\d{4}-\d{2}-\d{2}$/.test(v)
  );
}

export async function getCsvDateIndex(): Promise<CsvDateIndex> {
  try {
    const stat = await fs.stat(BASELINE_PUBLIC_CSV_PATH);
    if (csvIndexCache && csvIndexCache.mtimeMs === stat.mtimeMs) return csvIndexCache.value;

    const csvText = await fs.readFile(BASELINE_PUBLIC_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    if (!text) return emptyCsvIndex();

    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return emptyCsvIndex();

    const header = splitCsvLine(lines[0]).map((h) => h.trim());
    const dateIdx = header.indexOf("game_date");
    if (dateIdx === -1) return emptyCsvIndex();

    const datesSet = new Set<string>();
    for (const line of lines.slice(1)) {
      const cols = splitCsvLine(line);
      const d = (cols[dateIdx] ?? "").trim();
      if (isIsoDate(d)) datesSet.add(d);
    }

    const dates = Array.from(datesSet).sort();
    if (!dates.length) return emptyCsvIndex();

    const datesBySeason: Record<number, string[]> = {};
    for (const d of dates) {
      const year = Number.parseInt(d.slice(0, 4), 10);
      if (!Number.isFinite(year)) continue;
      (datesBySeason[year] ??= []).push(d);
    }

    const seasons = Object.keys(datesBySeason)
      .map((s) => Number.parseInt(s, 10))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => a - b);

    const value: CsvDateIndex = {
      dates,
      seasons,
      datesBySeason,
      minDate: dates[0],
      maxDate: dates[dates.length - 1],
    };

    csvIndexCache = { mtimeMs: stat.mtimeMs, value };
    return value;
  } catch {
    return emptyCsvIndex();
  }
}

export async function getDbSeasons(): Promise<number[]> {
  const databaseUrl = process.env.DATABASE_URL;
  const dbConfigured = Boolean(databaseUrl) && !databaseUrl?.includes("...");
  if (!dbConfigured) return [];

  // Cache for 60s to avoid hammering DB on every request/layout render.
  const now = Date.now();
  if (dbSeasonsCache && now - dbSeasonsCache.fetchedAtMs < 60_000) return dbSeasonsCache.value;

  try {
    const rows = await prisma.game.findMany({
      select: { season: true },
      distinct: ["season"],
      orderBy: { season: "asc" },
    });
    const seasons = rows
      .map((r) => r.season)
      .filter((n): n is number => typeof n === "number" && Number.isFinite(n))
      .sort((a, b) => a - b);
    dbSeasonsCache = { fetchedAtMs: now, value: seasons };
    return seasons;
  } catch {
    dbSeasonsCache = { fetchedAtMs: now, value: [] };
    return [];
  }
}

export async function getAvailability(): Promise<Availability> {
  const [csv, dbSeasons] = await Promise.all([getCsvDateIndex(), getDbSeasons()]);

  return {
    csv: {
      seasons: csv.seasons,
      datesBySeason: csv.datesBySeason,
    },
    db: {
      seasons: dbSeasons,
    },
  };
}

