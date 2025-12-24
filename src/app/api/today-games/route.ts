import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

import prisma from "@/lib/prisma";
import { loadBallparks } from "@/lib/csv/ballparks";
import { loadTeams } from "@/lib/csv/teams";
import { loadPlayerRegistry } from "@/lib/csv/playerRegistry";

type TodayGamesResponse = {
  date: string;
  games: {
    id: number;
    date: string;
    startTimeLocal?: string;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamAbbrev: string;
    awayTeamAbbrev: string;
    homeTeamLogoUrl?: string;
    awayTeamLogoUrl?: string;
    parkName: string;
    parkHrFactor?: number;
    homePredictedHrMean?: number;
    awayPredictedHrMean?: number;
    hotbatScore?: number;
    // Additional fields for frontend compatibility
    homeTeam: string;
    awayTeam: string;
    homeProjectedHrMin: number;
    homeProjectedHrMax: number;
    awayProjectedHrMin: number;
    awayProjectedHrMax: number;
    homeStartingPitcher: {
      name: string;
      teamName: string;
      throws: "L" | "R";
      hrPer9: number;
      era: number;
    };
    awayStartingPitcher: {
      name: string;
      teamName: string;
      throws: "L" | "R";
      hrPer9: number;
      era: number;
    };
  }[];
};

const DAILY_LOGS_DIR = path.join(process.cwd(), "data_sources", "NEW_DATA_SETS", "2020-25 DAILY LOGS");

const parseDate = (value: string | null) => {
  if (!value) return null;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const toYyyymmdd = (iso: string) => iso.replaceAll("-", "");

const formatStartTimeLocal = (raw: string | null | undefined) => {
  const v = (raw ?? "").trim();
  const m = /^(\d{1,2}:\d{2})(AM|PM)$/i.exec(v);
  if (m) return `${m[1]} ${m[2].toUpperCase()}`;
  return v || "TBD";
};

const logoPath = (abbrev?: string | null) => {
  return abbrev
    ? `/team-logos/${abbrev.toLowerCase()}.svg`
    : "/team-logos/default.svg";
};

const logoFromRetrosheetTeam = (teamId: string) => {
  const id = teamId.trim().toUpperCase();
  // Minimal mapping for the currently-shipped logo set; everything else falls back safely.
  if (id === "NYA") return logoPath("nyy");
  if (id === "BOS") return logoPath("bos");
  return logoPath(null);
};

const safeNumber = (value: unknown, fallback = 0) => {
  const n = typeof value === "number" ? value : Number.NaN;
  return Number.isFinite(n) ? n : fallback;
};

const computeHrPer9 = (hr: number, ipOuts: number) => {
  if (ipOuts <= 0) return 0;
  const innings = ipOuts / 3;
  return (hr * 9) / innings;
};

const computeEra = (er: number, ipOuts: number) => {
  if (ipOuts <= 0) return 0;
  const innings = ipOuts / 3;
  return (er * 9) / innings;
};

type CsvGameRow = {
  gid: string;
  visteam: string;
  hometeam: string;
  site: string;
  starttime: string;
  date: string; // YYYYMMDD
};

type PitcherLine = {
  pitcherId: string;
  ipOuts: number;
  er: number;
  hr: number;
};

async function loadTodayGamesFromCsv(dateIso: string): Promise<TodayGamesResponse> {
  const year = Number.parseInt(dateIso.slice(0, 4), 10);
  if (!Number.isFinite(year)) return { date: dateIso, games: [] };

  const yyyymmdd = toYyyymmdd(dateIso);
  const gameinfoPath = path.join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}gameinfo.csv`);
  const pitchingPath = path.join(DAILY_LOGS_DIR, `${year}DAILY_LOGScsvs`, `${year}pitching.csv`);

  const [gameinfoText, pitchingText, teams, parks, playerRegistry] = await Promise.all([
    fs.readFile(gameinfoPath, "utf8"),
    fs.readFile(pitchingPath, "utf8"),
    loadTeams().catch(() => []),
    loadBallparks().catch(() => new Map<string, string>()),
    loadPlayerRegistry().catch(() => []),
  ]);

  const teamNameById = new Map(teams.map((t) => [t.team_id, t.team_name] as const));
  const playerById = new Map(
    playerRegistry.map((p) => [p.player_id, { name: p.player_name, throws: p.throws }] as const),
  );

  const parseCsv = (text: string) => text.replace(/^\uFEFF/, "").trim().split(/\r?\n/).filter(Boolean);

  const gameinfoLines = parseCsv(gameinfoText);
  if (gameinfoLines.length < 2) return { date: dateIso, games: [] };
  const gameinfoHeader = gameinfoLines[0].split(",");
  const giIdx = new Map(gameinfoHeader.map((h, i) => [h.trim(), i]));
  const gi = (cols: string[], key: string) => {
    const i = giIdx.get(key);
    return i === undefined ? "" : (cols[i] ?? "").trim();
  };

  const games: CsvGameRow[] = [];
  for (const line of gameinfoLines.slice(1)) {
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
      date,
    });
  }

  if (!games.length) return { date: dateIso, games: [] };

  // Load starters (p_seq == 1) for the day.
  const pitchingLines = parseCsv(pitchingText);
  const pitchingHeader = pitchingLines[0].split(",");
  const pIdx = new Map(pitchingHeader.map((h, i) => [h.trim(), i]));
  const pc = (cols: string[], key: string) => {
    const i = pIdx.get(key);
    return i === undefined ? "" : (cols[i] ?? "").trim();
  };

  const startersByGid = new Map<
    string,
    { home?: PitcherLine; away?: PitcherLine }
  >();
  for (const line of pitchingLines.slice(1)) {
    const cols = line.split(",");
    if (pc(cols, "date") !== yyyymmdd) continue;
    if (pc(cols, "p_seq") !== "1") continue;
    const gid = pc(cols, "gid");
    const pitcherId = pc(cols, "id");
    const vishome = pc(cols, "vishome");
    if (!gid || !pitcherId || (vishome !== "h" && vishome !== "v")) continue;

    const ipOuts = Number.parseInt(pc(cols, "p_ipouts"), 10);
    const er = Number.parseInt(pc(cols, "p_er"), 10);
    const hr = Number.parseInt(pc(cols, "p_hr"), 10);
    const lineObj: PitcherLine = {
      pitcherId,
      ipOuts: Number.isFinite(ipOuts) ? ipOuts : 0,
      er: Number.isFinite(er) ? er : 0,
      hr: Number.isFinite(hr) ? hr : 0,
    };

    const entry = startersByGid.get(gid) ?? {};
    if (vishome === "h") entry.home = lineObj;
    if (vishome === "v") entry.away = lineObj;
    startersByGid.set(gid, entry);
  }

  // Deterministic ordering: start time ascending, tie-breaker gid.
  games.sort((a, b) => {
    const at = formatStartTimeLocal(a.starttime);
    const bt = formatStartTimeLocal(b.starttime);
    if (at !== bt) return at.localeCompare(bt);
    return a.gid.localeCompare(b.gid);
  });

  const deriveRange = () => ({ min: 0, max: 1 });

  const outputGames: TodayGamesResponse["games"] = games.map((g, idx) => {
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
        era: safeNumber(homeEra, 0),
      },
      awayStartingPitcher: {
        name: awayPitcherMeta?.name ?? "TBD",
        teamName: awayTeamName,
        throws: awayThrows,
        hrPer9: safeNumber(awayHrPer9, 0),
        era: safeNumber(awayEra, 0),
      },
    };
  });

  return { date: dateIso, games: outputGames };
}

async function loadTodayGamesFromDb(date: Date, endOfDay: Date, dateParam: string): Promise<TodayGamesResponse> {
  const games = await prisma.game.findMany({
    where: { date: { gte: date, lt: endOfDay } },
    orderBy: { date: "asc" },
    include: {
      homeTeam: true,
      awayTeam: true,
      park: {
        include: {
          parkHrFactors: {
            orderBy: { updatedAt: "desc" },
            take: 1,
          },
        },
      },
      gamePredictions: true,
    },
  });

  const getPitcherFromSnapshot = (
    snapshot: unknown,
    key: "home_starting_pitcher" | "away_starting_pitcher",
  ) => {
    if (!snapshot || typeof snapshot !== "object") return undefined;
    const obj = snapshot as Record<string, unknown>;
    const raw = obj[key];
    if (!raw || typeof raw !== "object") return undefined;
    const pitcher = raw as Record<string, unknown>;
    const throws = pitcher.throws === "L" || pitcher.throws === "R" ? pitcher.throws : undefined;
    const name = typeof pitcher.name === "string" ? pitcher.name : undefined;
    const teamName = typeof pitcher.teamName === "string" ? pitcher.teamName : undefined;
    const hrPer9 = typeof pitcher.hrPer9 === "number" ? pitcher.hrPer9 : undefined;
    const era = typeof pitcher.era === "number" ? pitcher.era : undefined;
    if (!name && !throws && hrPer9 === undefined && era === undefined) return undefined;
    return { name, teamName, throws, hrPer9, era };
  };

  const response: TodayGamesResponse = {
    date: dateParam,
    games: games.map((game) => {
      const homePrediction = game.gamePredictions.find(
        (p) => p.teamId === game.homeTeamId,
      );
      const awayPrediction = game.gamePredictions.find(
        (p) => p.teamId === game.awayTeamId,
      );
      const parkFactorEntry = game.park.parkHrFactors[0];
      const hotbatScore =
        game.gamePredictions.length > 0
          ? game.gamePredictions.reduce(
              (total, prediction) => total + prediction.hotbatScore,
              0,
            ) / game.gamePredictions.length
          : undefined;

      const deriveRange = (mean?: number, std?: number) => {
        const m = mean ?? 0;
        const s = std ?? 0;
        const min = Math.max(0, Number((m - s).toFixed(1)));
        const max = Math.max(min, Number((m + s).toFixed(1)) || m || 1);
        return { min, max };
      };

      const homeRange = deriveRange(
        homePrediction?.predictedHrMean ?? undefined,
        homePrediction?.predictedHrStd ?? undefined,
      );
      const awayRange = deriveRange(
        awayPrediction?.predictedHrMean ?? undefined,
        awayPrediction?.predictedHrStd ?? undefined,
      );

      const defaultPitcher = {
        name: "TBD",
        teamName: "",
        throws: "R" as const,
        hrPer9: 0,
        era: 0,
      };

      const homePitcherSnapshot = getPitcherFromSnapshot(
        homePrediction?.featuresSnapshot,
        "home_starting_pitcher",
      );
      const awayPitcherSnapshot = getPitcherFromSnapshot(
        awayPrediction?.featuresSnapshot,
        "away_starting_pitcher",
      );

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
        parkHrFactor:
          parkFactorEntry?.hrFactor ?? game.park.defaultHrFactor ?? 1.0,
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
          era: homePitcherSnapshot?.era ?? defaultPitcher.era,
        },
        awayStartingPitcher: {
          name: awayPitcherSnapshot?.name ?? defaultPitcher.name,
          teamName: awayPitcherSnapshot?.teamName ?? game.awayTeam.name,
          throws: awayPitcherSnapshot?.throws ?? defaultPitcher.throws,
          hrPer9: awayPitcherSnapshot?.hrPer9 ?? defaultPitcher.hrPer9,
          era: awayPitcherSnapshot?.era ?? defaultPitcher.era,
        },
      };
    }),
  };

  return response;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date");
  const date = parseDate(dateParam);

  if (!dateParam || !date) {
    return NextResponse.json(
      { error: "date query param is required (YYYY-MM-DD)" },
      { status: 400 },
    );
  }

  const endOfDay = new Date(date);
  endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);

  const mode = (process.env.HOTBAT_BACKEND ?? "auto").toLowerCase();

  if (mode === "csv") {
    const csv = await loadTodayGamesFromCsv(dateParam);
    return NextResponse.json(csv, { status: 200, headers: { "x-hotbat-source": "csv" } });
  }

  try {
    const db = await loadTodayGamesFromDb(date, endOfDay, dateParam);
    return NextResponse.json(db, { status: 200, headers: { "x-hotbat-source": "db" } });
  } catch (error) {
    console.error("today-games handler error", error);
    if (mode === "auto") {
      try {
        const csv = await loadTodayGamesFromCsv(dateParam);
        return NextResponse.json(csv, { status: 200, headers: { "x-hotbat-source": "csv" } });
      } catch (csvError) {
        console.error("today-games csv fallback error", csvError);
      }
    }
    const fallback: TodayGamesResponse = { date: dateParam, games: [] };
    return NextResponse.json(fallback, { status: 200, headers: { "x-hotbat-error": "1" } });
  }
}
