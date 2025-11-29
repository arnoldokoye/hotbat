import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { PlayerKeyMetric } from "../mock/playerDashboardData";

type PlayerKeyMetricsRowProps = {
  metrics: PlayerKeyMetric[];
};

/**
 * PlayerKeyMetricsRow shows key HR stats for the player in a compact grid.
 */
export function PlayerKeyMetricsRow({ metrics }: PlayerKeyMetricsRowProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}

type MetricCardProps = {
  metric: PlayerKeyMetric;
};

function MetricCard({ metric }: MetricCardProps) {
  const { label, value, comparisonText, trendDirection } = metric;

  const trendSymbol =
    trendDirection === "up" ? "▲" : trendDirection === "down" ? "▼" : undefined;
  const trendColor =
    trendDirection === "up"
      ? "text-emerald-600"
      : trendDirection === "down"
      ? "text-rose-600"
      : "text-slate-500";

  return (
    <Card>
      <CardBody className="px-4 py-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-50">{value}</p>
          {trendSymbol && (
            <Badge className={`${trendColor} bg-transparent px-2 py-1`}>{trendSymbol}</Badge>
          )}
        </div>
        {comparisonText ? (
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{comparisonText}</p>
        ) : null}
      </CardBody>
    </Card>
  );
}
