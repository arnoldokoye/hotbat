import { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

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

/**
 * TeamFiltersStrip groups common dashboard filters with consistent styling.
 */
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
    <Card data-testid="team-filters-strip">
      <CardBody className="px-5 py-4 md:px-6 md:py-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FilterField label="Date Range">
            <Select
              data-testid="team-filter-date-range"
              value={dateRange}
              onChange={(event) => onDateRangeChange(event.target.value)}
            >
              {dateRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FilterField>

          <FilterField label="Vs Pitcher Hand">
            <Select
              data-testid="team-filter-pitcher-hand"
              value={pitcherHand}
              onChange={(event) => onPitcherHandChange(event.target.value)}
            >
              {pitcherHandOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </FilterField>

          <FilterField label="Min PA">
            <input
              data-testid="team-filter-min-pa"
              type="number"
              min={0}
              value={minPA}
              onChange={(event) => onMinPAChange(Number(event.target.value))}
              className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            />
          </FilterField>

          <div className="flex flex-wrap items-end gap-2">
            <Button type="button" variant="secondary" className="flex-1">
              Advanced Filters
            </Button>
            <Button
              type="button"
              onClick={onResetFilters}
              variant="primary"
              data-testid="team-filter-reset"
            >
              Reset
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

type FilterFieldProps = {
  label: string;
  children: ReactNode;
};

function FilterField({ label, children }: FilterFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      {children}
    </label>
  );
}
