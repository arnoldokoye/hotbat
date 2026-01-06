"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { TeamHrTimePoint } from "../mock/teamDashboardData";

type MetricKey = "hr" | "avgEv" | "barrels";
type RecentOption = "5" | "10" | "20" | "all";

type TeamHrTrendCardProps = {
  data: TeamHrTimePoint[];
};

/**
 * TeamHrTrendCard displays a simple trend view with metric toggles.
 */
export function TeamHrTrendCard({ data }: TeamHrTrendCardProps) {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("hr");
  const [recentCount, setRecentCount] = useState<RecentOption>("10");

  const metricLabel: Record<MetricKey, string> = {
    hr: "HR/G",
    avgEv: "Avg EV",
    barrels: "Barrels",
  };

  const sortedData = useMemo(
    () =>
      [...data].sort((a, b) => {
        if (a.date !== b.date) return b.date.localeCompare(a.date);
        return 0;
      }),
    [data],
  );

  const recentRows = useMemo(() => {
    if (recentCount === "all") return sortedData;
    const count = Number.parseInt(recentCount, 10);
    if (!Number.isFinite(count)) return sortedData;
    return sortedData.slice(0, count);
  }, [recentCount, sortedData]);

  const maxValue = useMemo(() => {
    if (recentRows.length === 0) return 1;
    const max = Math.max(...recentRows.map((point) => point[activeMetric]));
    return max > 0 ? max : 1;
  }, [activeMetric, recentRows]);

  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Team HR Trend
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Rolling values per game
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Select
            value={recentCount}
            onChange={(event) => setRecentCount(event.target.value as RecentOption)}
            className="h-9 py-0 text-xs"
          >
            <option value="5">Last 5</option>
            <option value="10">Last 10</option>
            <option value="20">Last 20</option>
            <option value="all">All</option>
          </Select>
          {(["hr", "avgEv", "barrels"] as MetricKey[]).map((metric) => (
            <Button
              key={metric}
              type="button"
              size="sm"
              variant={activeMetric === metric ? "primary" : "ghost"}
              onClick={() => setActiveMetric(metric)}
            >
              {metricLabel[metric]}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardBody className="space-y-2">
        <div className="grid grid-cols-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Date</span>
          <span>Opponent</span>
          <span>Opp SP</span>
          <span className="text-right">HR</span>
          <span className="text-right">xHR</span>
          <span className="text-right">{metricLabel[activeMetric]}</span>
        </div>
        <div className="space-y-2">
          {recentRows.map((point) => {
            const value = Number.isFinite(point[activeMetric]) ? point[activeMetric] : 0;
            const xHr = Number.isFinite(point.xHr) ? point.xHr : 0;
            const barWidth = Math.max(8, (value / maxValue) * 100);
            return (
              <div
                key={point.date}
                className="grid grid-cols-6 items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-slate-700 dark:text-slate-200">{point.date}</span>
                <span className="text-slate-700 dark:text-slate-200">
                  {point.opponent || "—"}
                </span>
                <span className="text-slate-600 dark:text-slate-300">
                  {point.opposingSp || "—"}
                </span>
                <span className="text-right font-semibold text-slate-900 dark:text-slate-50">
                  {point.hr.toFixed(1)}
                </span>
                <span className="text-right text-slate-700 dark:text-slate-200">
                  {xHr.toFixed(1)}
                </span>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {activeMetric === "avgEv" ? value.toFixed(1) : value.toFixed(0)}
                  </span>
                  <span
                    className="h-2 rounded-full bg-slate-300 dark:bg-slate-700"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
}
