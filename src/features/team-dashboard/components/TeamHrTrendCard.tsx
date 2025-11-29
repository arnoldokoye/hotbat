import { useMemo, useState } from "react";
import { TeamHrTimePoint } from "../mock/teamDashboardData";

type MetricKey = "hr" | "avgEv" | "barrels";

type TeamHrTrendCardProps = {
  data: TeamHrTimePoint[];
};

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
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Team HR Trend
          </p>
          <p className="text-sm text-slate-600">Rolling values per game • Mock data</p>
        </div>
        <div className="flex gap-2">
          {(["hr", "avgEv", "barrels"] as MetricKey[]).map((metric) => (
            <button
              key={metric}
              type="button"
              onClick={() => setActiveMetric(metric)}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                activeMetric === metric
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {metricLabel[metric]}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="grid grid-cols-4 text-xs font-semibold text-slate-500">
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
                className="grid grid-cols-4 items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm"
              >
                <span className="text-slate-700">{point.date}</span>
                <span className="text-right font-semibold text-slate-900">{point.hr.toFixed(1)}</span>
                <span className="text-right text-slate-700">{point.xHr.toFixed(1)}</span>
                <div className="flex items-center justify-end gap-2">
                  <span className="text-sm font-semibold text-slate-900">
                    {activeMetric === "avgEv" ? value.toFixed(1) : value.toFixed(0)}
                  </span>
                  <span className="h-2 rounded-full bg-slate-300" style={{ width: `${barWidth}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
