import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { TeamKeyMetric } from "../mock/teamDashboardData";

type TeamKeyMetricsRowProps = {
  metrics: TeamKeyMetric[];
};

/**
 * TeamKeyMetricsRow renders compact metric cards summarizing key HR stats.
 */
export function TeamKeyMetricsRow({ metrics }: TeamKeyMetricsRowProps) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      data-testid="team-key-metrics"
    >
      {metrics.map((metric, index) => (
        <MetricCard key={metric.id ?? index} metric={metric} />
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
    <Card dataTestId="team-key-metric">
      <CardBody className="px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">
            {value}
          </p>
          {trendValue && (
            <Badge className={`${trendColor} bg-transparent px-2 py-1`}>
              {trendSymbol} {trendValue}
            </Badge>
          )}
        </div>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{comparisonText}</p>
      </CardBody>
    </Card>
  );
}
