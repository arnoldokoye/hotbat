module.exports = [
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/lib/api/utils.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "simulateNetworkLatency",
    ()=>simulateNetworkLatency
]);
async function simulateNetworkLatency(min = 80, max = 200) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise((resolve)=>setTimeout(resolve, delay));
}
}),
"[project]/src/lib/api/fetchHrPicks.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchHrPicks",
    ()=>fetchHrPicks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/utils.ts [app-rsc] (ecmascript)");
;
function resolveBaseUrl(explicit) {
    if (explicit) return explicit;
    if (("TURBOPACK compile-time value", "undefined") !== "undefined" && window.location?.origin) //TURBOPACK unreachable
    ;
    const envHost = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL || process.env.NEXTAUTH_URL;
    if (envHost) {
        return envHost.startsWith("http") ? envHost : `https://${envHost}`;
    }
    const port = process.env.PORT || "3000";
    return `http://127.0.0.1:${port}`;
}
async function fetchHrPicks(date, baseUrl) {
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["simulateNetworkLatency"])();
    const url = new URL("/api/hr-picks", resolveBaseUrl(baseUrl));
    url.searchParams.set("date", date);
    const res = await fetch(url.toString(), {
        cache: "no-store"
    });
    if (!res.ok) {
        const isExpected = res.headers.get("x-hotbat-error") === "1" || res.status >= 500;
        const body = await res.json().catch(()=>null);
        const message = body?.error ?? `Failed to fetch HR picks: ${res.status}`;
        if (isExpected) {
            return {
                date,
                picks: []
            };
        }
        throw new Error(message);
    }
    return await res.json();
}
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/src/lib/baseline/fetchBaselineHrPicks.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchBaselineHrPicks",
    ()=>fetchBaselineHrPicks,
    "getLatestBaselineDate",
    ()=>getLatestBaselineDate
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const BASELINE_PUBLIC_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "data", "player_game_baseline.csv");
const PLAYER_REGISTRY_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "scripts", "ml", "data", "player_registry.csv");
const PITCHER_FEATURES_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "scripts", "ml", "data", "features_v1", "pitcher_daily_features.csv");
const GAMELOGS_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 GAMELOGS");
const BALLPARKS_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(GAMELOGS_DIR, "ballparks.csv");
const TEAMS_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(GAMELOGS_DIR, "teams.csv");
const BIOFILE_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(GAMELOGS_DIR, "biofile (1)", "biofile.csv");
const DAILY_LOGS_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");
const PICK_SCORE_SCALE = Number(process.env.HOTBAT_PICK_SCORE_SCALE ?? "200");
const PICKS_LIMIT = Number(process.env.HOTBAT_HR_PICKS_LIMIT ?? "25");
let cached = null;
let cachedRegistry = null;
let cachedBallparks = null;
let cachedTeams = null;
let cachedBio = null;
let cachedPitcherFeatures = null;
const cachedBattingTeamsByYear = new Map();
function parseNumber(value) {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
}
function splitCsvLine(line) {
    const out = [];
    let cur = "";
    let inQuotes = false;
    for(let i = 0; i < line.length; i += 1){
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
function parseIsoDate(value) {
    const v = value.trim();
    if (v.length === 10 && v[4] === "-" && v[7] === "-") return v;
    if (v.length === 8 && /^\d{8}$/.test(v)) return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
    return v;
}
function parseStarttimeMinutes(value) {
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
function normalizeHandedness(value) {
    const v = value.trim().toUpperCase();
    if (v === "L" || v === "R" || v === "B") return v;
    return null;
}
function resolveMatchupAdvantage(batterHand, pitcherHand) {
    if (!pitcherHand) return "neutral";
    if (batterHand === "B") return "neutral";
    return batterHand === pitcherHand ? "negative" : "positive";
}
function buildTopReasons(pick) {
    const reasons = [];
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
            reasons.push(`Pitcher HR allowed trend (${pick.pitcher_hr_rate_allowed.toFixed(3)})`);
        } else if (pick.pitcher_hr_rate_allowed > 0) {
            reasons.push(`Pitcher HR allowed (${pick.pitcher_hr_rate_allowed.toFixed(3)})`);
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
function parseBaselineCsv(csvText) {
    const text = csvText.replace(/^\uFEFF/, "").trim();
    if (!text) return [];
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];
    const header = splitCsvLine(lines[0]).map((h)=>h.trim());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function getCell(cells, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
    }
    const rows = [];
    for (const line of lines.slice(1)){
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
            pitcher_hr_allowed_rate_last_50: parseNumber(getCell(cells, "pitcher_hr_allowed_rate_last_50")),
            park_hr_factor: parseNumber(getCell(cells, "park_hr_factor")),
            expected_pa: parseNumber(getCell(cells, "expected_pa")),
            baseline_hr_score: parseNumber(getCell(cells, "baseline_hr_score"))
        });
    }
    return rows;
}
async function loadRegistry() {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(PLAYER_REGISTRY_CSV_PATH);
    if (cachedRegistry && cachedRegistry.mtimeMs === stat.mtimeMs) return cachedRegistry.byId;
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(PLAYER_REGISTRY_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error(`Player registry is empty: ${PLAYER_REGISTRY_CSV_PATH}`);
    const header = splitCsvLine(lines[0]).map((h)=>h.trim());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cells, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
    }
    const byId = new Map();
    for (const line of lines.slice(1)){
        const cells = splitCsvLine(line);
        const playerId = cell(cells, "player_id");
        const fullName = cell(cells, "full_name") || `${cell(cells, "first_name")} ${cell(cells, "last_name")}`.trim();
        if (!playerId || !fullName) continue;
        if (byId.has(playerId) && byId.get(playerId) !== fullName) {
            throw new Error(`Conflicting full_name for player_id=${playerId} in player_registry.csv`);
        }
        byId.set(playerId, fullName);
    }
    cachedRegistry = {
        mtimeMs: stat.mtimeMs,
        byId
    };
    return byId;
}
async function loadBallparks() {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(BALLPARKS_CSV_PATH);
    if (cachedBallparks && cachedBallparks.mtimeMs === stat.mtimeMs) return cachedBallparks.byParkId;
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(BALLPARKS_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error(`ballparks.csv is empty: ${BALLPARKS_CSV_PATH}`);
    const header = splitCsvLine(lines[0]).map((h)=>h.trim().toUpperCase());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cells, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
    }
    const byParkId = new Map();
    for (const line of lines.slice(1)){
        const cells = splitCsvLine(line);
        const parkId = cell(cells, "PARKID");
        const name = cell(cells, "NAME");
        if (!parkId || !name) continue;
        if (!byParkId.has(parkId)) byParkId.set(parkId, name);
    }
    cachedBallparks = {
        mtimeMs: stat.mtimeMs,
        byParkId
    };
    return byParkId;
}
async function loadTeams() {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(TEAMS_CSV_PATH);
    if (cachedTeams && cachedTeams.mtimeMs === stat.mtimeMs) return cachedTeams.byTeamId;
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(TEAMS_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error(`teams.csv is empty: ${TEAMS_CSV_PATH}`);
    const header = splitCsvLine(lines[0]).map((h)=>h.trim().toUpperCase());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cells, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
    }
    const byTeamId = new Map();
    for (const line of lines.slice(1)){
        const cells = splitCsvLine(line);
        const team = cell(cells, "TEAM");
        const city = cell(cells, "CITY");
        const nickname = cell(cells, "NICKNAME");
        const first = parseNumber(cell(cells, "FIRST"));
        const last = parseNumber(cell(cells, "LAST"));
        if (!team || !city || !nickname) continue;
        const era = {
            first: Number.isFinite(first) && first > 0 ? Math.floor(first) : 0,
            last: Number.isFinite(last) && last > 0 ? Math.floor(last) : 9999,
            name: `${city} ${nickname}`
        };
        const list = byTeamId.get(team) ?? [];
        list.push(era);
        byTeamId.set(team, list);
    }
    // Deterministic order: newest eras first (higher `first` wins).
    for (const [team, eras] of byTeamId.entries()){
        eras.sort((a, b)=>b.first - a.first);
        byTeamId.set(team, eras);
    }
    cachedTeams = {
        mtimeMs: stat.mtimeMs,
        byTeamId
    };
    return byTeamId;
}
function resolveTeamName(byTeamId, teamId, year) {
    const eras = byTeamId.get(teamId);
    if (!eras) return null;
    for (const era of eras){
        if (year >= era.first && year <= era.last) return era.name;
    }
    // Fallback: pick the newest known era name.
    return eras.length ? eras[0].name : null;
}
async function loadBioHands() {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(BIOFILE_CSV_PATH);
    if (cachedBio && cachedBio.mtimeMs === stat.mtimeMs) return cachedBio.byPlayerId;
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(BIOFILE_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error(`biofile.csv is empty: ${BIOFILE_CSV_PATH}`);
    const header = splitCsvLine(lines[0]).map((h)=>h.trim().toUpperCase());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cells, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
    }
    const byPlayerId = new Map();
    for (const line of lines.slice(1)){
        const cells = splitCsvLine(line);
        const playerId = cell(cells, "PLAYERID").replace(/^"|"$/g, "");
        if (!playerId) continue;
        const bats = normalizeHandedness(cell(cells, "BATS").replace(/^"|"$/g, ""));
        const throwsRaw = cell(cells, "THROWS").replace(/^"|"$/g, "").toUpperCase();
        const throws = throwsRaw === "L" || throwsRaw === "R" ? throwsRaw : null;
        if (!byPlayerId.has(playerId)) byPlayerId.set(playerId, {
            bats,
            throws
        });
    }
    cachedBio = {
        mtimeMs: stat.mtimeMs,
        byPlayerId
    };
    return byPlayerId;
}
async function loadPitcherFeatures() {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(PITCHER_FEATURES_CSV_PATH);
    if (cachedPitcherFeatures && cachedPitcherFeatures.mtimeMs === stat.mtimeMs) return cachedPitcherFeatures.byKey;
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(PITCHER_FEATURES_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error(`pitcher_daily_features.csv is empty: ${PITCHER_FEATURES_CSV_PATH}`);
    const header = splitCsvLine(lines[0]).map((h)=>h.trim());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cells, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
    }
    const byKey = new Map();
    for (const line of lines.slice(1)){
        const cells = splitCsvLine(line);
        const pitcherId = cell(cells, "pitcher_id");
        const date = cell(cells, "date");
        if (!pitcherId || !date) continue;
        const key = `${pitcherId}|${date}`;
        byKey.set(key, {
            hrAllowedRateLast50: parseNumber(cell(cells, "hr_allowed_rate_last_50")),
            cumHrAllowed: parseNumber(cell(cells, "cum_hr_allowed"))
        });
    }
    cachedPitcherFeatures = {
        mtimeMs: stat.mtimeMs,
        byKey
    };
    return byKey;
}
async function loadBattingTeamsForYear(year) {
    const battingPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}batting.csv`);
    const gameinfoPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}gameinfo.csv`);
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(battingPath);
    const cachedYear = cachedBattingTeamsByYear.get(year);
    if (cachedYear && cachedYear.mtimeMs === stat.mtimeMs) return cachedYear.map;
    const starttimeByGid = new Map();
    try {
        const gameinfoText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(gameinfoPath, "utf8");
        const gameinfoLines = gameinfoText.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter(Boolean);
        if (gameinfoLines.length >= 2) {
            const header = splitCsvLine(gameinfoLines[0]).map((h)=>h.trim());
            const idx = new Map(header.map((h, i)=>[
                    h,
                    i
                ]));
            function cell(cells, key) {
                const i = idx.get(key);
                return i === undefined ? "" : (cells[i] ?? "").trim();
            }
            for (const line of gameinfoLines.slice(1)){
                const cells = splitCsvLine(line);
                const gid = cell(cells, "gid");
                if (!gid) continue;
                const minutes = parseStarttimeMinutes(cell(cells, "starttime"));
                if (minutes === null) continue;
                const existing = starttimeByGid.get(gid);
                starttimeByGid.set(gid, existing === undefined ? minutes : Math.min(existing, minutes));
            }
        }
    } catch  {
    // Optional: starttime is only a deterministic tie-breaker.
    }
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(battingPath, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error(`batting.csv is empty: ${battingPath}`);
    const header = splitCsvLine(lines[0]).map((h)=>h.trim());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell1(cells, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cells[i] ?? "").trim();
    }
    const bestByKey = new Map();
    for (const line of lines.slice(1)){
        const cells = splitCsvLine(line);
        const gid = cell1(cells, "gid");
        const playerId = cell1(cells, "id");
        const teamId = cell1(cells, "team");
        const oppId = cell1(cells, "opp");
        const dateRaw = cell1(cells, "date");
        const gametype = cell1(cells, "gametype");
        const pa = Number.parseInt(cell1(cells, "b_pa"), 10);
        if (!gid || !playerId || !teamId || !oppId || !dateRaw) continue;
        if (gametype && gametype !== "regular") continue;
        if (!Number.isFinite(pa) || pa <= 0) continue;
        const gameDate = parseIsoDate(dateRaw);
        const key = `${playerId}|${gameDate}`;
        const startSort = starttimeByGid.get(gid) ?? 10_000;
        const cand = {
            startSort,
            gid,
            teamId,
            oppId
        };
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
    const out = new Map();
    for (const [key, cand] of bestByKey.entries()){
        out.set(key, {
            teamId: cand.teamId,
            oppId: cand.oppId
        });
    }
    cachedBattingTeamsByYear.set(year, {
        mtimeMs: stat.mtimeMs,
        map: out
    });
    return out;
}
async function loadBaselineRows() {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(BASELINE_PUBLIC_CSV_PATH);
    if (cached && cached.mtimeMs === stat.mtimeMs) {
        return {
            rows: cached.rows,
            dates: cached.dates
        };
    }
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(BASELINE_PUBLIC_CSV_PATH, "utf8");
    const rows = parseBaselineCsv(csvText);
    const dates = Array.from(new Set(rows.map((r)=>r.game_date))).sort();
    cached = {
        mtimeMs: stat.mtimeMs,
        rows,
        dates
    };
    return {
        rows,
        dates
    };
}
async function getLatestBaselineDate() {
    try {
        const { dates } = await loadBaselineRows();
        return dates.length ? dates[dates.length - 1] : null;
    } catch  {
        return null;
    }
}
async function fetchBaselineHrPicks(date) {
    const { rows, dates } = await loadBaselineRows();
    const day = rows.filter((r)=>r.game_date === date);
    if (!day.length) return {
        date,
        picks: [],
        availableDates: dates
    };
    const pickScoreScale = Number.isFinite(PICK_SCORE_SCALE) ? PICK_SCORE_SCALE : 200;
    const limit = Number.isFinite(PICKS_LIMIT) ? Math.max(1, Math.floor(PICKS_LIMIT)) : 25;
    const sorted = day.slice().sort((a, b)=>{
        if (b.baseline_hr_score !== a.baseline_hr_score) return b.baseline_hr_score - a.baseline_hr_score;
        if (b.hr_rate_last_50 !== a.hr_rate_last_50) return b.hr_rate_last_50 - a.hr_rate_last_50;
        return a.player_id.localeCompare(b.player_id);
    }).slice(0, limit);
    const years = new Set();
    for (const r of sorted){
        const y = Number.parseInt(r.game_date.slice(0, 4), 10);
        if (Number.isFinite(y)) years.add(y);
    }
    const [registry, parks, teams, bio, pitcherFeatures] = await Promise.all([
        loadRegistry(),
        loadBallparks(),
        loadTeams(),
        loadBioHands(),
        loadPitcherFeatures()
    ]);
    const battingTeams = new Map();
    await Promise.all(Array.from(years).map(async (year)=>{
        try {
            const map = await loadBattingTeamsForYear(year);
            for (const [k, v] of map.entries())battingTeams.set(k, v);
        } catch  {
        // If batting logs are missing for this year, team_name will fall back to "Unknown team".
        }
    }));
    const picks = sorted.map((row)=>{
        const year = Number.parseInt(row.game_date.slice(0, 4), 10);
        const teamKey = `${row.player_id}|${row.game_date}`;
        const teamInfo = battingTeams.get(teamKey);
        const teamName = teamInfo ? resolveTeamName(teams, teamInfo.teamId, Number.isFinite(year) ? year : 0) ?? "Unknown team" : "Unknown team";
        const parkName = parks.get(row.park_id) ?? "Unknown park";
        const opposingPitcherName = row.opposing_pitcher_id ? registry.get(row.opposing_pitcher_id) ?? null : null;
        const batterHand = bio.get(row.player_id)?.bats ?? normalizeHandedness("") ?? "R";
        const pitcherHand = row.opposing_pitcher_id ? bio.get(row.opposing_pitcher_id)?.throws ?? null : null;
        const matchupAdvantage = resolveMatchupAdvantage(batterHand, pitcherHand);
        const pitcherKey = row.opposing_pitcher_id ? `${row.opposing_pitcher_id}|${row.game_date}` : "";
        const pitcherFeature = pitcherKey ? pitcherFeatures.get(pitcherKey) : undefined;
        const baselineScore = row.baseline_hr_score;
        const pickScore = Math.round(baselineScore * pickScoreScale);
        const pick = {
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
            pitcher_hr_rate_allowed: Number.isFinite(row.pitcher_hr_allowed_rate_last_50) ? row.pitcher_hr_allowed_rate_last_50 : null,
            pitcher_hr_total_allowed: pitcherFeature && Number.isFinite(pitcherFeature.cumHrAllowed) ? Math.round(pitcherFeature.cumHrAllowed) : null,
            batter_hand: batterHand,
            matchup_advantage: matchupAdvantage,
            park_hr_factor: Number.isFinite(row.park_hr_factor) ? row.park_hr_factor : 0,
            expected_pa: Number.isFinite(row.expected_pa) ? row.expected_pa : 0,
            score_breakdown: {
                base_hr_rate: Number.isFinite(row.hr_rate_last_50) ? row.hr_rate_last_50 : 0,
                park_factor: Number.isFinite(row.park_hr_factor) ? row.park_hr_factor : 0,
                pitcher_factor: null,
                expected_pa: Number.isFinite(row.expected_pa) ? row.expected_pa : 0
            },
            top_reasons: []
        };
        pick.top_reasons = buildTopReasons(pick);
        return pick;
    });
    // Deterministic ordering.
    picks.sort((a, b)=>{
        if (b.baseline_score !== a.baseline_score) return b.baseline_score - a.baseline_score;
        if (b.hr_rate_last_50 !== a.hr_rate_last_50) return b.hr_rate_last_50 - a.hr_rate_last_50;
        return a.player_id.localeCompare(b.player_id);
    });
    return {
        date,
        picks,
        availableDates: dates
    };
}
}),
"[project]/src/features/hr-picks/HrPicksPage.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "HrPicksPage",
    ()=>HrPicksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HrPicksPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HrPicksPage() from the server but HrPicksPage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/features/hr-picks/HrPicksPage.tsx <module evaluation>", "HrPicksPage");
}),
"[project]/src/features/hr-picks/HrPicksPage.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

// This file is generated by next-core EcmascriptClientReferenceModule.
__turbopack_context__.s([
    "HrPicksPage",
    ()=>HrPicksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const HrPicksPage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call HrPicksPage() from the server but HrPicksPage is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/features/hr-picks/HrPicksPage.tsx", "HrPicksPage");
}),
"[project]/src/features/hr-picks/HrPicksPage.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$hr$2d$picks$2f$HrPicksPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/features/hr-picks/HrPicksPage.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$hr$2d$picks$2f$HrPicksPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/features/hr-picks/HrPicksPage.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$hr$2d$picks$2f$HrPicksPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/picks/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PicksPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$fetchHrPicks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/fetchHrPicks.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$baseline$2f$fetchBaselineHrPicks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/baseline/fetchBaselineHrPicks.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$hr$2d$picks$2f$HrPicksPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/features/hr-picks/HrPicksPage.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
async function fetchLatestDate(baseUrl) {
    const baselineLatest = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$baseline$2f$fetchBaselineHrPicks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getLatestBaselineDate"])();
    if (baselineLatest) return baselineLatest;
    try {
        const url = new URL("/api/slates/latest", baseUrl || "http://127.0.0.1:3000");
        const res = await fetch(url.toString(), {
            cache: "no-store"
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.latestDate ?? null;
    } catch  {
        return null;
    }
}
async function PicksPage({ searchParams }) {
    const params = searchParams && typeof searchParams.then === "function" ? await searchParams : searchParams ?? {};
    const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["headers"])();
    const host = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") ?? "http";
    const baseUrl = host ? `${protocol}://${host}` : undefined;
    const latestDate = await fetchLatestDate(baseUrl);
    const effectiveDate = params.date ?? latestDate ?? "";
    let picksData;
    try {
        if (effectiveDate) {
            // Prefer baseline CSV if present; fall back to DB-backed API if missing.
            picksData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$baseline$2f$fetchBaselineHrPicks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchBaselineHrPicks"])(effectiveDate).catch(()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$fetchHrPicks$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["fetchHrPicks"])(effectiveDate, baseUrl));
        } else {
            picksData = {
                date: "",
                picks: []
            };
        }
    } catch (error) {
        // Leave noisy logging to the server; keep client console clean for expected failures.
        console.warn("hr-picks page fetch warning", error);
        picksData = {
            date: effectiveDate,
            picks: []
        };
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$features$2f$hr$2d$picks$2f$HrPicksPage$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["HrPicksPage"], {
        initialData: picksData,
        latestDate: latestDate
    }, void 0, false, {
        fileName: "[project]/src/app/picks/page.tsx",
        lineNumber: 54,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/app/picks/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/picks/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__6e913b42._.js.map