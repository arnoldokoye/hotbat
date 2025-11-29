import { ReactNode } from "react";

type TeamFiltersStripProps = {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  pitcherHand: string;
  onPitcherHandChange: (value: string) => void;
  minPA: number;
  onMinPAChange: (value: number) => void;
  onResetFilters: () => void;
};

const dateRangeOptions = ["Last 7 days", "Last 14 days", "Last 30 days", "Season to date"];
const pitcherHandOptions = ["All", "vs LHP", "vs RHP"];

export function TeamFiltersStrip({
  dateRange,
  onDateRangeChange,
  pitcherHand,
  onPitcherHandChange,
  minPA,
  onMinPAChange,
  onResetFilters,
}: TeamFiltersStripProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <FilterField label="Date Range">
          <select
            value={dateRange}
            onChange={(event) => onDateRangeChange(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
          >
            {dateRangeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Vs Pitcher Hand">
          <select
            value={pitcherHand}
            onChange={(event) => onPitcherHandChange(event.target.value)}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
          >
            {pitcherHandOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FilterField>

        <FilterField label="Min PA">
          <input
            type="number"
            min={0}
            value={minPA}
            onChange={(event) => onMinPAChange(Number(event.target.value))}
            className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
          />
        </FilterField>

        <div className="flex flex-wrap items-end gap-2">
          <button
            type="button"
            className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            Advanced Filters
          </button>
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

type FilterFieldProps = {
  label: string;
  children: ReactNode;
};

function FilterField({ label, children }: FilterFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      <span className="text-xs text-slate-500">{label}</span>
      {children}
    </label>
  );
}
