import type { PlayerHrTimePoint } from "../mock/playerDashboardData";

type RecentFormProps = {
  recentGames: PlayerHrTimePoint[];
  summary: {
    recentHrTotal: number;
    recentXhrTotal: number;
    currentHrStreak: number;
  };
};

export function PlayerRecentFormCard({ recentGames, summary }: RecentFormProps) {
  const formatDateLine = (g: PlayerHrTimePoint) => {
    const date = new Date(g.date);
    const dateLabel = date.toLocaleDateString("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return `${dateLabel} vs ${g.opponentTeamName}`;
  };

  return (
    <div
      data-testid="player-recent-form-card"
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
            Streaks & Recent Form
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Last 5 games</p>
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            HR Total
          </p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {summary.recentHrTotal}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            xHR {summary.recentXhrTotal.toFixed(1)}
          </p>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200">
        <span className="font-medium">Current HR streak</span>
        <span className="text-base font-semibold">{summary.currentHrStreak} game(s)</span>
      </div>

      {recentGames.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No recent games available.</p>
      ) : (
        <ul className="space-y-2">
          {recentGames.map((g) => (
            <li
              key={`${g.date}-${g.opponentTeamName}-${g.parkName}`}
              className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2 text-sm dark:border-slate-800"
            >
              <div className="flex flex-col">
                <span className="font-medium text-slate-900 dark:text-slate-50">
                  {formatDateLine(g)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">{g.parkName}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  HR {g.hr}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  xHR {g.xHr?.toFixed(1) ?? "—"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
