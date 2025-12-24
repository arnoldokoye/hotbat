import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { loadBallparks } from "@/lib/csv/ballparks";
import { loadDailyBatting } from "@/lib/csv/dailyBatting";
import { loadDailyPitchingStartersByGame } from "@/lib/csv/dailyPitching";
import { loadPlayerRegistry } from "@/lib/csv/playerRegistry";
import { loadTeams } from "@/lib/csv/teams";

type PlayerDashboardResponse = {
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
      xHr: number | null;
      hrPerPa: number | null;
      barrelRate: number | null;
      avgEv: number | null;
      iso: number | null;
      hardHitRate: number | null;
    }
  >;
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

async function loadPlayerDashboardFromCsv(args: {
  playerId: string;
  season: number;
  splitKey: string;
}): Promise<PlayerDashboardResponse | null> {
  const { playerId, season, splitKey: _splitKey } = args;
  void _splitKey;

  const [battingRows, startersByGame, players, teams, parks] = await Promise.all([
    loadDailyBatting(season),
    loadDailyPitchingStartersByGame(season),
    loadPlayerRegistry(),
    loadTeams().catch(() => []),
    loadBallparks().catch(() => new Map<string, string>()),
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

  const latestGame = games.length ? games[games.length - 1] : null;
  const teamId = latestGame?.team ?? "";
  const teamName = teamNameById.get(teamId) ?? teamId;

  const firstName = playerMeta.first_name ?? playerMeta.player_name.split(" ")[0] ?? "";
  const lastName = playerMeta.last_name ?? playerMeta.player_name.split(" ").slice(1).join(" ") ?? "";
  const bats = playerMeta.bats ?? "R";

  const totals = games.reduce(
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
  const hrProb = safeDiv(seasonHr, seasonPa) ?? 0;
  const projectedPa = 4.0;
  const expectedHr = hrProb * projectedPa;

  const computeSplit = (filter: (g: GameAgg) => boolean) => {
    const subset = games.filter(filter);
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
    return {
      season,
      gamesPlayed,
      hr: sum.hr,
      xHr: null as number | null,
      hrPerPa: safeDiv(sum.hr, sum.pa),
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
    lhp: computeSplit((g) => g.opposingStarterThrows === "L"),
    rhp: computeSplit((g) => g.opposingStarterThrows === "R"),
  };

  // Monthly splits (YYYY-MM).
  for (const g of games) {
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

  const gamesDesc = [...games].sort((a, b) => {
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

  const parkAgg = games.reduce<Record<string, { hr: number; pa: number }>>((acc, g) => {
    const parkName = parks.get(g.site) ?? g.site ?? "Unknown Park";
    acc[parkName] ??= { hr: 0, pa: 0 };
    acc[parkName].hr += g.hr;
    acc[parkName].pa += g.pa;
    return acc;
  }, {});

  const parkProfile = Object.entries(parkAgg).map(([parkName, agg]) => ({
    parkName,
    hrAtPark: agg.hr,
    hrPerPaAtPark: agg.pa > 0 ? agg.hr / agg.pa : 0,
    parkHrFactor: null,
  }));

  return {
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
      notes:
        "Baseline: HR probability = season HR / season PA; Expected HR = HR probability × 4.0 PA window (deterministic).",
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

    if (mode === "csv" || (playerIdAlt && mode !== "db")) {
      const csv = await loadPlayerDashboardFromCsv({
        playerId: rawPlayerId,
        season: seasonValue,
        splitKey: splitParam,
      });
      if (!csv) {
        return NextResponse.json({ error: "Player not found" }, { status: 404 });
      }
      return NextResponse.json(csv, {
        status: 200,
        headers: { "x-hotbat-source": "csv" },
      });
    }

    const playerId = Number(rawPlayerId);
    if (Number.isNaN(playerId)) {
      if (mode === "auto") {
        const csv = await loadPlayerDashboardFromCsv({
          playerId: rawPlayerId,
          season: seasonValue,
          splitKey: splitParam,
        });
        if (!csv) {
          return NextResponse.json({ error: "Player not found" }, { status: 404 });
        }
        return NextResponse.json(csv, {
          status: 200,
          headers: { "x-hotbat-source": "csv" },
        });
      }
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
    const hrProb = seasonPa > 0 ? seasonHr / seasonPa : 0;
    const projectedPa = 4.0; // deterministic baseline window
    const expectedHr = hrProb * projectedPa;

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
        notes:
          "Baseline: HR probability = season HR / season PA; Expected HR = HR probability × 4.0 PA window (deterministic).",
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in /api/player-dashboard", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
