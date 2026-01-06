"use client";

import { useEffect } from "react";
import type { CompareHRPick } from "../types";

type PickDetailsDrawerProps = {
  pick: CompareHRPick | null;
  onClose: () => void;
};

export function PickDetailsDrawer({ pick, onClose }: PickDetailsDrawerProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!pick) return null;

  const fmtPct = (value: number | null, digits = 1) =>
    typeof value === "number" && Number.isFinite(value) ? `${(value * 100).toFixed(digits)}%` : "—";
  const fmtNum = (value: number | null, digits = 3) =>
    typeof value === "number" && Number.isFinite(value) ? value.toFixed(digits) : "—";
  const matchupLabel =
    pick.matchup_advantage === "positive"
      ? "Advantage"
      : pick.matchup_advantage === "negative"
      ? "Disadvantage"
      : "Neutral";
  const hasSeasonStats = Boolean(pick.season_pa && pick.season_pa > 0);

  return (
    <div
      data-testid="hr-pick-drawer"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 py-6 md:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              HR Pick Details
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {pick.player_name} · {pick.team_name}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
        <div className="space-y-3 px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Pick Score
              </p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {pick.pick_score.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Baseline Score
              </p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {pick.baseline_score.toFixed(6)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Top reasons
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {pick.top_reasons.map((reason, idx) => (
                <li key={`${pick.player_id}-reason-${idx}`}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-md border border-slate-100 px-3 py-2 text-sm dark:border-slate-800">
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              How calculated
            </p>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
              <span className="font-semibold">baseline_hr_score</span> ={" "}
              <span className="font-mono">hr_rate_last_50</span> ×{" "}
              <span className="font-mono">park_hr_factor</span> ×{" "}
              <span className="font-mono">expected_pa</span>
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Pitcher matchup signals are shown for context but are not applied to the baseline score yet.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Detail label="Game date" value={pick.game_date} />
            <Detail label="Park" value={pick.park_name} />
            <Detail label="Park HR Factor" value={fmtNum(pick.park_hr_factor, 2)} />
            <Detail label="Expected PA" value={fmtNum(pick.expected_pa, 1)} />
            <Detail label="Last 50 HR%" value={fmtPct(pick.hr_rate_last_50)} />
            <Detail label="Season HR%" value={hasSeasonStats ? fmtPct(pick.season_hr_rate) : "—"} />
            <Detail label="Season HR total" value={hasSeasonStats ? pick.season_hr_total : "—"} />
            <Detail
              label="Opposing pitcher"
              value={
                pick.opposing_pitcher_name
                  ? `${pick.opposing_pitcher_name}${pick.opposing_pitcher_hand ? ` (${pick.opposing_pitcher_hand})` : ""}`
                  : "—"
              }
            />
            <Detail label="Pitcher HR%" value={fmtPct(pick.pitcher_hr_rate_allowed)} />
            <Detail
              label="Pitcher HR total"
              value={pick.pitcher_hr_total_allowed ?? "—"}
            />
            <Detail label="Batter hand" value={pick.batter_hand} />
            <Detail label="Matchup" value={matchupLabel} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-slate-100 px-3 py-2 text-sm dark:border-slate-800">
      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-semibold text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  );
}
