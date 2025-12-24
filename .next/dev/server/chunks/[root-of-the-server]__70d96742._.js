module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/src/lib/csv/dailyLogs.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "discoverDailyLogsSeasons",
    ()=>discoverDailyLogsSeasons
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const DAILY_LOGS_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");
async function discoverDailyLogsSeasons() {
    try {
        const entries = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readdir(DAILY_LOGS_DIR, {
            withFileTypes: true
        });
        const seasons = entries.filter((e)=>e.isDirectory()).map((e)=>e.name.slice(0, 4)).filter((s)=>/^\d{4}$/.test(s)).map((s)=>Number.parseInt(s, 10)).filter((n)=>Number.isFinite(n)).sort((a, b)=>a - b);
        return Array.from(new Set(seasons));
    } catch  {
        return [];
    }
}
}),
"[project]/src/lib/csv/playerRegistry.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadPlayerRegistry",
    ()=>loadPlayerRegistry
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const PLAYER_REGISTRY_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "scripts", "ml", "data", "player_registry.csv");
const BIOFILE_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 GAMELOGS", "biofile (1)", "biofile.csv");
let cache = null;
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
function normalizeBats(value) {
    const v = value.trim().toUpperCase();
    if (v === "L" || v === "R" || v === "B") return v;
    return null;
}
function normalizeThrows(value) {
    const v = value.trim().toUpperCase();
    if (v === "L" || v === "R") return v;
    return null;
}
function parseYearFromMmDdYyyy(value) {
    const v = value.trim();
    const m = /^\d{2}\/\d{2}\/(\d{4})$/.exec(v);
    if (!m) return null;
    const year = Number.parseInt(m[1], 10);
    return Number.isFinite(year) ? year : null;
}
async function loadPlayerRegistryRows() {
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(PLAYER_REGISTRY_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    if (!text) return [];
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return [];
    const header = splitCsvLine(lines[0]).map((h)=>h.trim());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    const idIdx = idx.get("player_id");
    const firstIdx = idx.get("first_name");
    const lastIdx = idx.get("last_name");
    const nameIdx = idx.get("full_name");
    if (idIdx === undefined || nameIdx === undefined || firstIdx === undefined || lastIdx === undefined) {
        return [];
    }
    const rows = [];
    for (const line of lines.slice(1)){
        const cols = splitCsvLine(line);
        const player_id = (cols[idIdx] ?? "").trim();
        const first_name = (cols[firstIdx] ?? "").trim();
        const last_name = (cols[lastIdx] ?? "").trim();
        const player_name = (cols[nameIdx] ?? "").trim();
        if (!player_id || !player_name || !first_name || !last_name) continue;
        rows.push({
            player_id,
            player_name,
            first_name,
            last_name
        });
    }
    return rows;
}
async function loadBioHands() {
    const byId = new Map();
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(BIOFILE_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    if (!text) return byId;
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return byId;
    const header = splitCsvLine(lines[0]).map((h)=>h.trim().toUpperCase());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cols, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cols[i] ?? "").trim();
    }
    for (const line of lines.slice(1)){
        const cols = splitCsvLine(line);
        const playerId = cell(cols, "PLAYERID");
        if (!playerId) continue;
        if (byId.has(playerId)) continue;
        const bats = normalizeBats(cell(cols, "BATS"));
        const throws = normalizeThrows(cell(cols, "THROWS"));
        const first_season = parseYearFromMmDdYyyy(cell(cols, "PLAY.DEBUT"));
        const last_season = parseYearFromMmDdYyyy(cell(cols, "PLAY.LASTGAME"));
        byId.set(playerId, {
            bats,
            throws,
            first_season,
            last_season
        });
    }
    return byId;
}
async function loadPlayerRegistry() {
    const registryStat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(PLAYER_REGISTRY_CSV_PATH);
    let bioStat = null;
    try {
        bioStat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(BIOFILE_CSV_PATH);
    } catch  {
        bioStat = null;
    }
    if (cache && cache.registryMtimeMs === registryStat.mtimeMs && cache.bioMtimeMs === (bioStat ? bioStat.mtimeMs : null)) {
        return cache.players;
    }
    const registryRows = await loadPlayerRegistryRows();
    if (!registryRows.length) {
        cache = {
            registryMtimeMs: registryStat.mtimeMs,
            bioMtimeMs: bioStat?.mtimeMs ?? null,
            players: []
        };
        return [];
    }
    const bioById = bioStat ? await loadBioHands() : new Map();
    const players = registryRows.map((r)=>{
        const bio = bioById.get(r.player_id);
        return {
            player_id: r.player_id,
            player_name: r.player_name,
            first_name: r.first_name,
            last_name: r.last_name,
            bats: bio?.bats ?? null,
            throws: bio?.throws ?? null,
            first_season: bio?.first_season ?? null,
            last_season: bio?.last_season ?? null
        };
    });
    // Deterministic ordering.
    players.sort((a, b)=>{
        if (a.player_name !== b.player_name) return a.player_name.localeCompare(b.player_name);
        return a.player_id.localeCompare(b.player_id);
    });
    cache = {
        registryMtimeMs: registryStat.mtimeMs,
        bioMtimeMs: bioStat?.mtimeMs ?? null,
        players
    };
    return players;
}
}),
"[project]/src/lib/csv/teams.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadTeams",
    ()=>loadTeams
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const GAMELOGS_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 GAMELOGS");
const TEAMS_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(GAMELOGS_DIR, "teams.csv");
let cache = null;
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
function parseIntSafe(value) {
    const v = value.trim();
    if (!v) return null;
    const n = Number.parseInt(v, 10);
    return Number.isFinite(n) ? n : null;
}
async function loadTeams(options) {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(TEAMS_CSV_PATH);
    if (cache && cache.mtimeMs === stat.mtimeMs) return cache.teams;
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(TEAMS_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    if (!text) {
        cache = {
            mtimeMs: stat.mtimeMs,
            teams: []
        };
        return [];
    }
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) {
        cache = {
            mtimeMs: stat.mtimeMs,
            teams: []
        };
        return [];
    }
    const header = splitCsvLine(lines[0]).map((h)=>h.trim().toUpperCase());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cols, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cols[i] ?? "").trim();
    }
    const minSeason = options?.minSeason ?? 2020;
    const maxSeason = options?.maxSeason ?? 2025;
    const leagues = options?.leagues?.map((l)=>l.trim().toUpperCase()).filter(Boolean) ?? [
        "AL",
        "NL"
    ];
    const bestByTeam = new Map();
    for (const line of lines.slice(1)){
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
        const cand = {
            first,
            last,
            league: league || null,
            name
        };
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
    const teams = Array.from(bestByTeam.entries()).map(([team_id, cand])=>({
            team_id,
            team_name: cand.name,
            league: cand.league
        }));
    teams.sort((a, b)=>{
        if (a.team_name !== b.team_name) return a.team_name.localeCompare(b.team_name);
        return a.team_id.localeCompare(b.team_id);
    });
    cache = {
        mtimeMs: stat.mtimeMs,
        teams
    };
    return teams;
}
}),
"[project]/src/lib/backend/CsvBackend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CsvBackend",
    ()=>CsvBackend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$dailyLogs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/csv/dailyLogs.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$playerRegistry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/csv/playerRegistry.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$teams$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/csv/teams.ts [app-route] (ecmascript)");
;
;
;
class CsvBackend {
    async getPlayers() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$playerRegistry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadPlayerRegistry"])();
    }
    async getTeams() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$teams$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadTeams"])();
    }
    async getPlayerDashboard(_player_id, _season) {
        throw new Error("CsvBackend.getPlayerDashboard not implemented yet.");
    }
    async getTeamDashboard(_team_id, _season) {
        throw new Error("CsvBackend.getTeamDashboard not implemented yet.");
    }
    async getGamesByDate(_date) {
        throw new Error("CsvBackend.getGamesByDate not implemented yet.");
    }
    async getAvailableSeasons() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$dailyLogs$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["discoverDailyLogsSeasons"])();
    }
}
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[externals]/pg [external] (pg, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs [external] (fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is required to initialize Prisma");
}
// Ensure a single PrismaClient/Pool instance across hot reloads in dev.
const globalForPrisma = globalThis;
const defaultCaPath = process.env.NODE_EXTRA_CA_CERTS || __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), "prod-ca-2021.crt");
const caFileExists = ("TURBOPACK compile-time truthy", 1) ? __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].existsSync(defaultCaPath) : "TURBOPACK unreachable";
const caBuffer = caFileExists ? __TURBOPACK__imported__module__$5b$externals$5d2f$fs__$5b$external$5d$__$28$fs$2c$__cjs$29$__["default"].readFileSync(defaultCaPath) : undefined;
const allowInsecureEnv = process.env.DB_SSL_ALLOW_INSECURE === "1" || process.env.DB_SSL_ALLOW_INSECURE === "true" || process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0";
const connectionTimeoutMs = Number.parseInt(process.env.DB_CONNECTION_TIMEOUT_MS ?? "", 10) || 5000;
const buildPool = (rejectUnauthorized)=>{
    const ssl = {
        rejectUnauthorized
    };
    if (caBuffer) {
        ssl.ca = caBuffer;
    }
    return {
        pool: new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
            connectionString,
            ssl,
            connectionTimeoutMillis: connectionTimeoutMs
        }),
        usedInsecure: !rejectUnauthorized
    };
};
const isTlsError = (error)=>{
    if (!error || typeof error !== "object") return false;
    const code = error.code ?? "";
    const message = error.message ?? "";
    const tlsCodes = [
        "SELF_SIGNED_CERT_IN_CHAIN",
        "DEPTH_ZERO_SELF_SIGNED_CERT",
        "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
        "ERR_TLS_CERT_ALTNAME_INVALID",
        "UNABLE_TO_GET_ISSUER_CERT_LOCALLY"
    ];
    return tlsCodes.includes(code) || message.toLowerCase().includes("certificate");
};
const initPool = async ()=>{
    const primary = buildPool(!allowInsecureEnv);
    const warmupResult = await primary.pool.query("SELECT 1").then(()=>"ok").catch((error)=>{
        if (!allowInsecureEnv && isTlsError(error)) {
            return "tls-error";
        }
        console.warn("Database warm-up query failed; continuing with current SSL config.", error);
        return "failed";
    });
    if (warmupResult === "tls-error") {
        await primary.pool.end().catch(()=>{});
        console.warn("Database TLS verification failed; retrying with rejectUnauthorized=false. " + "Provide NODE_EXTRA_CA_CERTS with your trusted root to restore verification.");
        return buildPool(false);
    }
    return primary;
};
const { pool, usedInsecure } = globalForPrisma.pool && typeof globalForPrisma.__dbUsedInsecureSsl === "boolean" ? {
    pool: globalForPrisma.pool,
    usedInsecure: globalForPrisma.__dbUsedInsecureSsl
} : await initPool();
const adapter = globalForPrisma.adapter ?? new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaPg"](pool);
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    adapter,
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "warn",
        "error"
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) {
    globalForPrisma.pool = pool;
    globalForPrisma.adapter = adapter;
    globalForPrisma.prisma = prisma;
    globalForPrisma.__dbUsedInsecureSsl = usedInsecure;
}
const __TURBOPACK__default__export__ = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/lib/dataAvailability.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getAvailability",
    ()=>getAvailability,
    "getCsvDateIndex",
    ()=>getCsvDateIndex,
    "getDbSeasons",
    ()=>getDbSeasons
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const BASELINE_PUBLIC_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "public", "data", "player_game_baseline.csv");
let csvIndexCache = null;
let dbSeasonsCache = null;
function emptyCsvIndex() {
    return {
        dates: [],
        seasons: [],
        datesBySeason: {},
        minDate: "",
        maxDate: ""
    };
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
function isIsoDate(value) {
    const v = value.trim();
    return v.length === 10 && v[4] === "-" && v[7] === "-" && /^\d{4}-\d{2}-\d{2}$/.test(v);
}
async function getCsvDateIndex() {
    try {
        const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(BASELINE_PUBLIC_CSV_PATH);
        if (csvIndexCache && csvIndexCache.mtimeMs === stat.mtimeMs) return csvIndexCache.value;
        const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(BASELINE_PUBLIC_CSV_PATH, "utf8");
        const text = csvText.replace(/^\uFEFF/, "").trim();
        if (!text) return emptyCsvIndex();
        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) return emptyCsvIndex();
        const header = splitCsvLine(lines[0]).map((h)=>h.trim());
        const dateIdx = header.indexOf("game_date");
        if (dateIdx === -1) return emptyCsvIndex();
        const datesSet = new Set();
        for (const line of lines.slice(1)){
            const cols = splitCsvLine(line);
            const d = (cols[dateIdx] ?? "").trim();
            if (isIsoDate(d)) datesSet.add(d);
        }
        const dates = Array.from(datesSet).sort();
        if (!dates.length) return emptyCsvIndex();
        const datesBySeason = {};
        for (const d of dates){
            const year = Number.parseInt(d.slice(0, 4), 10);
            if (!Number.isFinite(year)) continue;
            (datesBySeason[year] ??= []).push(d);
        }
        const seasons = Object.keys(datesBySeason).map((s)=>Number.parseInt(s, 10)).filter((n)=>Number.isFinite(n)).sort((a, b)=>a - b);
        const value = {
            dates,
            seasons,
            datesBySeason,
            minDate: dates[0],
            maxDate: dates[dates.length - 1]
        };
        csvIndexCache = {
            mtimeMs: stat.mtimeMs,
            value
        };
        return value;
    } catch  {
        return emptyCsvIndex();
    }
}
async function getDbSeasons() {
    const databaseUrl = process.env.DATABASE_URL;
    const dbConfigured = Boolean(databaseUrl) && !databaseUrl?.includes("...");
    if (!dbConfigured) return [];
    // Cache for 60s to avoid hammering DB on every request/layout render.
    const now = Date.now();
    if (dbSeasonsCache && now - dbSeasonsCache.fetchedAtMs < 60_000) return dbSeasonsCache.value;
    try {
        const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].game.findMany({
            select: {
                season: true
            },
            distinct: [
                "season"
            ],
            orderBy: {
                season: "asc"
            }
        });
        const seasons = rows.map((r)=>r.season).filter((n)=>typeof n === "number" && Number.isFinite(n)).sort((a, b)=>a - b);
        dbSeasonsCache = {
            fetchedAtMs: now,
            value: seasons
        };
        return seasons;
    } catch  {
        dbSeasonsCache = {
            fetchedAtMs: now,
            value: []
        };
        return [];
    }
}
async function getAvailability() {
    const [csv, dbSeasons] = await Promise.all([
        getCsvDateIndex(),
        getDbSeasons()
    ]);
    return {
        csv: {
            seasons: csv.seasons,
            datesBySeason: csv.datesBySeason
        },
        db: {
            seasons: dbSeasons
        }
    };
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/backend/DbBackend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "DbBackend",
    ()=>DbBackend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dataAvailability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/dataAvailability.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dataAvailability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dataAvailability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
class DbBackend {
    async getPlayers() {
        throw new Error("DbBackend.getPlayers is not supported (Retrosheet IDs are not stored in the DB).");
    }
    async getTeams() {
        throw new Error("DbBackend.getTeams is not supported (Retrosheet IDs are not stored in the DB).");
    }
    async getPlayerDashboard(_player_id, _season) {
        throw new Error("DbBackend.getPlayerDashboard not implemented yet.");
    }
    async getTeamDashboard(_team_id, _season) {
        throw new Error("DbBackend.getTeamDashboard not implemented yet.");
    }
    async getGamesByDate(_date) {
        throw new Error("DbBackend.getGamesByDate not implemented yet.");
    }
    async getAvailableSeasons() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$dataAvailability$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getDbSeasons"])();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/backend/AutoBackend.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "AutoBackend",
    ()=>AutoBackend,
    "resolveBackendMode",
    ()=>resolveBackendMode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$CsvBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/backend/CsvBackend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/backend/DbBackend.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function preferCsv(csvFn, dbFn) {
    try {
        return await csvFn();
    } catch  {
        return dbFn();
    }
}
class AutoBackend {
    csv = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$CsvBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CsvBackend"]();
    db = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DbBackend"]();
    async getPlayers() {
        return preferCsv(()=>this.csv.getPlayers(), ()=>this.db.getPlayers());
    }
    async getTeams() {
        return preferCsv(()=>this.csv.getTeams(), ()=>this.db.getTeams());
    }
    async getPlayerDashboard(player_id, season) {
        return preferCsv(()=>this.csv.getPlayerDashboard(player_id, season), ()=>this.db.getPlayerDashboard(player_id, season));
    }
    async getTeamDashboard(team_id, season) {
        return preferCsv(()=>this.csv.getTeamDashboard(team_id, season), ()=>this.db.getTeamDashboard(team_id, season));
    }
    async getGamesByDate(date) {
        return preferCsv(()=>this.csv.getGamesByDate(date), ()=>this.db.getGamesByDate(date));
    }
    async getAvailableSeasons() {
        return preferCsv(()=>this.csv.getAvailableSeasons(), ()=>this.db.getAvailableSeasons());
    }
}
function resolveBackendMode(raw) {
    if (raw === "csv" || raw === "db" || raw === "auto") return raw;
    return "auto";
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/backend/index.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "getBackend",
    ()=>getBackend,
    "getBackendFromEnv",
    ()=>getBackendFromEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$CsvBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/backend/CsvBackend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/backend/DbBackend.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$AutoBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/backend/AutoBackend.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$AutoBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$AutoBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
function getBackend(mode) {
    if (mode === "csv") return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$CsvBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CsvBackend"]();
    if (mode === "db") return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$DbBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DbBackend"]();
    return new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$AutoBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AutoBackend"]();
}
function getBackendFromEnv() {
    const mode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$AutoBackend$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["resolveBackendMode"])(process.env.HOTBAT_BACKEND);
    return getBackend(mode);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/players/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/backend/index.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
async function GET() {
    try {
        const backend = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$backend$2f$index$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getBackendFromEnv"])();
        const players = await backend.getPlayers();
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(players, {
            status: 200
        });
    } catch (error) {
        console.error("/api/players error", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json([], {
            status: 200,
            headers: {
                "x-hotbat-error": "1"
            }
        });
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__70d96742._.js.map