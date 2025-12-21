"use client";

import { useEffect } from "react";
import type { HrPick } from "@/lib/api/fetchHrPicks";

type PickDetailsDrawerProps = {
  pick: HrPick | null;
  onClose: () => void;
};

export function PickDetailsDrawer({ pick, onClose }: PickDetailsDrawerProps) {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  if (!pick) return null;

  const fmtNum = (value?: number, digits = 3) =>
    typeof value === "number" && !Number.isNaN(value) ? value.toFixed(digits) : "—";

  return (
    <div
      data-testid="hr-pick-drawer"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 px-4 py-6 md:items-center"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-start justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              HR Pick Details
            </p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {pick.playerName} · {pick.teamAbbrev}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Close
          </button>
        </div>
        <div className="space-y-3 px-4 py-4 text-sm text-slate-700 dark:text-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Pick Score
              </p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {pick.pickScore.toFixed(1)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                HotBat Score
              </p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                {pick.hotbatScore.toFixed(1)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Reasons
            </p>
            <ul className="mt-1 list-disc space-y-1 pl-5">
              {pick.reasons.map((reason, idx) => (
                <li key={`${pick.playerId}-reason-${idx}`}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Detail label="Park" value={pick.parkName ?? "—"} />
            <Detail label="Park HR Factor" value={fmtNum(pick.parkHrFactor, 2)} />
            <Detail label="HR/PA" value={fmtNum(pick.hrPerPa, 3)} />
            <Detail label="Season HR" value={pick.seasonHr ?? 0} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-slate-100 px-3 py-2 text-sm dark:border-slate-800">
      <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="font-semibold text-slate-900 dark:text-slate-50">{value}</p>
    </div>
  );
}
