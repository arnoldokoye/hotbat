"use client";

type Props = {
  hrProb: number | null;
  expectedHr: number | null;
  seasonHr: number | null;
  seasonPa: number | null;
  notes?: string;
};

const fmtPct = (v: number | null) =>
  v !== null && Number.isFinite(v) ? `${(v * 100).toFixed(1)}%` : "—";
const fmtNum = (v: number | null, d = 2) =>
  v !== null && Number.isFinite(v) ? v.toFixed(d) : "—";

export function PlayerBaselineCard({ hrProb, expectedHr, seasonHr, seasonPa, notes }: Props) {
  const showNotes =
    notes ??
    "Baseline: HR probability = season HR / season PA; Expected HR = HR probability × 4.0 PA (deterministic window).";

  return (
    <div
      data-testid="player-baseline-card"
      className="mb-2 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            HR Probability Baseline
          </p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {fmtPct(hrProb)}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Expected HR (per game): {fmtNum(expectedHr, 3)}
          </p>
        </div>
        <div className="text-right text-sm text-slate-600 dark:text-slate-300">
          <p>Season HR: {fmtNum(seasonHr ?? null, 0)}</p>
          <p>Season PA: {fmtNum(seasonPa ?? null, 0)}</p>
        </div>
      </div>
      <div className="mt-2 space-y-1 text-xs text-slate-500 dark:text-slate-400" data-testid="baseline-notes">
        <p className="font-semibold text-slate-600 dark:text-slate-200">How calculated</p>
        <p>{showNotes}</p>
      </div>
    </div>
  );
}
