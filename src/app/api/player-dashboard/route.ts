import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loadBallparks } from "@/lib/csv/ballparks";
import { loadDailyBatting } from "@/lib/csv/dailyBatting";
import { loadDailyPitchingStartersByGame } from "@/lib/csv/dailyPitching";
import { loadDailyPlays } from "@/lib/csv/dailyPlays";
import { loadDailyTeamStats } from "@/lib/csv/dailyTeamStats";
import { buildParkFactorMap } from "@/lib/csv/parkFactors";
import { loadPlayerRegistry } from "@/lib/csv/playerRegistry";
import { loadTeams } from "@/lib/csv/teams";

type PlayerDashboardResponse = {
  availableDates?: string[];
  availableMonths?: string[];
  effectiveDate?: string;
  parkProfile?: {
    parkName: string;
    hrAtPark: number;
    hrPerPaAtPark: number;
    parkHrFactor?: number | null;
  }[];
  baseline?: {
    hrProb?: number;
    expectedHr?: number;
    seasonHr?: number;
    seasonPa?: number;
    avgPaPerGame?: number;
    notes?: string;
  };
  playerInfo: {
    id: number;
    firstName: string;
    lastName: string;
    bats: string;
    position: string;
    team: {
      id: number;
      name: string;
      abbrev: string;
      league?: string;
      division?: string;
      logoUrl?: string;
    };
  };
  keyMetrics: {
    label: string;
    value: number | null;
  }[];
  splits: Record<
    string,
    {
      season: number;
      gamesPlayed: number;
      hr: number;
      pa?: number;
      xHr: number | null;
      hrPerPa: number | null;
      barrelRate: number | null;
      avgEv: number | null;
      iso: number | null;
      hardHitRate: number | null;
    }
  >;
  handednessSplits?: {
    vsLHP: { hr: number; pa: number; rate: number | null } | null;
    vsRHP: { hr: number; pa: number; rate: number | null } | null;
  };
  recentForm?: {
    last10PA: { hr: number; pa: number; rate: number | null } | null;
    last25PA: { hr: number; pa: number; rate: number | null } | null;
    last50PA: { hr: number; pa: number; rate: number | null } | null;
  };
  hrTimeSeries: {
    date: string;
    gameId: number;
    hr: number;
    xHr: number | null;
    avgEv: number | null;
    opponent: string;
    park: string;
  }[];
  recentGames: {
    gameId: number;
    date: string;
    opponent: string;
    park: string;
    hr: number;
    xHr: number | null;
    avgEv: number | null;
  }[];
  upcomingGames: unknown[];
};

const logoPath = (abbrev?: string | null) => {
  return abbrev
    ? `/team-logos/${abbrev.toLowerCase()}.svg`
    : "/team-logos/default.svg";
};

const logoFromRetrosheetTeam = (teamId: string) => {
  const id = teamId.trim().toUpperCase();
  if (id === "NYA") return logoPath("nyy");
  if (id === "BOS") return logoPath("bos");
  return logoPath(null);
};

function yyyymmddToIsoDate(value: string): string | null {
  const v = value.trim();
  if (!/^\d{8}$/.test(v)) return null;
  return `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}`;
}

function isoDateToTimestamp(value: string): string {
  return `${value}T00:00:00.000Z`;
}

function isIsoDateString(value: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim());
}

function hash32FNV1a(input: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

function safeDiv(numer: number, denom: number): number | null {
  if (!Number.isFinite(numer) || !Number.isFinite(denom) || denom <= 0) return null;
  return numer / denom;
}

type RecentFormWindow = { hr: number; pa: number; rate: number | null };
type RecentForm = {
  last10PA: RecentFormWindow | null;
  last25PA: RecentFormWindow | null;
  last50PA: RecentFormWindow | null;
};

function buildRecentForm(events: { hr: number }[]): RecentForm {
  const windowStats = (window: number): RecentFormWindow | null => {
    if (events.length < window) return null;
    const slice = events.slice(events.length - window);
    const hr = slice.reduce((sum, e) => sum + e.hr, 0);
    const pa = slice.length;
    const rate = safeDiv(hr, pa);
    return { hr, pa, rate };
  };

  return {
    last10PA: windowStats(10),
    last25PA: windowStats(25),
    last50PA: windowStats(50),
  };
}

async function loadPlayerDashboardFromCsv(args: {
  playerId: string;
  season: number;
  splitKey: string;
  date?: string;
}): Promise<PlayerDashboardResponse | null> {
  const { playerId, season, splitKey: _splitKey, date } = args;
  void _splitKey;

  const [battingRows, startersByGame, players, teams, parks, teamStats, paEvents] =
    await Promise.all([
    loadDailyBatting(season),
    loadDailyPitchingStartersByGame(season),
    loadPlayerRegistry(),
    loadTeams().catch(() => []),
    loadBallparks().catch(() => new Map<string, string>()),
    loadDailyTeamStats(season).catch(() => []),
    loadDailyPlays(season).catch(() => []),
  ]);

  const playerById = new Map(players.map((p) => [p.player_id, p] as const));
  const teamNameById = new Map(teams.map((t) => [t.team_id, t.team_name] as const));

  const playerMeta = playerById.get(playerId);
  if (!playerMeta) return null;

  const playerBatting = battingRows.filter((r) => r.player_id === playerId);

  type GameAgg = {
    gid: string;
    date: string; // ISO YYYY-MM-DD
    team: string;
    opp: string;
    vishome: "h" | "v" | "";
    site: string;
    pa: number;
    ab: number;
    hr: number;
    doubles: number;
    triples: number;
    rbi: number;
    bb: number;
    k: number;
    opposingStarterId: string | null;
    opposingStarterThrows: "L" | "R" | null;
  };

  const gameAggByGid = new Map<string, GameAgg>();

  for (const row of playerBatting) {
    const dateIso = yyyymmddToIsoDate(row.date);
    if (!dateIso) continue;

    const existing = gameAggByGid.get(row.gid);
    if (existing) {
      existing.pa += row.b_pa;
      existing.ab += row.b_ab;
      existing.hr += row.b_hr;
      existing.doubles += row.b_d;
      existing.triples += row.b_t;
      existing.rbi += row.b_rbi;
      existing.bb += row.b_w;
      existing.k += row.b_k;
      continue;
    }

    const starters = startersByGame.get(row.gid);
    const opposingStarterId =
      row.vishome === "h" ? starters?.away ?? null : row.vishome === "v" ? starters?.home ?? null : null;
    const opposingPitcher = opposingStarterId ? playerById.get(opposingStarterId) : undefined;
    const opposingStarterThrows =
      opposingPitcher?.throws === "L" || opposingPitcher?.throws === "R" ? opposingPitcher.throws : null;

    gameAggByGid.set(row.gid, {
      gid: row.gid,
      date: dateIso,
      team: row.team,
      opp: row.opp,
      vishome: row.vishome,
      site: row.site,
      pa: row.b_pa,
      ab: row.b_ab,
      hr: row.b_hr,
      doubles: row.b_d,
      triples: row.b_t,
      rbi: row.b_rbi,
      bb: row.b_w,
      k: row.b_k,
      opposingStarterId,
      opposingStarterThrows,
    });
  }

  const games: GameAgg[] = Array.from(gameAggByGid.values());

  // Deterministic ordering.
  games.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return a.gid.localeCompare(b.gid);
  });

  if (!games.length) return null;

  const availableDates = Array.from(new Set(games.map((g) => g.date))).sort();
  const availableMonths = Array.from(new Set(availableDates.map((d) => d.slice(0, 7)))).sort();

  let effectiveDate = availableDates.length ? availableDates[availableDates.length - 1] : null;
  const requestedDate = date?.trim() ?? "";
  if (requestedDate && isIsoDateString(requestedDate)) {
    if (availableDates.includes(requestedDate)) {
      effectiveDate = requestedDate;
    } else if (availableDates.length) {
      let matched: string | null = null;
      for (let i = availableDates.length - 1; i >= 0; i -= 1) {
        if (availableDates[i] <= requestedDate) {
          matched = availableDates[i];
          break;
        }
      }
      effectiveDate = matched ?? availableDates[0];
    }
  }

  const gamesForMetrics =
    effectiveDate !== null ? games.filter((g) => g.date <= effectiveDate) : games;

  const latestGame = gamesForMetrics.length ? gamesForMetrics[gamesForMetrics.length - 1] : null;
  const teamId = latestGame?.team ?? "";
  const teamName = teamNameById.get(teamId) ?? teamId;

  const firstName = playerMeta.first_name ?? playerMeta.player_name.split(" ")[0] ?? "";
  const lastName = playerMeta.last_name ?? playerMeta.player_name.split(" ").slice(1).join(" ") ?? "";
  const bats = playerMeta.bats ?? "R";

  const totals = gamesForMetrics.reduce(
    (acc, g) => {
      acc.hr += g.hr;
      acc.pa += g.pa;
      acc.ab += g.ab;
      acc.doubles += g.doubles;
      acc.triples += g.triples;
      return acc;
    },
    { hr: 0, pa: 0, ab: 0, doubles: 0, triples: 0 },
  );

  const hrPerPa = safeDiv(totals.hr, totals.pa);
  const iso = safeDiv(totals.doubles + 2 * totals.triples + 3 * totals.hr, totals.ab);

  const seasonHr = totals.hr;
  const seasonPa = totals.pa;
  const gamesPlayed = games.length;
  const avgPaPerGame = gamesPlayed > 0 ? seasonPa / gamesPlayed : 0;
  const hrProb = safeDiv(seasonHr, seasonPa) ?? 0;
  const expectedHr = hrProb * avgPaPerGame;

  const computeSplit = (filter: (g: GameAgg) => boolean, minPaForRate = 0) => {
    const subset = gamesForMetrics.filter(filter);
    const sum = subset.reduce(
      (acc, g) => {
        acc.hr += g.hr;
        acc.pa += g.pa;
        acc.ab += g.ab;
        acc.doubles += g.doubles;
        acc.triples += g.triples;
        return acc;
      },
      { hr: 0, pa: 0, ab: 0, doubles: 0, triples: 0 },
    );
    const gamesPlayed = subset.length;
    const hrPerPa = sum.pa >= minPaForRate ? safeDiv(sum.hr, sum.pa) : null;
    return {
      season,
      gamesPlayed,
      hr: sum.hr,
      pa: sum.pa,
      xHr: null as number | null,
      hrPerPa,
      barrelRate: null as number | null,
      avgEv: null as number | null,
      iso: safeDiv(sum.doubles + 2 * sum.triples + 3 * sum.hr, sum.ab),
      hardHitRate: null as number | null,
    };
  };

  const splits: PlayerDashboardResponse["splits"] = {
    overall: computeSplit(() => true),
    home: computeSplit((g) => g.vishome === "h"),
    away: computeSplit((g) => g.vishome === "v"),
    lhp: computeSplit((g) => g.opposingStarterThrows === "L", 30),
    rhp: computeSplit((g) => g.opposingStarterThrows === "R", 30),
  };

  // Monthly splits (YYYY-MM).
  for (const g of gamesForMetrics) {
    const monthKey = `month:${g.date.slice(0, 7)}`;
    if (!splits[monthKey]) {
      splits[monthKey] = computeSplit((x) => x.date.slice(0, 7) === g.date.slice(0, 7));
    }
  }

  const keyMetrics = [
    { label: "HR", value: seasonHr },
    { label: "xHR", value: null },
    { label: "HR/PA", value: hrPerPa },
    { label: "Barrel%", value: null },
    { label: "Avg EV", value: null },
    { label: "ISO", value: iso },
    { label: "HardHit%", value: null },
  ];

  const gamesDesc = [...gamesForMetrics].sort((a, b) => {
    if (a.date !== b.date) return b.date.localeCompare(a.date);
    return b.gid.localeCompare(a.gid);
  });

  const latest10 = gamesDesc.slice(0, 10);
  const hrTimeSeries = [...latest10]
    .reverse()
    .map((g) => ({
      date: isoDateToTimestamp(g.date),
      gameId: hash32FNV1a(g.gid),
      hr: g.hr,
      xHr: null,
      avgEv: null,
      opponent: teamNameById.get(g.opp) ?? g.opp ?? "Opponent",
      park: parks.get(g.site) ?? g.site ?? "Park",
    }));

  const recentGames = gamesDesc.slice(0, 5).map((g) => ({
    gameId: hash32FNV1a(g.gid),
    date: isoDateToTimestamp(g.date),
    opponent: teamNameById.get(g.opp) ?? g.opp ?? "Opponent",
    park: parks.get(g.site) ?? g.site ?? "Park",
    hr: g.hr,
    xHr: null,
    avgEv: null,
  }));

  const parkFactors = buildParkFactorMap(teamStats);
  const parkAgg = gamesForMetrics.reduce<Record<string, { hr: number; pa: number; site: string }>>(
    (acc, g) => {
      const key = g.site || "Unknown";
      acc[key] ??= { hr: 0, pa: 0, site: key };
      acc[key].hr += g.hr;
      acc[key].pa += g.pa;
      return acc;
    },
    {},
  );

  const parkProfile = Object.values(parkAgg).map((agg) => ({
    parkName: parks.get(agg.site) ?? agg.site ?? "Unknown Park",
    hrAtPark: agg.hr,
    hrPerPaAtPark: agg.pa > 0 ? agg.hr / agg.pa : 0,
    parkHrFactor: parkFactors.get(agg.site) ?? 1,
  }));

  const playerPaEvents = paEvents.filter(
    (e) => e.batter_id === playerId && (!effectiveDate || e.date <= effectiveDate),
  );
  const recentForm = buildRecentForm(playerPaEvents);

  const vsLhp = splits.lhp;
  const vsRhp = splits.rhp;
  const handednessSplits = {
    vsLHP:
      vsLhp.pa && vsLhp.pa >= 30
        ? { hr: vsLhp.hr, pa: vsLhp.pa, rate: vsLhp.hrPerPa }
        : null,
    vsRHP:
      vsRhp.pa && vsRhp.pa >= 30
        ? { hr: vsRhp.hr, pa: vsRhp.pa, rate: vsRhp.hrPerPa }
        : null,
  };

  return {
    availableDates,
    availableMonths,
    effectiveDate: effectiveDate ?? undefined,
    recentForm,
    handednessSplits,
    playerInfo: {
      id: 0,
      firstName,
      lastName,
      bats,
      position: "—",
      team: {
        id: 0,
        name: teamName,
        abbrev: teamId,
        league: "",
        division: "",
        logoUrl: logoFromRetrosheetTeam(teamId),
      },
    },
    keyMetrics,
    splits,
    hrTimeSeries,
    recentGames,
    upcomingGames: [],
    parkProfile,
    baseline: {
      hrProb,
      expectedHr,
      seasonHr,
      seasonPa,
      avgPaPerGame,
      notes:
        "Baseline: HR probability = season HR / season PA; Expected HR = HR probability × avg PA/G (player-specific).",
    },
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const playerIdParam = searchParams.get("playerId");
    const playerIdAlt = searchParams.get("player_id");
    const seasonParam = searchParams.get("season");
    const splitParam = searchParams.get("split") ?? "overall";
    const dateParam = searchParams.get("date") ?? undefined;

    const season = seasonParam ? Number(seasonParam) : 2024;
    const seasonValue = Number.isNaN(season) ? 2024 : season;

    const mode = (process.env.HOTBAT_BACKEND ?? "auto").toLowerCase();
    const rawPlayerId = (playerIdAlt ?? playerIdParam ?? "").trim();

    if (!rawPlayerId) {
      return NextResponse.json(
        { error: "playerId query param is required" },
        { status: 400 },
      );
    }

    const tryCsv = async () =>
      loadPlayerDashboardFromCsv({
        playerId: rawPlayerId,
        season: seasonValue,
        splitKey: splitParam,
        date: dateParam,
      });

    if (mode !== "db") {
      try {
        const csv = await tryCsv();
        if (csv) {
          console.info("player-dashboard backend=csv");
          return NextResponse.json(csv, {
            status: 200,
            headers: { "x-hotbat-source": "csv" },
          });
        }
      } catch (error) {
        console.warn("player-dashboard csv fallback", error);
      }
      if (mode === "csv") {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
      }
    }

    const playerId = Number(rawPlayerId);
    if (Number.isNaN(playerId)) {
      return NextResponse.json(
        { error: "playerId must be a valid integer when HOTBAT_BACKEND=db" },
        { status: 400 },
      );
    }

    const player = await prisma.player.findUnique({
      where: { id: playerId },
      include: { team: true },
    });
    if (!player) {
      return NextResponse.json({ error: "Player not found" }, { status: 404 });
    }

    const summary = await prisma.playerHrSummary.findFirst({
      where: { playerId, season: seasonValue, splitKey: splitParam },
      orderBy: { updatedAt: "desc" },
    });

    const summaries = await prisma.playerHrSummary.findMany({
      where: { playerId, season: seasonValue },
    });

    const stats = await prisma.playerGameStats.findMany({
      where: { playerId, season: seasonValue },
      orderBy: { date: "desc" },
      include: {
        game: { include: { homeTeam: true, awayTeam: true, park: true } },
      },
      take: 10,
    });

    const hrTimeSeries = [...stats]
      .reverse()
      .map((s) => ({
        date: s.date.toISOString(),
        gameId: s.gameId,
        hr: s.hr,
        xHr: s.xHr ?? null,
        avgEv: s.avgEv ?? null,
        opponent:
          s.game.homeTeamId === s.teamId
            ? s.game.awayTeam?.name ?? "Opponent"
            : s.game.homeTeam?.name ?? "Opponent",
        park: s.game.park.name,
      }));

    const recentGames = stats.slice(0, 5).map((s) => ({
      gameId: s.gameId,
      date: s.date.toISOString(),
      opponent:
        s.game.homeTeamId === s.teamId
          ? s.game.awayTeam?.name ?? "Opponent"
          : s.game.homeTeam?.name ?? "Opponent",
      park: s.game.park.name,
      hr: s.hr,
      xHr: s.xHr ?? null,
      avgEv: s.avgEv ?? null,
    }));

    const keyMetrics = [
      { label: "HR", value: summary?.hr ?? 0 },
      { label: "xHR", value: summary?.xHr ?? null },
      { label: "HR/PA", value: summary?.hrPerPa ?? null },
      { label: "Barrel%", value: summary?.barrelRate ?? null },
      { label: "Avg EV", value: summary?.avgEv ?? null },
      { label: "ISO", value: summary?.iso ?? null },
      { label: "HardHit%", value: summary?.hardHitRate ?? null },
    ];

    const splits: PlayerDashboardResponse["splits"] = {};
    const targetSummaries = summaries.length > 0 ? summaries : summary ? [summary] : [];
    for (const s of targetSummaries) {
      splits[s.splitKey] = {
        season: s.season,
        gamesPlayed: s.gamesPlayed,
        hr: s.hr,
        xHr: s.xHr ?? null,
        hrPerPa: s.hrPerPa ?? null,
        barrelRate: s.barrelRate ?? null,
        avgEv: s.avgEv ?? null,
        iso: s.iso ?? null,
        hardHitRate: s.hardHitRate ?? null,
      };
    }
    if (Object.keys(splits).length === 0) {
      splits[splitParam] = {
        season: seasonValue,
        gamesPlayed: 0,
        hr: 0,
        xHr: null,
        hrPerPa: null,
        barrelRate: null,
        avgEv: null,
        iso: null,
        hardHitRate: null,
      };
    }

    const parkAgg = stats.reduce<Record<string, { hr: number; pa: number; factor?: number | null }>>(
      (acc, stat) => {
        const parkName = stat.game.park.name ?? "Unknown Park";
        const hr = stat.hr ?? 0;
        const pa = stat.pa ?? 0;
        const factor = stat.game.park.defaultHrFactor ?? null;
        const current = acc[parkName] ?? { hr: 0, pa: 0, factor };
        acc[parkName] = {
          hr: current.hr + hr,
          pa: current.pa + pa,
          factor: current.factor ?? factor,
        };
        return acc;
      },
      {},
    );

    const parkProfile = Object.entries(parkAgg).map(([parkName, agg]) => ({
      parkName,
      hrAtPark: agg.hr,
      hrPerPaAtPark: agg.pa > 0 ? agg.hr / agg.pa : 0,
      parkHrFactor: agg.factor,
    }));

    const seasonHr = summary?.hr ?? 0;
    const seasonPa = summary?.pa ?? 0;
    const gamesPlayed = summary?.gamesPlayed ?? 0;
    const avgPaPerGame = gamesPlayed > 0 ? seasonPa / gamesPlayed : 0;
    const hrProb = seasonPa > 0 ? seasonHr / seasonPa : 0;
    const expectedHr = hrProb * avgPaPerGame;

    const response: PlayerDashboardResponse = {
      playerInfo: {
        id: player.id,
        firstName: player.firstName,
        lastName: player.lastName,
        bats: player.bats,
        position: player.position,
        team: {
          id: player.team.id,
          name: player.team.name,
          abbrev: player.team.abbrev,
          league: player.team.league,
          division: player.team.division,
          logoUrl: logoPath(player.team.abbrev),
        },
      },
      keyMetrics,
      splits,
      hrTimeSeries,
      recentGames,
      parkProfile,
      upcomingGames: [],
      baseline: {
        hrProb,
        expectedHr,
        seasonHr,
        seasonPa,
        avgPaPerGame,
        notes:
          "Baseline: HR probability = season HR / season PA; Expected HR = HR probability × avg PA/G (player-specific).",
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in /api/player-dashboard", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
