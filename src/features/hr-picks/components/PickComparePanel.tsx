"use client";

import type { HrPick } from "@/lib/api/fetchHrPicks";

type PickComparePanelProps = {
  picks: HrPick[];
  onClear: () => void;
};

export function PickComparePanel({ picks, onClear }: PickComparePanelProps) {
  if (!picks.length) return null;

  const fmt = (v?: number, digits = 3) =>
    typeof v === "number" && !Number.isNaN(v) ? v.toFixed(digits) : "—";

  return (
    <div
      data-testid="hr-picks-compare-panel"
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Compare Picks
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Side-by-side signals</p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Clear compare
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {picks.map((p) => (
          <div
            key={p.playerId}
            className="rounded-md border border-slate-100 p-3 dark:border-slate-800"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {p.playerName}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.teamAbbrev}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Pick Score
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {p.pickScore.toFixed(1)}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  HotBat {p.hotbatScore.toFixed(1)}
                </p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Metric label="Park HR Factor" value={fmt(p.parkHrFactor, 2)} />
              <Metric label="HR/PA" value={fmt(p.hrPerPa, 3)} />
              <Metric label="Season HR" value={p.seasonHr ?? 0} />
              <Metric label="Park" value={p.parkName ?? "—"} />
            </div>
            <div className="mt-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Top reasons
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-xs">
                {p.reasons.slice(0, 2).map((r, idx) => (
                  <li key={`${p.playerId}-cmp-reason-${idx}`}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
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
