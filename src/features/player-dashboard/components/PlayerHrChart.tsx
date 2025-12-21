"use client";

import { useMemo, useState } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";

export type PlayerHrChartProps = {
  series: Array<{
    date: string;
    hr: number;
    xHr: number | null;
    opponentTeamName?: string | null;
    parkName?: string | null;
  }>;
};

type ChartPoint = PlayerHrChartProps["series"][number] & {
  label: string;
  xPct: number;
  hrY: number;
  xHrY: number | null;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });

function formatDateLabel(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return dateFormatter.format(parsed);
}

export function PlayerHrChart({ series }: PlayerHrChartProps) {
  const hasData = series.length > 0;

  const chartPoints = useMemo<ChartPoint[]>(() => {
    if (!hasData) return [];

    const hrValues = series.map((point) => point.hr);
    const xHrValues = series
      .map((point) => point.xHr)
      .filter((value): value is number => value !== null && value !== undefined);
    const maxValue = Math.max(...hrValues, ...xHrValues, 1);
    const verticalPadding = 14;
    const denominator = Math.max(series.length - 1, 1);
    const scaleValue = (value: number) =>
      100 - verticalPadding - (value / maxValue) * (100 - verticalPadding * 2);

    return series.map((point, idx) => {
      const xPct = (idx / denominator) * 100;
      return {
        ...point,
        label: formatDateLabel(point.date),
        xPct,
        hrY: scaleValue(point.hr),
        xHrY: point.xHr == null ? null : scaleValue(point.xHr),
      };
    });
  }, [hasData, series]);

  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const activeIndex = hoverIndex ?? (chartPoints.length ? chartPoints.length - 1 : null);
  const activePoint = activeIndex != null ? chartPoints[activeIndex] : null;

  const hrPolyline = chartPoints.map((point) => `${point.xPct},${point.hrY}`).join(" ");
  const xHrPolyline = chartPoints
    .filter((point) => point.xHrY !== null)
    .map((point) => `${point.xPct},${point.xHrY}`)
    .join(" ");

  return (
    <Card dataTestId="player-hr-chart" className="h-full">
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            HR & xHR over recent games
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Game-by-game outcomes for the selected player
          </p>
        </div>
      </CardHeader>
      <CardBody className="flex h-full flex-col space-y-4">
        {!hasData ? (
          <div className="flex h-72 items-center justify-center text-sm text-slate-500 dark:text-slate-400">
            No time series data available.
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span>HR</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span>xHR</span>
              </div>
            </div>

            <div className="relative h-80 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
              {activePoint ? (
                <div
                  className="pointer-events-none absolute top-2 z-10 -translate-x-1/2"
                  style={{ left: `${activePoint.xPct}%` }}
                >
                  <div className="rounded-md border border-slate-200 bg-white/90 px-3 py-2 text-xs shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90">
                    <div className="text-[11px] font-semibold text-slate-900 dark:text-slate-50">
                      {activePoint.label}
                    </div>
                    <div className="mt-1 flex items-center gap-2 font-semibold">
                      <span className="text-blue-600 dark:text-blue-400">
                        HR: {activePoint.hr.toFixed(0)}
                      </span>
                      {activePoint.xHr != null ? (
                        <span className="text-amber-500 dark:text-amber-400">
                          xHR: {activePoint.xHr.toFixed(1)}
                        </span>
                      ) : null}
                    </div>
                    {(activePoint.opponentTeamName || activePoint.parkName) && (
                      <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {activePoint.opponentTeamName ?? "Opponent"}
                        {activePoint.parkName ? ` • ${activePoint.parkName}` : ""}
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="h-full w-full"
                onMouseLeave={() => setHoverIndex(null)}
              >
                <line
                  x1={0}
                  y1={86}
                  x2={100}
                  y2={86}
                  stroke="currentColor"
                  strokeWidth={0.4}
                  className="text-slate-300 dark:text-slate-700"
                />
                <polyline
                  points={hrPolyline}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth={1.8}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {xHrPolyline ? (
                  <polyline
                    points={xHrPolyline}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth={1.6}
                    strokeDasharray="4 3"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                ) : null}
                {chartPoints.map((point, idx) => {
                  const prevX = idx === 0 ? 0 : chartPoints[idx - 1].xPct;
                  const nextX = idx === chartPoints.length - 1 ? 100 : chartPoints[idx + 1].xPct;
                  const start = idx === 0 ? 0 : (prevX + point.xPct) / 2;
                  const end = idx === chartPoints.length - 1 ? 100 : (point.xPct + nextX) / 2;
                  const width = Math.max(end - start, 2);

                  return (
                    <g key={`${point.date}-${idx}`}>
                      <circle
                        cx={point.xPct}
                        cy={point.hrY}
                        r={1.9}
                        fill="#2563eb"
                        stroke="#ffffff"
                        strokeWidth={0.5}
                      >
                        <title>
                          {`${point.label} — HR: ${point.hr.toFixed(0)}${
                            point.xHr != null ? `, xHR: ${point.xHr.toFixed(1)}` : ""
                          }`}
                        </title>
                      </circle>
                      {point.xHrY !== null ? (
                        <circle
                          cx={point.xPct}
                          cy={point.xHrY}
                          r={1.5}
                          fill="#f59e0b"
                          stroke="#ffffff"
                          strokeWidth={0.5}
                        >
                          <title>
                            {`${point.label} — xHR: ${point.xHr!.toFixed(1)}${
                              point.opponentTeamName ? ` vs ${point.opponentTeamName}` : ""
                            }`}
                          </title>
                        </circle>
                      ) : null}
                      <rect
                        x={start}
                        y={0}
                        width={width}
                        height={100}
                        fill="transparent"
                        onMouseEnter={() => setHoverIndex(idx)}
                        onFocus={() => setHoverIndex(idx)}
                      />
                    </g>
                  );
                })}
              </svg>

              <div className="absolute inset-x-3 bottom-2 flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
                {chartPoints.map((point, idx) => (
                  <span key={`${point.date}-${idx}`}>{point.label}</span>
                ))}
              </div>
            </div>
          </>
        )}
      </CardBody>
    </Card>
  );
}
