"use client";

import { ChangeEvent } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";

type TodayGamesHeaderProps = {
  selectedDate: string;
  onDateChange: (value: string) => void;
  teamQuery: string;
  onTeamQueryChange: (value: string) => void;
  minHotBatScore: number;
  onMinHotBatScoreChange: (value: number) => void;
  minParkHrFactor: number;
  onMinParkHrFactorChange: (value: number) => void;
  gamesCount: number;
};

const mockDateOptions = ["2024-06-15", "2024-06-16", "2024-06-17"];

/**
 * TodayGamesHeader provides the page title and filter controls.
 */
export function TodayGamesHeader({
  selectedDate,
  onDateChange,
  teamQuery,
  onTeamQueryChange,
  minHotBatScore,
  onMinHotBatScoreChange,
  minParkHrFactor,
  onMinParkHrFactorChange,
  gamesCount,
}: TodayGamesHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Today&apos;s Games
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Showing {gamesCount} games on {selectedDate}
          </p>
        </div>
      </CardHeader>
      <CardBody className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Date"
          value={selectedDate}
          onChange={(event) => onDateChange(event.target.value)}
        >
          {mockDateOptions.map((date) => (
            <option key={date} value={date}>
              {date}
            </option>
          ))}
        </Select>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
          <span className="text-xs text-slate-500 dark:text-slate-400">Team search</span>
          <input
            type="search"
            value={teamQuery}
            onChange={(event) => onTeamQueryChange(event.target.value)}
            placeholder="Search team"
            className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <NumericField
          label="Min HotBat score"
          value={minHotBatScore}
          onChange={(val) => onMinHotBatScoreChange(val)}
          min={0}
          max={100}
        />

        <NumericField
          label="Min park HR factor"
          value={minParkHrFactor}
          onChange={(val) => onMinParkHrFactorChange(val)}
          min={0}
          max={2}
          step={0.01}
        />
      </CardBody>
    </Card>
  );
}

type NumericFieldProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
};

function NumericField({ label, value, onChange, min, max, step }: NumericFieldProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(Number(event.target.value))
        }
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
      />
    </label>
  );
}
