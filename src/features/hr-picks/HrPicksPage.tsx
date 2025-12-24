"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CompareHRPick, HrPicksBaselineResponse } from "./types";
import type { CsvDateIndex } from "@/lib/dataAvailability";
import { PickDetailsDrawer } from "./components/PickDetailsDrawer";
import { PickComparePanel } from "./components/PickComparePanel";

type HrPicksPageProps = {
  initialData: HrPicksBaselineResponse;
  latestDate: string | null;
  csvIndex: CsvDateIndex;
  seasonMetadata?: Record<number, { complete?: boolean; covid_season?: boolean }>;
};

export function HrPicksPage({ initialData, latestDate, csvIndex, seasonMetadata }: HrPicksPageProps) {
  const router = useRouter();
  const seasons = csvIndex.seasons ?? [];
  const datesBySeason = csvIndex.datesBySeason ?? {};

  const initialDate =
    initialData.date && csvIndex.dates.includes(initialData.date)
      ? initialData.date
      : latestDate || "";
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedPick, setSelectedPick] = useState<CompareHRPick | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const selectedSeason = selectedDate
    ? Number.parseInt(selectedDate.slice(0, 4), 10)
    : seasons.length
    ? seasons[seasons.length - 1]
    : null;

  const seasonDates = selectedSeason ? datesBySeason[selectedSeason] ?? [] : [];

  const picksById = useMemo(() => {
    const map = new Map<string, CompareHRPick>();
    initialData.picks.forEach((p) => map.set(p.player_id, p));
    return map;
  }, [initialData.picks]);

  const comparePicks = compareIds
    .map((id) => picksById.get(id))
    .filter((p): p is CompareHRPick => Boolean(p));

  const onSubmitDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      router.push(`/picks?date=${selectedDate}`);
    }
  };

  const toggleCompare = (playerId: string) => {
    if (compareIds.includes(playerId)) {
      setCompareIds(compareIds.filter((id) => id !== playerId));
      return;
    }
    if (compareIds.length >= 2) {
      // Prevent selecting more than two; ignore the third.
      return;
    }
    setCompareIds([...compareIds, playerId]);
  };

  const hasPicks = initialData.picks.length > 0;

  const seasonLabel = (season: number) => {
    const meta = seasonMetadata?.[season];
    const badges: string[] = [];
    if (meta?.covid_season) badges.push("COVID");
    if (meta && meta.complete === false) badges.push("Partial");
    return badges.length ? `${season} (${badges.join(", ")})` : `${season}`;
  };

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">HR Picks</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Ranked, explainable HR candidates for the selected slate.
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Historical / ML Data (CSV-backed). Date is the source of truth; season is derived from date.
        </p>
        <form className="flex flex-wrap items-center gap-3 text-sm" onSubmit={onSubmitDate}>
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Season
            </span>
            <select
              name="season"
              value={selectedSeason ?? ""}
              onChange={(e) => {
                const next = Number.parseInt(e.target.value, 10);
                if (!Number.isFinite(next)) {
                  setSelectedDate("");
                  return;
                }
                const nextDates = datesBySeason[next] ?? [];
                setSelectedDate(nextDates.length ? nextDates[nextDates.length - 1] : "");
              }}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              disabled={!seasons.length}
              data-testid="hr-picks-season"
            >
              {seasons.length ? null : <option value="">No seasons</option>}
              {seasons.map((s) => (
                <option key={s} value={s}>
                  {seasonLabel(s)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Date
            </span>
            <select
              name="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              disabled={!seasonDates.length}
              data-testid="hr-picks-date"
            >
              {seasonDates.length ? null : <option value="">No dates</option>}
              {seasonDates.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            className="h-10 rounded-md bg-slate-900 px-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
            data-testid="hr-picks-load"
          >
            Load Picks
          </button>
          <span className="text-slate-500 dark:text-slate-400">
            {selectedDate ? `Showing ${selectedDate}` : "No historical slates available yet."}
          </span>
        </form>
      </header>

      {comparePicks.length >= 2 && (
        <PickComparePanel picks={comparePicks} onClear={() => setCompareIds([])} />
      )}

      {!selectedDate ? (
        <div
          data-testid="hr-picks-empty-latest"
          className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          No historical slates available yet.
        </div>
      ) : hasPicks ? (
        <section className="space-y-3" data-testid="hr-picks-list">
          {initialData.picks.map((pick, idx) => {
            const selected = compareIds.includes(pick.player_id);
            return (
              <article
                key={pick.player_id}
                data-testid={`hr-pick-card-${pick.player_id}`}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      #{idx + 1}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                        {pick.player_name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{pick.team_name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Pick Score
                    </p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                      {pick.pick_score.toLocaleString()}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{pick.game_date}</p>
                  </div>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-200">
                  {pick.top_reasons.map((reason, idx) => (
                    <li key={`${pick.player_id}-reason-${idx}`}>{reason}</li>
                  ))}
                </ul>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 sm:grid-cols-4">
                  <Metric
                    label="Last 50 HR%"
                    value={`${(pick.hr_rate_last_50 * 100).toFixed(1)}%`}
                  />
                  <Metric
                    label="Season HR%"
                    value={`${(pick.season_hr_rate * 100).toFixed(1)}%`}
                  />
                  <Metric label="Season HR" value={pick.season_hr_total} />
                  <Metric label="Park" value={pick.park_name} />
                  <Metric
                    label="Opp Pitcher"
                    value={
                      pick.opposing_pitcher_name
                        ? `${pick.opposing_pitcher_name}${pick.opposing_pitcher_hand ? ` (${pick.opposing_pitcher_hand})` : ""}`
                        : "—"
                    }
                  />
                  <Metric
                    label="Pitcher HR%"
                    value={
                      pick.pitcher_hr_rate_allowed !== null
                        ? `${(pick.pitcher_hr_rate_allowed * 100).toFixed(1)}%`
                        : "—"
                    }
                  />
                  <Metric label="Park HR Factor" value={pick.park_hr_factor.toFixed(2)} />
                  <Metric label="Exp PA" value={pick.expected_pa.toFixed(1)} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPick(pick)}
                    data-testid={`hr-pick-view-${pick.player_id}`}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    View details
                  </button>
                  <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleCompare(pick.player_id)}
                      data-testid={`hr-pick-compare-${pick.player_id}`}
                      className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-900"
                    />
                    Compare
                  </label>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <div
          data-testid="hr-picks-empty"
          className="rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
        >
          No picks available for this date.
        </div>
      )}

      <PickDetailsDrawer pick={selectedPick} onClose={() => setSelectedPick(null)} />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="font-semibold text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  );
}
