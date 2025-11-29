"use client";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { TeamHrTimePoint } from "../mock/teamDashboardData";

type MetricKey = "hr" | "avgEv" | "barrels";

type TeamHrTrendCardProps = {
  data: TeamHrTimePoint[];
};

/**
 * TeamHrTrendCard displays a simple trend view with metric toggles.
 */
export function TeamHrTrendCard({ data }: TeamHrTrendCardProps) {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("hr");

  const metricLabel: Record<MetricKey, string> = {
    hr: "HR/G",
    avgEv: "Avg EV",
    barrels: "Barrels",
  };

  const maxValue = useMemo(() => {
    if (data.length === 0) return 1;
    return Math.max(...data.map((point) => point[activeMetric]));
  }, [activeMetric, data]);

  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Team HR Trend
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Rolling values per game • Mock data
          </p>
        </div>
        <div className="flex gap-2">
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
        <div className="grid grid-cols-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Date</span>
          <span className="text-right">HR</span>
          <span className="text-right">xHR</span>
          <span className="text-right">{metricLabel[activeMetric]}</span>
        </div>
        <div className="space-y-2">
          {data.map((point) => {
            const value = point[activeMetric];
            const barWidth = Math.max(8, (value / maxValue) * 100);
            return (
              <div
                key={point.date}
                className="grid grid-cols-4 items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-slate-700 dark:text-slate-200">{point.date}</span>
                <span className="text-right font-semibold text-slate-900 dark:text-slate-50">
                  {point.hr.toFixed(1)}
                </span>
                <span className="text-right text-slate-700 dark:text-slate-200">
                  {point.xHr.toFixed(1)}
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
