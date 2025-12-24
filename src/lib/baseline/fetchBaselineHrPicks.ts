import fs from "node:fs/promises";
import path from "node:path";

import type { CompareHRPick, Handedness, HrPicksBaselineResponse } from "@/features/hr-picks/types";

type PlayerGameBaselineRow = {
  player_id: string;
  player_name: string;
  game_date: string;
  park_id: string;
  opposing_pitcher_id: string;
  hr_rate_last_50: number;
  season_hr_rate: number;
  season_hr: number;
  season_pa: number;
  pitcher_hr_allowed_rate_last_50: number;
  park_hr_factor: number;
  expected_pa: number;
  baseline_hr_score: number;
};

const BASELINE_PUBLIC_CSV_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "player_game_baseline.csv",
);

const PLAYER_REGISTRY_CSV_PATH = path.join(process.cwd(), "scripts", "ml", "data", "player_registry.csv");
const PITCHER_FEATURES_CSV_PATH = path.join(
  process.cwd(),
  "scripts",
  "ml",
  "data",
  "features_v1",
  "pitcher_daily_features.csv",
);

const GAMELOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 GAMELOGS");
const BALLPARKS_CSV_PATH = path.join(GAMELOGS_DIR, "ballparks.csv");
const TEAMS_CSV_PATH = path.join(GAMELOGS_DIR, "teams.csv");
const BIOFILE_CSV_PATH = path.join(GAMELOGS_DIR, "biofile (1)", "biofile.csv");

const DAILY_LOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");

const PICK_SCORE_SCALE = Number(process.env.HOTBAT_PICK_SCORE_SCALE ?? "200");
const PICKS_LIMIT = Number(process.env.HOTBAT_HR_PICKS_LIMIT ?? "25");

let cached:
  | {
      mtimeMs: number;
      rows: PlayerGameBaselineRow[];
      dates: string[];
    }
  | null = null;

let cachedRegistry:
  | {
      mtimeMs: number;
      byId: Map<string, string>;
    }
  | null = null;

let cachedBallparks:
  | {
      mtimeMs: number;
      byParkId: Map<string, string>;
    }
  | null = null;

type TeamEra = { first: number; last: number; name: string };
let cachedTeams:
  | {
      mtimeMs: number;
      byTeamId: Map<string, TeamEra[]>;
    }
  | null = null;

let cachedBio:
  | {
      mtimeMs: number;
      byPlayerId: Map<
        string,
        {
          bats: Handedness | null;
          throws: "L" | "R" | null;
        }
      >;
    }
  | null = null;

let cachedPitcherFeatures:
  | {
      mtimeMs: number;
      byKey: Map<string, { hrAllowedRateLast50: number; cumHrAllowed: number }>;
    }
  | null = null;

const cachedBattingTeamsByYear = new Map<
  number,
  { mtimeMs: number; map: Map<string, { teamId: string; oppId: string }> }
>();

function parseNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
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

function parseIsoDate(value: string): string {
  const v = value.trim();
  if (v.length === 10 && v[4] === "-" && v[7] === "-") return v;
  if (v.length === 8 && /^\d{8}$/.test(v)) return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
  return v;
}

function parseStarttimeMinutes(value: string): number | null {
  const v = value.trim().toUpperCase();
  const m = /^(\d{1,2}):(\d{2})(AM|PM)$/.exec(v);
  if (!m) return null;
  let hour = Number(m[1]);
  const minute = Number(m[2]);
  const ampm = m[3];
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  if (hour === 12) hour = 0;
  if (ampm === "PM") hour += 12;
  return hour * 60 + minute;
}

function normalizeHandedness(value: string): Handedness | null {
  const v = value.trim().toUpperCase();
  if (v === "L" || v === "R" || v === "B") return v;
  return null;
}

function resolveMatchupAdvantage(batterHand: Handedness, pitcherHand: "L" | "R" | null) {
  if (!pitcherHand) return "neutral";
  if (batterHand === "B") return "neutral";
  return batterHand === pitcherHand ? "negative" : "positive";
}

function buildTopReasons(pick: CompareHRPick): string[] {
  const reasons: string[] = [];

  if (pick.matchup_advantage === "positive" && pick.opposing_pitcher_hand) {
    reasons.push(`Platoon advantage (${pick.batter_hand} vs ${pick.opposing_pitcher_hand})`);
  } else if (pick.matchup_advantage === "negative" && pick.opposing_pitcher_hand) {
    reasons.push(`Platoon disadvantage (${pick.batter_hand} vs ${pick.opposing_pitcher_hand})`);
  }

  if (pick.hr_rate_last_50 >= 0.1) {
    reasons.push(`Strong HR/PA (${pick.hr_rate_last_50.toFixed(3)})`);
  } else if (pick.hr_rate_last_50 > 0) {
    reasons.push(`Recent HR/PA (${pick.hr_rate_last_50.toFixed(3)})`);
  }

  if (pick.season_hr_total > 0 && reasons.length < 3) {
    reasons.push(`Season HR total ${pick.season_hr_total}`);
  }

  if (pick.pitcher_hr_rate_allowed !== null && reasons.length < 3) {
    if (pick.pitcher_hr_rate_allowed >= 0.1) {
      reasons.push(
        `Pitcher HR allowed trend (${pick.pitcher_hr_rate_allowed.toFixed(3)})`,
      );
    } else if (pick.pitcher_hr_rate_allowed > 0) {
      reasons.push(
        `Pitcher HR allowed (${pick.pitcher_hr_rate_allowed.toFixed(3)})`,
      );
    }
  }

  if (pick.park_hr_factor > 1.05 && reasons.length < 3) {
    reasons.push(`HR-friendly park at ${pick.park_name}`);
  } else if (pick.park_hr_factor > 0 && pick.park_hr_factor < 0.95 && reasons.length < 3) {
    reasons.push(`HR-suppressing park at ${pick.park_name}`);
  }

  if (!reasons.length) {
    reasons.push(`Baseline HR score ${pick.baseline_score.toFixed(3)}`);
  }

  return reasons.slice(0, 3);
}

function parseBaselineCsv(csvText: string): PlayerGameBaselineRow[] {
  const text = csvText.replace(/^\uFEFF/, "").trim();
  if (!text) return [];

  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];

  const header = splitCsvLine(lines[0]).map((h) => h.trim());
  const idx = new Map(header.map((h, i) => [h, i]));

  function getCell(cells: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cells[i] ?? "").trim();
  }

  const rows: PlayerGameBaselineRow[] = [];
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);

    const player_id = getCell(cells, "player_id");
    const player_name = getCell(cells, "player_name") || player_id;
    const game_date = getCell(cells, "game_date");
    if (!player_id || !game_date) continue;

    rows.push({
      player_id,
      player_name,
      game_date,
      park_id: getCell(cells, "park_id"),
      opposing_pitcher_id: getCell(cells, "opposing_pitcher_id"),
      hr_rate_last_50: parseNumber(getCell(cells, "hr_rate_last_50")),
      season_hr_rate: parseNumber(getCell(cells, "season_hr_rate")),
      season_hr: parseNumber(getCell(cells, "season_hr")),
      season_pa: parseNumber(getCell(cells, "season_pa")),
      pitcher_hr_allowed_rate_last_50: parseNumber(
        getCell(cells, "pitcher_hr_allowed_rate_last_50"),
      ),
      park_hr_factor: parseNumber(getCell(cells, "park_hr_factor")),
      expected_pa: parseNumber(getCell(cells, "expected_pa")),
      baseline_hr_score: parseNumber(getCell(cells, "baseline_hr_score")),
    });
  }

  return rows;
}

async function loadRegistry(): Promise<Map<string, string>> {
  const stat = await fs.stat(PLAYER_REGISTRY_CSV_PATH);
  if (cachedRegistry && cachedRegistry.mtimeMs === stat.mtimeMs) return cachedRegistry.byId;

  const csvText = await fs.readFile(PLAYER_REGISTRY_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error(`Player registry is empty: ${PLAYER_REGISTRY_CSV_PATH}`);
  const header = splitCsvLine(lines[0]).map((h) => h.trim());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cells: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cells[i] ?? "").trim();
  }

  const byId = new Map<string, string>();
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const playerId = cell(cells, "player_id");
    const fullName = cell(cells, "full_name") || `${cell(cells, "first_name")} ${cell(cells, "last_name")}`.trim();
    if (!playerId || !fullName) continue;
    if (byId.has(playerId) && byId.get(playerId) !== fullName) {
      throw new Error(`Conflicting full_name for player_id=${playerId} in player_registry.csv`);
    }
    byId.set(playerId, fullName);
  }

  cachedRegistry = { mtimeMs: stat.mtimeMs, byId };
  return byId;
}

async function loadBallparks(): Promise<Map<string, string>> {
  const stat = await fs.stat(BALLPARKS_CSV_PATH);
  if (cachedBallparks && cachedBallparks.mtimeMs === stat.mtimeMs) return cachedBallparks.byParkId;

  const csvText = await fs.readFile(BALLPARKS_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error(`ballparks.csv is empty: ${BALLPARKS_CSV_PATH}`);

  const header = splitCsvLine(lines[0]).map((h) => h.trim().toUpperCase());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cells: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cells[i] ?? "").trim();
  }

  const byParkId = new Map<string, string>();
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const parkId = cell(cells, "PARKID");
    const name = cell(cells, "NAME");
    if (!parkId || !name) continue;
    if (!byParkId.has(parkId)) byParkId.set(parkId, name);
  }

  cachedBallparks = { mtimeMs: stat.mtimeMs, byParkId };
  return byParkId;
}

async function loadTeams(): Promise<Map<string, TeamEra[]>> {
  const stat = await fs.stat(TEAMS_CSV_PATH);
  if (cachedTeams && cachedTeams.mtimeMs === stat.mtimeMs) return cachedTeams.byTeamId;

  const csvText = await fs.readFile(TEAMS_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error(`teams.csv is empty: ${TEAMS_CSV_PATH}`);

  const header = splitCsvLine(lines[0]).map((h) => h.trim().toUpperCase());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cells: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cells[i] ?? "").trim();
  }

  const byTeamId = new Map<string, TeamEra[]>();
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const team = cell(cells, "TEAM");
    const city = cell(cells, "CITY");
    const nickname = cell(cells, "NICKNAME");
    const first = parseNumber(cell(cells, "FIRST"));
    const last = parseNumber(cell(cells, "LAST"));
    if (!team || !city || !nickname) continue;
    const era: TeamEra = {
      first: Number.isFinite(first) && first > 0 ? Math.floor(first) : 0,
      last: Number.isFinite(last) && last > 0 ? Math.floor(last) : 9999,
      name: `${city} ${nickname}`,
    };
    const list = byTeamId.get(team) ?? [];
    list.push(era);
    byTeamId.set(team, list);
  }

  // Deterministic order: newest eras first (higher `first` wins).
  for (const [team, eras] of byTeamId.entries()) {
    eras.sort((a, b) => b.first - a.first);
    byTeamId.set(team, eras);
  }

  cachedTeams = { mtimeMs: stat.mtimeMs, byTeamId };
  return byTeamId;
}

function resolveTeamName(byTeamId: Map<string, TeamEra[]>, teamId: string, year: number): string | null {
  const eras = byTeamId.get(teamId);
  if (!eras) return null;
  for (const era of eras) {
    if (year >= era.first && year <= era.last) return era.name;
  }
  // Fallback: pick the newest known era name.
  return eras.length ? eras[0].name : null;
}

async function loadBioHands(): Promise<
  Map<string, { bats: Handedness | null; throws: "L" | "R" | null }>
> {
  const stat = await fs.stat(BIOFILE_CSV_PATH);
  if (cachedBio && cachedBio.mtimeMs === stat.mtimeMs) return cachedBio.byPlayerId;

  const csvText = await fs.readFile(BIOFILE_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error(`biofile.csv is empty: ${BIOFILE_CSV_PATH}`);

  const header = splitCsvLine(lines[0]).map((h) => h.trim().toUpperCase());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cells: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cells[i] ?? "").trim();
  }

  const byPlayerId = new Map<string, { bats: Handedness | null; throws: "L" | "R" | null }>();
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const playerId = cell(cells, "PLAYERID").replace(/^"|"$/g, "");
    if (!playerId) continue;
    const bats = normalizeHandedness(cell(cells, "BATS").replace(/^"|"$/g, ""));
    const throwsRaw = cell(cells, "THROWS").replace(/^"|"$/g, "").toUpperCase();
    const throws = throwsRaw === "L" || throwsRaw === "R" ? throwsRaw : null;
    if (!byPlayerId.has(playerId)) byPlayerId.set(playerId, { bats, throws });
  }

  cachedBio = { mtimeMs: stat.mtimeMs, byPlayerId };
  return byPlayerId;
}

async function loadPitcherFeatures(): Promise<Map<string, { hrAllowedRateLast50: number; cumHrAllowed: number }>> {
  const stat = await fs.stat(PITCHER_FEATURES_CSV_PATH);
  if (cachedPitcherFeatures && cachedPitcherFeatures.mtimeMs === stat.mtimeMs) return cachedPitcherFeatures.byKey;

  const csvText = await fs.readFile(PITCHER_FEATURES_CSV_PATH, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error(`pitcher_daily_features.csv is empty: ${PITCHER_FEATURES_CSV_PATH}`);

  const header = splitCsvLine(lines[0]).map((h) => h.trim());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cells: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cells[i] ?? "").trim();
  }

  const byKey = new Map<string, { hrAllowedRateLast50: number; cumHrAllowed: number }>();
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const pitcherId = cell(cells, "pitcher_id");
    const date = cell(cells, "date");
    if (!pitcherId || !date) continue;
    const key = `${pitcherId}|${date}`;
    byKey.set(key, {
      hrAllowedRateLast50: parseNumber(cell(cells, "hr_allowed_rate_last_50")),
      cumHrAllowed: parseNumber(cell(cells, "cum_hr_allowed")),
    });
  }

  cachedPitcherFeatures = { mtimeMs: stat.mtimeMs, byKey };
  return byKey;
}

async function loadBattingTeamsForYear(year: number): Promise<Map<string, { teamId: string; oppId: string }>> {
  const battingPath = path.join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}batting.csv`);
  const gameinfoPath = path.join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}gameinfo.csv`);

  const stat = await fs.stat(battingPath);
  const cachedYear = cachedBattingTeamsByYear.get(year);
  if (cachedYear && cachedYear.mtimeMs === stat.mtimeMs) return cachedYear.map;

  const starttimeByGid = new Map<string, number>();
  try {
    const gameinfoText = await fs.readFile(gameinfoPath, "utf8");
    const gameinfoLines = gameinfoText.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter(Boolean);
    if (gameinfoLines.length >= 2) {
      const header = splitCsvLine(gameinfoLines[0]).map((h) => h.trim());
      const idx = new Map(header.map((h, i) => [h, i]));
      function cell(cells: string[], key: string): string {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
      }
      for (const line of gameinfoLines.slice(1)) {
        const cells = splitCsvLine(line);
        const gid = cell(cells, "gid");
        if (!gid) continue;
        const minutes = parseStarttimeMinutes(cell(cells, "starttime"));
        if (minutes === null) continue;
        const existing = starttimeByGid.get(gid);
        starttimeByGid.set(gid, existing === undefined ? minutes : Math.min(existing, minutes));
      }
    }
  } catch {
    // Optional: starttime is only a deterministic tie-breaker.
  }

  const csvText = await fs.readFile(battingPath, "utf8");
  const text = csvText.replace(/^\uFEFF/, "").trim();
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) throw new Error(`batting.csv is empty: ${battingPath}`);

  const header = splitCsvLine(lines[0]).map((h) => h.trim());
  const idx = new Map(header.map((h, i) => [h, i]));

  function cell(cells: string[], key: string): string {
    const i = idx.get(key);
    return i === undefined ? "" : (cells[i] ?? "").trim();
  }

  type Candidate = { startSort: number; gid: string; teamId: string; oppId: string };
  const bestByKey = new Map<string, Candidate>();

  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const gid = cell(cells, "gid");
    const playerId = cell(cells, "id");
    const teamId = cell(cells, "team");
    const oppId = cell(cells, "opp");
    const dateRaw = cell(cells, "date");
    const gametype = cell(cells, "gametype");
    const pa = Number.parseInt(cell(cells, "b_pa"), 10);

    if (!gid || !playerId || !teamId || !oppId || !dateRaw) continue;
    if (gametype && gametype !== "regular") continue;
    if (!Number.isFinite(pa) || pa <= 0) continue;

    const gameDate = parseIsoDate(dateRaw);
    const key = `${playerId}|${gameDate}`;
    const startSort = starttimeByGid.get(gid) ?? 10_000;
    const cand: Candidate = { startSort, gid, teamId, oppId };
    const existing = bestByKey.get(key);
    if (!existing) {
      bestByKey.set(key, cand);
      continue;
    }
    if (cand.startSort < existing.startSort) {
      bestByKey.set(key, cand);
      continue;
    }
    if (cand.startSort === existing.startSort && cand.gid < existing.gid) {
      bestByKey.set(key, cand);
    }
  }

  const out = new Map<string, { teamId: string; oppId: string }>();
  for (const [key, cand] of bestByKey.entries()) {
    out.set(key, { teamId: cand.teamId, oppId: cand.oppId });
  }

  cachedBattingTeamsByYear.set(year, { mtimeMs: stat.mtimeMs, map: out });
  return out;
}

async function loadBaselineRows(): Promise<{
  rows: PlayerGameBaselineRow[];
  dates: string[];
}> {
  const stat = await fs.stat(BASELINE_PUBLIC_CSV_PATH);
  if (cached && cached.mtimeMs === stat.mtimeMs) {
    return { rows: cached.rows, dates: cached.dates };
  }

  const csvText = await fs.readFile(BASELINE_PUBLIC_CSV_PATH, "utf8");
  const rows = parseBaselineCsv(csvText);
  const dates = Array.from(new Set(rows.map((r) => r.game_date))).sort();

  cached = { mtimeMs: stat.mtimeMs, rows, dates };
  return { rows, dates };
}

export async function getLatestBaselineDate(): Promise<string | null> {
  try {
    const { dates } = await loadBaselineRows();
    return dates.length ? dates[dates.length - 1] : null;
  } catch {
    return null;
  }
}

export async function fetchBaselineHrPicks(date: string): Promise<HrPicksBaselineResponse> {
  const { rows, dates } = await loadBaselineRows();
  const day = rows.filter((r) => r.game_date === date);
  if (!day.length) return { date, picks: [], availableDates: dates };

  const pickScoreScale = Number.isFinite(PICK_SCORE_SCALE) ? PICK_SCORE_SCALE : 200;
  const limit = Number.isFinite(PICKS_LIMIT) ? Math.max(1, Math.floor(PICKS_LIMIT)) : 25;

  const sorted = day
    .slice()
    .sort((a, b) => {
      if (b.baseline_hr_score !== a.baseline_hr_score)
        return b.baseline_hr_score - a.baseline_hr_score;
      if (b.hr_rate_last_50 !== a.hr_rate_last_50)
        return b.hr_rate_last_50 - a.hr_rate_last_50;
      return a.player_id.localeCompare(b.player_id);
    })
    .slice(0, limit);

  const years = new Set<number>();
  for (const r of sorted) {
    const y = Number.parseInt(r.game_date.slice(0, 4), 10);
    if (Number.isFinite(y)) years.add(y);
  }

  const [registry, parks, teams, bio, pitcherFeatures] = await Promise.all([
    loadRegistry(),
    loadBallparks(),
    loadTeams(),
    loadBioHands(),
    loadPitcherFeatures(),
  ]);

  const battingTeams = new Map<string, { teamId: string; oppId: string }>();
  await Promise.all(
    Array.from(years).map(async (year) => {
      try {
        const map = await loadBattingTeamsForYear(year);
        for (const [k, v] of map.entries()) battingTeams.set(k, v);
      } catch {
        // If batting logs are missing for this year, team_name will fall back to "Unknown team".
      }
    }),
  );

  const picks: CompareHRPick[] = sorted.map((row) => {
    const year = Number.parseInt(row.game_date.slice(0, 4), 10);
    const teamKey = `${row.player_id}|${row.game_date}`;
    const teamInfo = battingTeams.get(teamKey);

    const teamName = teamInfo
      ? resolveTeamName(teams, teamInfo.teamId, Number.isFinite(year) ? year : 0) ??
        "Unknown team"
      : "Unknown team";

    const parkName = parks.get(row.park_id) ?? "Unknown park";

    const opposingPitcherName = row.opposing_pitcher_id
      ? registry.get(row.opposing_pitcher_id) ?? null
      : null;

    const batterHand = bio.get(row.player_id)?.bats ?? "B";
    const pitcherHand = row.opposing_pitcher_id ? bio.get(row.opposing_pitcher_id)?.throws ?? null : null;

    const matchupAdvantage = resolveMatchupAdvantage(batterHand, pitcherHand);

    const pitcherKey = row.opposing_pitcher_id ? `${row.opposing_pitcher_id}|${row.game_date}` : "";
    const pitcherFeature = pitcherKey ? pitcherFeatures.get(pitcherKey) : undefined;

    const baselineScore = row.baseline_hr_score;
    const pickScore = Math.round(baselineScore * pickScoreScale);

    const pick: CompareHRPick = {
      player_id: row.player_id,
      player_name: row.player_name,
      team_name: teamName,
      game_date: row.game_date,
      park_id: row.park_id,
      park_name: parkName,
      pick_score: Number.isFinite(pickScore) ? pickScore : 0,
      baseline_score: Number.isFinite(baselineScore) ? baselineScore : 0,
      hr_rate_last_50: Number.isFinite(row.hr_rate_last_50) ? row.hr_rate_last_50 : 0,
      hr_rate_last_10: null,
      season_hr_rate: Number.isFinite(row.season_hr_rate) ? row.season_hr_rate : 0,
      season_hr_total: Number.isFinite(row.season_hr) ? Math.round(row.season_hr) : 0,
      opposing_pitcher_name: opposingPitcherName,
      opposing_pitcher_hand: pitcherHand,
      pitcher_hr_rate_allowed: Number.isFinite(row.pitcher_hr_allowed_rate_last_50)
        ? row.pitcher_hr_allowed_rate_last_50
        : null,
      pitcher_hr_total_allowed: pitcherFeature && Number.isFinite(pitcherFeature.cumHrAllowed)
        ? Math.round(pitcherFeature.cumHrAllowed)
        : null,
      batter_hand: batterHand,
      matchup_advantage: matchupAdvantage,
      park_hr_factor: Number.isFinite(row.park_hr_factor) ? row.park_hr_factor : 0,
      expected_pa: Number.isFinite(row.expected_pa) ? row.expected_pa : 0,
      score_breakdown: {
        base_hr_rate: Number.isFinite(row.hr_rate_last_50) ? row.hr_rate_last_50 : 0,
        park_factor: Number.isFinite(row.park_hr_factor) ? row.park_hr_factor : 0,
        pitcher_factor: null,
        expected_pa: Number.isFinite(row.expected_pa) ? row.expected_pa : 0,
      },
      top_reasons: [],
    };

    pick.top_reasons = buildTopReasons(pick);
    return pick;
  });

  // Deterministic ordering.
  picks.sort((a, b) => {
    if (b.baseline_score !== a.baseline_score) return b.baseline_score - a.baseline_score;
    if (b.hr_rate_last_50 !== a.hr_rate_last_50) return b.hr_rate_last_50 - a.hr_rate_last_50;
    return a.player_id.localeCompare(b.player_id);
  });

  return { date, picks, availableDates: dates };
}
