import { TeamKeyMetric } from "../mock/teamDashboardData";

type TeamKeyMetricsRowProps = {
  metrics: TeamKeyMetric[];
};

export function TeamKeyMetricsRow({ metrics }: TeamKeyMetricsRowProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}

type MetricCardProps = {
  metric: TeamKeyMetric;
};

function MetricCard({ metric }: MetricCardProps) {
  const { label, value, comparisonText, trendDirection, trendValue } = metric;

  const trendSymbol =
    trendDirection === "up" ? "▲" : trendDirection === "down" ? "▼" : "•";
  const trendColor =
    trendDirection === "up"
      ? "text-emerald-600"
      : trendDirection === "down"
      ? "text-rose-600"
      : "text-slate-500";

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <div className="mt-2 flex items-baseline gap-2">
        <p className="text-2xl font-semibold text-slate-900">{value}</p>
        {trendValue && (
          <span className={`text-xs font-semibold ${trendColor}`}>
            {trendSymbol} {trendValue}
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-slate-600">{comparisonText}</p>
    </div>
  );
}
