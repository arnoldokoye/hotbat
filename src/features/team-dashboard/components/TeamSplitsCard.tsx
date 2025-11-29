"use client";
import { useState } from "react";
import { TeamSplitRow } from "../mock/teamDashboardData";

type TabKey = "overview" | "homeAway" | "lhpRhp" | "monthly";

type TeamSplitsCardProps = {
  overview: TeamSplitRow[];
  homeAway: TeamSplitRow[];
  lhpRhp: TeamSplitRow[];
  monthly: TeamSplitRow[];
};

export function TeamSplitsCard({
  overview,
  homeAway,
  lhpRhp,
  monthly,
}: TeamSplitsCardProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const tabData: Record<TabKey, { label: string; rows: TeamSplitRow[] }> = {
    overview: { label: "Overview", rows: overview },
    homeAway: { label: "Home vs Away", rows: homeAway },
    lhpRhp: { label: "LHP vs RHP", rows: lhpRhp },
    monthly: { label: "Monthly", rows: monthly },
  };

  const current = tabData[activeTab];

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Team Splits
          </p>
          <p className="text-sm text-slate-600">HR per game by context</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(tabData) as TabKey[]).map((tabKey) => (
            <button
              key={tabKey}
              type="button"
              onClick={() => setActiveTab(tabKey)}
              className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                activeTab === tabKey
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {tabData[tabKey].label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-slate-100">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-3 py-2">Split</th>
              <th className="px-3 py-2">HR/G</th>
              <th className="px-3 py-2">League Avg</th>
            </tr>
          </thead>
          <tbody>
            {current.rows.map((row) => (
              <tr key={row.label} className="border-t border-slate-100">
                <td className="px-3 py-2 font-semibold text-slate-900">{row.label}</td>
                <td className="px-3 py-2 text-slate-800">{row.hrPerGame.toFixed(2)}</td>
                <td className="px-3 py-2 text-slate-600">
                  {row.leagueAvgHrPerGame ? `${row.leagueAvgHrPerGame.toFixed(2)} HR/G` : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
