"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { HrPick, HrPicksResponse } from "@/lib/api/fetchHrPicks";
import { PickDetailsDrawer } from "./components/PickDetailsDrawer";
import { PickComparePanel } from "./components/PickComparePanel";

type HrPicksPageProps = {
  initialData: HrPicksResponse;
  latestDate: string | null;
};

export function HrPicksPage({ initialData, latestDate }: HrPicksPageProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(initialData.date || latestDate || "");
  const [selectedPick, setSelectedPick] = useState<HrPick | null>(null);
  const [compareIds, setCompareIds] = useState<number[]>([]);

  const picksById = useMemo(() => {
    const map = new Map<number, HrPick>();
    initialData.picks.forEach((p) => map.set(p.playerId, p));
    return map;
  }, [initialData.picks]);

  const comparePicks = compareIds
    .map((id) => picksById.get(id))
    .filter((p): p is HrPick => Boolean(p));

  const onSubmitDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDate) {
      router.push(`/picks?date=${selectedDate}`);
    }
  };

  const toggleCompare = (playerId: number) => {
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

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">HR Picks</h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Ranked, explainable HR candidates for the selected slate.
        </p>
        <form className="flex flex-wrap items-center gap-3 text-sm" onSubmit={onSubmitDate}>
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
            <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Date
            </span>
            <input
              type="date"
              name="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-800 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
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
          {initialData.picks.map((pick) => {
            const selected = compareIds.includes(pick.playerId);
            return (
              <article
                key={pick.playerId}
                data-testid={`hr-pick-card-${pick.playerId}`}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-100">
                      #{pick.rank}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                        {pick.playerName}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">{pick.teamAbbrev}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                      Pick Score
                    </p>
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
                      {pick.pickScore.toFixed(1)}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      HotBat {pick.hotbatScore.toFixed(1)}
                    </p>
                  </div>
                </div>
                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-200">
                  {pick.reasons.map((reason, idx) => (
                    <li key={`${pick.playerId}-reason-${idx}`}>{reason}</li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPick(pick)}
                    data-testid={`hr-pick-view-${pick.playerId}`}
                    className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    View details
                  </button>
                  <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => toggleCompare(pick.playerId)}
                      data-testid={`hr-pick-compare-${pick.playerId}`}
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
