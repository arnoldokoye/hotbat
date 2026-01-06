type RecentFormProps = {
  recentForm?: {
    last10PA: { hr: number; pa: number; rate: number | null } | null;
    last25PA: { hr: number; pa: number; rate: number | null } | null;
    last50PA: { hr: number; pa: number; rate: number | null } | null;
  };
};

export function PlayerRecentFormCard({ recentForm }: RecentFormProps) {
  const windows = [
    { label: "Last 10 PA", data: recentForm?.last10PA ?? null },
    { label: "Last 25 PA", data: recentForm?.last25PA ?? null },
    { label: "Last 50 PA", data: recentForm?.last50PA ?? null },
  ];
  const hasAny = windows.some((w) => w.data !== null);
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
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Recent form by PA window
          </p>
        </div>
      </div>

      {!hasAny ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          No recent form available for the selected date.
        </p>
      ) : (
        <div className="space-y-2">
          {windows.map(({ label, data }) => (
            <div
              key={label}
              className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2 text-sm dark:border-slate-800"
            >
              <div className="flex flex-col">
                <span className="font-medium text-slate-900 dark:text-slate-50">{label}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {data ? `${data.hr} HR / ${data.pa} PA` : "Insufficient PA"}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  {data?.rate !== null ? `${(data.rate * 100).toFixed(1)}%` : "—"}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">HR/PA</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
