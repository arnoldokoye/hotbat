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
  season_games: number;
  avg_pa_per_game: number;
  pitcher_hr_allowed_rate_last_50: number;
  park_hr_factor: number;
  baseline_hr_score: number;
};

const BASELINE_PUBLIC_CSV_PATH = path.join(
  process.cwd(),
  "public",
  "data",
  "player_game_baseline.csv",
);

const ML_RANKINGS_ALL_PATH = path.join(
  process.cwd(),
  "scripts",
  "ml",
  "data",
  "player_game_hr_rankings_v1_all_seasons.csv",
);
const ML_RANKINGS_PATH = path.join(
  process.cwd(),
  "scripts",
  "ml",
  "data",
  "player_game_hr_rankings_v1.csv",
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

type MlRankingRow = {
  player_id: string;
  game_date: string;
  game_id: string;
  agg_hr_prob: number;
  max_pa_score: number;
  player_recent_hr_rate?: number | null;
  pitcher_recent_hr_allowed_rate?: number | null;
  park_hr_factor?: number | null;
  matchup_rate?: number | null;
  top_signal?: string | null;
};

let cachedMlRankings:
  | {
      mtimeMs: number;
      rows: MlRankingRow[];
      dates: string[];
      path: string;
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

function resolveConfidenceLabel(prob: number): string | null {
  if (!Number.isFinite(prob) || prob <= 0) return null;
  if (prob >= 0.22) return "Strong signal";
  if (prob >= 0.16) return "Moderate signal";
  return "Thin edge";
}

function resolveMovementNote(
  movement: { prevRank: number | null; currRank: number } | undefined,
  topSignal: string | null,
): string {
  if (!movement || movement.prevRank === null) return "New to today's rankings";
  if (movement.prevRank === movement.currRank) return "Holding steady since yesterday";
  const direction = movement.currRank < movement.prevRank ? "Moved up" : "Moved down";
  const reason =
    (topSignal === "player_form" && "recent HR rate increased") ||
    (topSignal === "pitcher_vulnerability" && "pitcher has been giving up more HRs") ||
    (topSignal === "park_boost" && "playing in a more HR-friendly park") ||
    (topSignal === "matchup" && "matchup looks more favorable") ||
    "signal mix shifted";
  return `${direction}: ${reason}`;
}

function resolveStabilityLabel(
  recentRanks: Array<number | null>,
): string | null {
  if (!recentRanks.length) return null;
  const present = recentRanks.filter((r): r is number => r !== null);
  if (present.length === 0) return null;
  if (present.length === 1) return "New today — first appearance in recent rankings";

  const min = Math.min(...present);
  const max = Math.max(...present);
  const range = max - min;

  // Simple heuristic: stable if tight range, rising if improving, volatile otherwise.
  if (range <= 3) {
    return "Stable pick — ranked near the top for several days";
  }
  const first = present[present.length - 1];
  const last = present[0];
  if (last < first - 2) {
    return "Rising pick — trending up based on recent form";
  }
  if (range >= 8) {
    return "Volatile pick — recent movement driven by matchup changes";
  }
  return "Stable pick";
}

function formatPitcherHandLabel(hand: "L" | "R" | null): string {
  if (hand === "L") return "LHP";
  if (hand === "R") return "RHP";
  return "pitcher";
}

function buildTopReasons(pick: CompareHRPick): string[] {
  const reasons: string[] = [];

  if (pick.matchup_advantage === "positive" && pick.opposing_pitcher_hand) {
    reasons.push(`Platoon edge (${pick.batter_hand} vs ${pick.opposing_pitcher_hand})`);
  } else if (pick.matchup_advantage === "negative" && pick.opposing_pitcher_hand) {
    reasons.push(`Tough matchup (${pick.batter_hand} vs ${pick.opposing_pitcher_hand})`);
  }

  if (pick.hr_rate_last_50 >= 0.1) {
    reasons.push(`Hot HR rate recently (${pick.hr_rate_last_50.toFixed(3)})`);
  } else if (pick.hr_rate_last_50 > 0) {
    reasons.push(`Recent HR rate (${pick.hr_rate_last_50.toFixed(3)})`);
  }

  if (pick.season_hr_total > 0 && reasons.length < 3) {
    reasons.push(`Season HRs: ${pick.season_hr_total}`);
  }

  if (pick.pitcher_hr_rate_allowed !== null && reasons.length < 3) {
    if (pick.pitcher_hr_rate_allowed >= 0.1) {
      reasons.push(
        `Pitcher has been giving up more home runs lately`,
      );
    } else if (pick.pitcher_hr_rate_allowed > 0) {
      reasons.push(
        `Pitcher has struggled keeping the ball in the park`,
      );
    }
  }

  if (pick.park_hr_factor > 1.05 && reasons.length < 3) {
    reasons.push(`HR-friendly park: ${pick.park_name}`);
  } else if (pick.park_hr_factor > 0 && pick.park_hr_factor < 0.95 && reasons.length < 3) {
    reasons.push(`HR-suppressing park: ${pick.park_name}`);
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
      season_games: parseNumber(getCell(cells, "season_games")),
      avg_pa_per_game: parseNumber(getCell(cells, "avg_pa_per_game")),
      pitcher_hr_allowed_rate_last_50: parseNumber(
        getCell(cells, "pitcher_hr_allowed_rate_last_50"),
      ),
      park_hr_factor: parseNumber(getCell(cells, "park_hr_factor")),
      baseline_hr_score: parseNumber(getCell(cells, "baseline_hr_score")),
    });
  }

  return rows;
}

function parseMlRankingsCsv(csvText: string): MlRankingRow[] {
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

  const rows: MlRankingRow[] = [];
  for (const line of lines.slice(1)) {
    const cells = splitCsvLine(line);
    const player_id = getCell(cells, "player_id");
    const game_date = getCell(cells, "game_date");
    if (!player_id || !game_date) continue;

    rows.push({
      player_id,
      game_date,
      game_id: getCell(cells, "game_id"),
      agg_hr_prob: parseNumber(getCell(cells, "agg_hr_prob")),
      max_pa_score: parseNumber(getCell(cells, "max_pa_score")),
      player_recent_hr_rate: parseNumber(getCell(cells, "player_recent_hr_rate")),
      pitcher_recent_hr_allowed_rate: parseNumber(getCell(cells, "pitcher_recent_hr_allowed_rate")),
      park_hr_factor: parseNumber(getCell(cells, "park_hr_factor")),
      matchup_rate: parseNumber(getCell(cells, "matchup_rate")),
      top_signal: getCell(cells, "top_signal") || null,
    });
  }

  return rows;
}

async function loadMlRankings(): Promise<{ rows: MlRankingRow[]; dates: string[] } | null> {
  const candidates = [ML_RANKINGS_ALL_PATH, ML_RANKINGS_PATH];
  let stat: { mtimeMs: number } | null = null;
  let chosen: string | null = null;

  for (const candidate of candidates) {
    try {
      stat = await fs.stat(candidate);
      chosen = candidate;
      break;
    } catch {
      // try next candidate
    }
  }

  if (!stat || !chosen) return null;

  if (cachedMlRankings && cachedMlRankings.mtimeMs === stat.mtimeMs && cachedMlRankings.path === chosen) {
    return { rows: cachedMlRankings.rows, dates: cachedMlRankings.dates };
  }

  const csvText = await fs.readFile(chosen, "utf8");
  const rows = parseMlRankingsCsv(csvText);
  const dates = Array.from(new Set(rows.map((r) => r.game_date))).sort();

  cachedMlRankings = { mtimeMs: stat.mtimeMs, rows, dates, path: chosen };
  return { rows, dates };
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
      season_pa: Number.isFinite(row.season_pa) ? row.season_pa : 0,
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
      expected_pa: Number.isFinite(row.avg_pa_per_game) ? row.avg_pa_per_game : 0,
      score_breakdown: {
        base_hr_rate: Number.isFinite(row.hr_rate_last_50) ? row.hr_rate_last_50 : 0,
        park_factor: Number.isFinite(row.park_hr_factor) ? row.park_hr_factor : 0,
        pitcher_factor: null,
        expected_pa: Number.isFinite(row.avg_pa_per_game) ? row.avg_pa_per_game : 0,
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

export async function fetchMlHrPicks(date: string): Promise<HrPicksBaselineResponse> {
  const ml = await loadMlRankings();
  if (!ml) return fetchBaselineHrPicks(date);

  const mlDay = ml.rows.filter((r) => r.game_date === date);
  if (!mlDay.length) return fetchBaselineHrPicks(date);

  const mlDates = ml.dates;
  const dateIndex = mlDates.indexOf(date);
  const lookbackDates = mlDates.slice(Math.max(0, dateIndex - 5), dateIndex);
  const rankHistoryByPlayer = new Map<string, Array<number | null>>();
  const prevRankByPlayer = new Map<string, number>();
  const buildRankMap = (targetDate: string) => {
    const rows = ml.rows.filter((r) => r.game_date === targetDate);
    const map = new Map<string, number>();
    rows.forEach((row, idx) => {
      if (!map.has(row.player_id)) map.set(row.player_id, idx + 1);
    });
    return map;
  };

  const rankMaps = lookbackDates.map((d) => ({ date: d, map: buildRankMap(d) }));
  rankMaps.forEach(({ date: _date, map }, idx) => {
    map.forEach((rank, playerId) => {
      const list = rankHistoryByPlayer.get(playerId) ?? new Array(lookbackDates.length).fill(null);
      list[idx] = rank;
      rankHistoryByPlayer.set(playerId, list);
    });
  });

  if (lookbackDates.length) {
    const latestMap = rankMaps[rankMaps.length - 1].map;
    latestMap.forEach((rank, playerId) => {
      prevRankByPlayer.set(playerId, rank);
    });
  }

  const { rows: baselineRows, dates: baselineDates } = await loadBaselineRows();
  const baselineDay = baselineRows.filter((r) => r.game_date === date);
  if (!baselineDay.length) return { date, picks: [], availableDates: baselineDates };

  const baselineByPlayer = new Map<string, PlayerGameBaselineRow>();
  baselineDay.forEach((row) => baselineByPlayer.set(row.player_id, row));

  const aggregated = new Map<
    string,
    {
      product: number;
      maxScore: number;
      explain?: MlRankingRow;
      movement?: { prevRank: number | null; currRank: number };
    }
  >();
  for (const row of mlDay) {
    if (!baselineByPlayer.has(row.player_id)) continue;
    const entry =
      aggregated.get(row.player_id) ??
      {
        product: 1.0,
        maxScore: 0,
        explain: undefined,
        movement: { prevRank: prevRankByPlayer.get(row.player_id) ?? null, currRank: 0 },
      };
    const prob = Number.isFinite(row.agg_hr_prob) ? row.agg_hr_prob : 0;
    entry.product *= 1 - prob;
    entry.maxScore = Math.max(entry.maxScore, row.max_pa_score);
    if (!entry.explain || row.agg_hr_prob > (entry.explain.agg_hr_prob ?? -1)) {
      entry.explain = row;
    }
    aggregated.set(row.player_id, entry);
  }

  if (!aggregated.size) return fetchBaselineHrPicks(date);

  const pickScoreScale = Number.isFinite(PICK_SCORE_SCALE) ? PICK_SCORE_SCALE : 200;
  const limit = Number.isFinite(PICKS_LIMIT) ? Math.max(1, Math.floor(PICKS_LIMIT)) : 25;

  const ranked = Array.from(aggregated.entries())
    .map(([player_id, entry]) => ({
      player_id,
      agg_hr_prob: 1 - entry.product,
      max_pa_score: entry.maxScore,
      explain: entry.explain ?? null,
      movement: entry.movement ?? { prevRank: null, currRank: 0 },
      recentRanks: rankHistoryByPlayer.get(player_id) ?? [],
    }))
    .sort((a, b) => {
      if (b.agg_hr_prob !== a.agg_hr_prob) return b.agg_hr_prob - a.agg_hr_prob;
      if (b.max_pa_score !== a.max_pa_score) return b.max_pa_score - a.max_pa_score;
      return a.player_id.localeCompare(b.player_id);
    })
    .slice(0, limit)
    .map((row, idx) => ({
      ...row,
      movement: { ...row.movement, currRank: idx + 1 },
      recentRanks: [...(row.recentRanks ?? []), row.movement?.currRank ?? idx + 1],
    }));

  const years = new Set<number>();
  for (const r of baselineDay) {
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

  const picks: CompareHRPick[] = ranked
    .map((rankedRow) => {
      const row = baselineByPlayer.get(rankedRow.player_id);
      if (!row) return null;
      const explain = rankedRow.explain;
      const movement = rankedRow.movement;
      const stabilityLabel = resolveStabilityLabel(rankedRow.recentRanks);

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
      const pickScore = Math.round(rankedRow.agg_hr_prob * pickScoreScale);
      const confidenceLabel = resolveConfidenceLabel(rankedRow.agg_hr_prob);

      const topSignal = explain?.top_signal ?? null;

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
        season_pa: Number.isFinite(row.season_pa) ? row.season_pa : 0,
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
        expected_pa: Number.isFinite(row.avg_pa_per_game) ? row.avg_pa_per_game : 0,
        score_breakdown: {
          base_hr_rate: Number.isFinite(row.hr_rate_last_50) ? row.hr_rate_last_50 : 0,
          park_factor: Number.isFinite(row.park_hr_factor) ? row.park_hr_factor : 0,
          pitcher_factor: null,
          expected_pa: Number.isFinite(row.avg_pa_per_game) ? row.avg_pa_per_game : 0,
        },
        top_reasons: [],
        confidence_label: confidenceLabel,
        top_signal: topSignal,
        player_recent_hr_rate:
          explain && Number.isFinite(explain.player_recent_hr_rate)
            ? explain.player_recent_hr_rate
            : null,
        pitcher_recent_hr_allowed_rate:
          explain && Number.isFinite(explain.pitcher_recent_hr_allowed_rate)
            ? explain.pitcher_recent_hr_allowed_rate
            : null,
        matchup_rate:
          explain && Number.isFinite(explain.matchup_rate) ? explain.matchup_rate : null,
        movement_note: null,
        today_edge_note: null,
        stability_label: stabilityLabel,
      };

      pick.top_reasons = buildTopReasons(pick);
      pick.movement_note = resolveMovementNote(movement, topSignal);
      return pick;
    })
    .filter((pick): pick is CompareHRPick => Boolean(pick));

  if (picks.length) {
    const top = picks[0];
    const handLabel = formatPitcherHandLabel(top.opposing_pitcher_hand);
    top.today_edge_note = `Today's strongest HR edge: ${top.player_name} vs ${handLabel} at ${top.park_name}`;
  }
  return { date, picks, availableDates: baselineDates };
}
