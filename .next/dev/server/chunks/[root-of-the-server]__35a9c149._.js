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
"[project]/src/lib/csv/ballparks.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "loadBallparks",
    ()=>loadBallparks
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
const GAMELOGS_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 GAMELOGS");
const BALLPARKS_CSV_PATH = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(GAMELOGS_DIR, "ballparks.csv");
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
async function loadBallparks() {
    const stat = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].stat(BALLPARKS_CSV_PATH);
    if (cache && cache.mtimeMs === stat.mtimeMs) return cache.byParkId;
    const csvText = await __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(BALLPARKS_CSV_PATH, "utf8");
    const text = csvText.replace(/^\uFEFF/, "").trim();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) throw new Error(`ballparks.csv is empty: ${BALLPARKS_CSV_PATH}`);
    const header = splitCsvLine(lines[0]).map((h)=>h.trim().toUpperCase());
    const idx = new Map(header.map((h, i)=>[
            h,
            i
        ]));
    function cell(cols, key) {
        const i = idx.get(key);
        return i === undefined ? "" : (cols[i] ?? "").trim();
    }
    const byParkId = new Map();
    for (const line of lines.slice(1)){
        const cols = splitCsvLine(line);
        const parkId = cell(cols, "PARKID");
        const name = cell(cols, "NAME");
        if (!parkId || !name) continue;
        if (!byParkId.has(parkId)) byParkId.set(parkId, name);
    }
    cache = {
        mtimeMs: stat.mtimeMs,
        byParkId
    };
    return byParkId;
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
"[project]/src/app/api/today-games/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$ballparks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/csv/ballparks.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$teams$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/csv/teams.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$playerRegistry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/csv/playerRegistry.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
const DAILY_LOGS_DIR = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");
const parseDate = (value)=>{
    if (!value) return null;
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
};
const toYyyymmdd = (iso)=>iso.replaceAll("-", "");
const formatStartTimeLocal = (raw)=>{
    const v = (raw ?? "").trim();
    const m = /^(\d{1,2}:\d{2})(AM|PM)$/i.exec(v);
    if (m) return `${m[1]} ${m[2].toUpperCase()}`;
    return v || "TBD";
};
const logoPath = (abbrev)=>{
    return abbrev ? `/team-logos/${abbrev.toLowerCase()}.svg` : "/team-logos/default.svg";
};
const logoFromRetrosheetTeam = (teamId)=>{
    const id = teamId.trim().toUpperCase();
    // Minimal mapping for the currently-shipped logo set; everything else falls back safely.
    if (id === "NYA") return logoPath("nyy");
    if (id === "BOS") return logoPath("bos");
    return logoPath(null);
};
const safeNumber = (value, fallback = 0)=>{
    const n = typeof value === "number" ? value : Number.NaN;
    return Number.isFinite(n) ? n : fallback;
};
const computeHrPer9 = (hr, ipOuts)=>{
    if (ipOuts <= 0) return 0;
    const innings = ipOuts / 3;
    return hr * 9 / innings;
};
const computeEra = (er, ipOuts)=>{
    if (ipOuts <= 0) return 0;
    const innings = ipOuts / 3;
    return er * 9 / innings;
};
async function loadTodayGamesFromCsv(dateIso) {
    const year = Number.parseInt(dateIso.slice(0, 4), 10);
    if (!Number.isFinite(year)) return {
        date: dateIso,
        games: []
    };
    const yyyymmdd = toYyyymmdd(dateIso);
    const gameinfoPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}gameinfo.csv`);
    const pitchingPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}pitching.csv`);
    const [gameinfoText, pitchingText, teams, parks, playerRegistry] = await Promise.all([
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(gameinfoPath, "utf8"),
        __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["default"].readFile(pitchingPath, "utf8"),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$teams$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadTeams"])().catch(()=>[]),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$ballparks$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadBallparks"])().catch(()=>new Map()),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$csv$2f$playerRegistry$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadPlayerRegistry"])().catch(()=>[])
    ]);
    const teamNameById = new Map(teams.map((t)=>[
            t.team_id,
            t.team_name
        ]));
    const playerById = new Map(playerRegistry.map((p)=>[
            p.player_id,
            {
                name: p.player_name,
                throws: p.throws
            }
        ]));
    const parseCsv = (text)=>text.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter(Boolean);
    const gameinfoLines = parseCsv(gameinfoText);
    if (gameinfoLines.length < 2) return {
        date: dateIso,
        games: []
    };
    const gameinfoHeader = gameinfoLines[0].split(",");
    const giIdx = new Map(gameinfoHeader.map((h, i)=>[
            h.trim(),
            i
        ]));
    const gi = (cols, key)=>{
        const i = giIdx.get(key);
        return i === undefined ? "" : (cols[i] ?? "").trim();
    };
    const games = [];
    for (const line of gameinfoLines.slice(1)){
        const cols = line.split(",");
        const date = gi(cols, "date");
        if (date !== yyyymmdd) continue;
        const gametype = gi(cols, "gametype");
        if (gametype && gametype !== "regular") continue;
        const gid = gi(cols, "gid");
        const visteam = gi(cols, "visteam");
        const hometeam = gi(cols, "hometeam");
        const site = gi(cols, "site");
        if (!gid || !visteam || !hometeam || !site) continue;
        games.push({
            gid,
            visteam,
            hometeam,
            site,
            starttime: gi(cols, "starttime"),
            date
        });
    }
    if (!games.length) return {
        date: dateIso,
        games: []
    };
    // Load starters (p_seq == 1) for the day.
    const pitchingLines = parseCsv(pitchingText);
    const pitchingHeader = pitchingLines[0].split(",");
    const pIdx = new Map(pitchingHeader.map((h, i)=>[
            h.trim(),
            i
        ]));
    const pc = (cols, key)=>{
        const i = pIdx.get(key);
        return i === undefined ? "" : (cols[i] ?? "").trim();
    };
    const startersByGid = new Map();
    for (const line of pitchingLines.slice(1)){
        const cols = line.split(",");
        if (pc(cols, "date") !== yyyymmdd) continue;
        if (pc(cols, "p_seq") !== "1") continue;
        const gid = pc(cols, "gid");
        const pitcherId = pc(cols, "id");
        const vishome = pc(cols, "vishome");
        if (!gid || !pitcherId || vishome !== "h" && vishome !== "v") continue;
        const ipOuts = Number.parseInt(pc(cols, "p_ipouts"), 10);
        const er = Number.parseInt(pc(cols, "p_er"), 10);
        const hr = Number.parseInt(pc(cols, "p_hr"), 10);
        const lineObj = {
            pitcherId,
            ipOuts: Number.isFinite(ipOuts) ? ipOuts : 0,
            er: Number.isFinite(er) ? er : 0,
            hr: Number.isFinite(hr) ? hr : 0
        };
        const entry = startersByGid.get(gid) ?? {};
        if (vishome === "h") entry.home = lineObj;
        if (vishome === "v") entry.away = lineObj;
        startersByGid.set(gid, entry);
    }
    // Deterministic ordering: start time ascending, tie-breaker gid.
    games.sort((a, b)=>{
        const at = formatStartTimeLocal(a.starttime);
        const bt = formatStartTimeLocal(b.starttime);
        if (at !== bt) return at.localeCompare(bt);
        return a.gid.localeCompare(b.gid);
    });
    const deriveRange = ()=>({
            min: 0,
            max: 1
        });
    const outputGames = games.map((g, idx)=>{
        const parkName = parks.get(g.site) ?? g.site;
        const awayTeamName = teamNameById.get(g.visteam) ?? g.visteam;
        const homeTeamName = teamNameById.get(g.hometeam) ?? g.hometeam;
        const starters = startersByGid.get(g.gid);
        const awayStarter = starters?.away;
        const homeStarter = starters?.home;
        const awayPitcherMeta = awayStarter ? playerById.get(awayStarter.pitcherId) : undefined;
        const homePitcherMeta = homeStarter ? playerById.get(homeStarter.pitcherId) : undefined;
        const awayThrows = awayPitcherMeta?.throws ?? "R";
        const homeThrows = homePitcherMeta?.throws ?? "R";
        const awayHrPer9 = awayStarter ? computeHrPer9(awayStarter.hr, awayStarter.ipOuts) : 0;
        const homeHrPer9 = homeStarter ? computeHrPer9(homeStarter.hr, homeStarter.ipOuts) : 0;
        const awayEra = awayStarter ? computeEra(awayStarter.er, awayStarter.ipOuts) : 0;
        const homeEra = homeStarter ? computeEra(homeStarter.er, homeStarter.ipOuts) : 0;
        const awayRange = deriveRange();
        const homeRange = deriveRange();
        return {
            id: idx + 1,
            date: dateIso,
            startTimeLocal: formatStartTimeLocal(g.starttime),
            homeTeamId: 0,
            awayTeamId: 0,
            homeTeamName,
            awayTeamName,
            homeTeamAbbrev: g.hometeam,
            awayTeamAbbrev: g.visteam,
            homeTeamLogoUrl: logoFromRetrosheetTeam(g.hometeam),
            awayTeamLogoUrl: logoFromRetrosheetTeam(g.visteam),
            parkName,
            parkHrFactor: 1.0,
            homePredictedHrMean: undefined,
            awayPredictedHrMean: undefined,
            hotbatScore: 0,
            homeTeam: homeTeamName,
            awayTeam: awayTeamName,
            homeProjectedHrMin: homeRange.min,
            homeProjectedHrMax: homeRange.max,
            awayProjectedHrMin: awayRange.min,
            awayProjectedHrMax: awayRange.max,
            homeStartingPitcher: {
                name: homePitcherMeta?.name ?? "TBD",
                teamName: homeTeamName,
                throws: homeThrows,
                hrPer9: safeNumber(homeHrPer9, 0),
                era: safeNumber(homeEra, 0)
            },
            awayStartingPitcher: {
                name: awayPitcherMeta?.name ?? "TBD",
                teamName: awayTeamName,
                throws: awayThrows,
                hrPer9: safeNumber(awayHrPer9, 0),
                era: safeNumber(awayEra, 0)
            }
        };
    });
    return {
        date: dateIso,
        games: outputGames
    };
}
async function loadTodayGamesFromDb(date, endOfDay, dateParam) {
    const games = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].game.findMany({
        where: {
            date: {
                gte: date,
                lt: endOfDay
            }
        },
        orderBy: {
            date: "asc"
        },
        include: {
            homeTeam: true,
            awayTeam: true,
            park: {
                include: {
                    parkHrFactors: {
                        orderBy: {
                            updatedAt: "desc"
                        },
                        take: 1
                    }
                }
            },
            gamePredictions: true
        }
    });
    const getPitcherFromSnapshot = (snapshot, key)=>{
        if (!snapshot || typeof snapshot !== "object") return undefined;
        const obj = snapshot;
        const raw = obj[key];
        if (!raw || typeof raw !== "object") return undefined;
        const pitcher = raw;
        const throws = pitcher.throws === "L" || pitcher.throws === "R" ? pitcher.throws : undefined;
        const name = typeof pitcher.name === "string" ? pitcher.name : undefined;
        const teamName = typeof pitcher.teamName === "string" ? pitcher.teamName : undefined;
        const hrPer9 = typeof pitcher.hrPer9 === "number" ? pitcher.hrPer9 : undefined;
        const era = typeof pitcher.era === "number" ? pitcher.era : undefined;
        if (!name && !throws && hrPer9 === undefined && era === undefined) return undefined;
        return {
            name,
            teamName,
            throws,
            hrPer9,
            era
        };
    };
    const response = {
        date: dateParam,
        games: games.map((game)=>{
            const homePrediction = game.gamePredictions.find((p)=>p.teamId === game.homeTeamId);
            const awayPrediction = game.gamePredictions.find((p)=>p.teamId === game.awayTeamId);
            const parkFactorEntry = game.park.parkHrFactors[0];
            const hotbatScore = game.gamePredictions.length > 0 ? game.gamePredictions.reduce((total, prediction)=>total + prediction.hotbatScore, 0) / game.gamePredictions.length : undefined;
            const deriveRange = (mean, std)=>{
                const m = mean ?? 0;
                const s = std ?? 0;
                const min = Math.max(0, Number((m - s).toFixed(1)));
                const max = Math.max(min, Number((m + s).toFixed(1)) || m || 1);
                return {
                    min,
                    max
                };
            };
            const homeRange = deriveRange(homePrediction?.predictedHrMean ?? undefined, homePrediction?.predictedHrStd ?? undefined);
            const awayRange = deriveRange(awayPrediction?.predictedHrMean ?? undefined, awayPrediction?.predictedHrStd ?? undefined);
            const defaultPitcher = {
                name: "TBD",
                teamName: "",
                throws: "R",
                hrPer9: 0,
                era: 0
            };
            const homePitcherSnapshot = getPitcherFromSnapshot(homePrediction?.featuresSnapshot, "home_starting_pitcher");
            const awayPitcherSnapshot = getPitcherFromSnapshot(awayPrediction?.featuresSnapshot, "away_starting_pitcher");
            return {
                id: game.id,
                date: dateParam,
                startTimeLocal: game.startTime?.toISOString(),
                homeTeamId: game.homeTeamId,
                awayTeamId: game.awayTeamId,
                homeTeamName: game.homeTeam.name,
                awayTeamName: game.awayTeam.name,
                homeTeamAbbrev: game.homeTeam.abbrev,
                awayTeamAbbrev: game.awayTeam.abbrev,
                homeTeamLogoUrl: logoPath(game.homeTeam.abbrev),
                awayTeamLogoUrl: logoPath(game.awayTeam.abbrev),
                parkName: game.park.name,
                parkHrFactor: parkFactorEntry?.hrFactor ?? game.park.defaultHrFactor ?? 1.0,
                homePredictedHrMean: homePrediction?.predictedHrMean ?? undefined,
                awayPredictedHrMean: awayPrediction?.predictedHrMean ?? undefined,
                hotbatScore: hotbatScore ?? 0,
                homeTeam: game.homeTeam.name,
                awayTeam: game.awayTeam.name,
                homeProjectedHrMin: homeRange.min,
                homeProjectedHrMax: homeRange.max,
                awayProjectedHrMin: awayRange.min,
                awayProjectedHrMax: awayRange.max,
                homeStartingPitcher: {
                    name: homePitcherSnapshot?.name ?? defaultPitcher.name,
                    teamName: homePitcherSnapshot?.teamName ?? game.homeTeam.name,
                    throws: homePitcherSnapshot?.throws ?? defaultPitcher.throws,
                    hrPer9: homePitcherSnapshot?.hrPer9 ?? defaultPitcher.hrPer9,
                    era: homePitcherSnapshot?.era ?? defaultPitcher.era
                },
                awayStartingPitcher: {
                    name: awayPitcherSnapshot?.name ?? defaultPitcher.name,
                    teamName: awayPitcherSnapshot?.teamName ?? game.awayTeam.name,
                    throws: awayPitcherSnapshot?.throws ?? defaultPitcher.throws,
                    hrPer9: awayPitcherSnapshot?.hrPer9 ?? defaultPitcher.hrPer9,
                    era: awayPitcherSnapshot?.era ?? defaultPitcher.era
                }
            };
        })
    };
    return response;
}
async function GET(req) {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date");
    const date = parseDate(dateParam);
    if (!dateParam || !date) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "date query param is required (YYYY-MM-DD)"
        }, {
            status: 400
        });
    }
    const endOfDay = new Date(date);
    endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
    const mode = (process.env.HOTBAT_BACKEND ?? "auto").toLowerCase();
    if (mode === "csv") {
        const csv = await loadTodayGamesFromCsv(dateParam);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(csv, {
            status: 200,
            headers: {
                "x-hotbat-source": "csv"
            }
        });
    }
    try {
        const db = await loadTodayGamesFromDb(date, endOfDay, dateParam);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(db, {
            status: 200,
            headers: {
                "x-hotbat-source": "db"
            }
        });
    } catch (error) {
        console.error("today-games handler error", error);
        if (mode === "auto") {
            try {
                const csv = await loadTodayGamesFromCsv(dateParam);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(csv, {
                    status: 200,
                    headers: {
                        "x-hotbat-source": "csv"
                    }
                });
            } catch (csvError) {
                console.error("today-games csv fallback error", csvError);
            }
        }
        const fallback = {
            date: dateParam,
            games: []
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(fallback, {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__35a9c149._.js.map