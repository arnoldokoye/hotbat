"use client";

import type { CompareHRPick } from "../types";

type PickComparePanelProps = {
  picks: CompareHRPick[];
  onClear: () => void;
};

export function PickComparePanel({ picks, onClear }: PickComparePanelProps) {
  if (!picks.length) return null;

  const fmtPct = (v: number | null, digits = 1) =>
    typeof v === "number" && Number.isFinite(v) ? `${(v * 100).toFixed(digits)}%` : "—";
  const fmtNum = (v: number | null, digits = 3) =>
    typeof v === "number" && Number.isFinite(v) ? v.toFixed(digits) : "—";
  const matchupLabel = (v: CompareHRPick["matchup_advantage"]) =>
    v === "positive" ? "Advantage" : v === "negative" ? "Disadvantage" : "Neutral";

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
        {picks.map((p) => {
          const hasSeasonStats = Boolean(p.season_pa && p.season_pa > 0);
          return (
            <div
              key={p.player_id}
              className="rounded-md border border-slate-100 p-3 dark:border-slate-800"
            >
              <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {p.player_name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{p.team_name}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Pick Score
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                  {p.pick_score.toLocaleString()}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.game_date}</p>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Metric label="Last 50 HR%" value={fmtPct(p.hr_rate_last_50)} />
              <Metric label="Season HR%" value={hasSeasonStats ? fmtPct(p.season_hr_rate) : "—"} />
              <Metric label="Season HR" value={hasSeasonStats ? p.season_hr_total : "—"} />
              <Metric label="Park" value={p.park_name} />
              <Metric
                label="Opp Pitcher"
                value={
                  p.opposing_pitcher_name
                    ? `${p.opposing_pitcher_name}${p.opposing_pitcher_hand ? ` (${p.opposing_pitcher_hand})` : ""}`
                    : "—"
                }
              />
              <Metric label="Pitcher HR%" value={fmtPct(p.pitcher_hr_rate_allowed)} />
              <Metric label="Pitcher HR Total" value={p.pitcher_hr_total_allowed ?? "—"} />
              <Metric label="Matchup" value={matchupLabel(p.matchup_advantage)} />
              <Metric label="Park HR Factor" value={fmtNum(p.park_hr_factor, 2)} />
              <Metric label="Exp PA" value={fmtNum(p.expected_pa, 1)} />
            </div>
            <div className="mt-3">
              <p className="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Top reasons
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-4 text-xs">
                {p.top_reasons.slice(0, 2).map((r, idx) => (
                  <li key={`${p.player_id}-cmp-reason-${idx}`}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
          );
        })}
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
