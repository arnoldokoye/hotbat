import type { DailyTeamStatsRow } from "@/lib/csv/dailyTeamStats";

function safeDiv(numer: number, denom: number): number | null {
  if (!Number.isFinite(numer) || !Number.isFinite(denom) || denom <= 0) return null;
  return numer / denom;
}

export function buildParkFactorMap(rows: DailyTeamStatsRow[]): Map<string, number> {
  let leagueHr = 0;
  let leaguePa = 0;
  const parkAgg = new Map<string, { hr: number; pa: number }>();

  for (const row of rows) {
    leagueHr += row.b_hr;
    leaguePa += row.b_pa;

    const key = row.site;
    if (!key) continue;
    const current = parkAgg.get(key) ?? { hr: 0, pa: 0 };
    current.hr += row.b_hr;
    current.pa += row.b_pa;
    parkAgg.set(key, current);
  }

  const leagueRate = safeDiv(leagueHr, leaguePa);
  const factors = new Map<string, number>();

  for (const [parkId, agg] of parkAgg.entries()) {
    const parkRate = safeDiv(agg.hr, agg.pa);
    const factor =
      leagueRate && parkRate ? parkRate / leagueRate : 1;
    factors.set(parkId, Number.isFinite(factor) ? factor : 1);
  }

  return factors;
}
