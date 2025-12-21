"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { PlayerHrTimePoint } from "../mock/playerDashboardData";

type MetricKey = "hr" | "xHr" | "avgEv" | "barrels";

type PlayerHrTrendCardProps = {
  data: PlayerHrTimePoint[];
};

/**
 * PlayerHrTrendCard visualizes game-by-game HR outcomes with metric toggles.
 */
export function PlayerHrTrendCard({ data }: PlayerHrTrendCardProps) {
  const [activeMetric, setActiveMetric] = useState<MetricKey>("hr");

  const metricLabel: Record<MetricKey, string> = {
    hr: "HR",
    xHr: "xHR",
    avgEv: "Avg EV",
    barrels: "Barrels",
  };

  const maxValue = useMemo(() => {
    if (data.length === 0) return 1;
    return Math.max(...data.map((point) => point[activeMetric] ?? 0), 1);
  }, [activeMetric, data]);

  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Player HR Trend
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Game-by-game HR + quality of contact (mock data)
          </p>
        </div>
        <div className="flex gap-2">
          {(["hr", "xHr", "avgEv", "barrels"] as MetricKey[]).map((metric) => (
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
        <div className="grid grid-cols-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span>Date</span>
          <span className="text-right">HR</span>
          <span className="text-right">xHR</span>
          <span className="text-right">Avg EV</span>
          <span className="text-right">{metricLabel[activeMetric]}</span>
        </div>
        <div className="space-y-2">
          {data.map((point) => {
            const value = point[activeMetric] ?? 0;
            const barWidth = Math.max(8, (value / maxValue) * 100);
            return (
              <div
                key={point.date}
                className="grid grid-cols-5 items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <span className="text-slate-700 dark:text-slate-200">{point.date}</span>
                <span className="text-right font-semibold text-slate-900 dark:text-slate-50">
                  {point.hr.toFixed(0)}
                </span>
                <span className="text-right text-slate-700 dark:text-slate-200">
                  {point.xHr != null ? point.xHr.toFixed(1) : "—"}
                </span>
                <span className="text-right text-slate-700 dark:text-slate-200">
                  {point.avgEv.toFixed(1)}
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
