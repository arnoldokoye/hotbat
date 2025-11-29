import Image from "next/image";
import { TeamInfo } from "../mock/teamDashboardData";

type TeamHeaderProps = {
  teamInfo: TeamInfo;
  season: string;
  onSeasonChange: (value: string) => void;
  split: string;
  onSplitChange: (value: string) => void;
  park: string;
  onParkChange: (value: string) => void;
  homeAway: string;
  onHomeAwayChange: (value: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

const seasonOptions = ["2025", "2024", "2023", "All Seasons"];
const splitOptions = ["Full Season", "Last 30 Days", "Last 14 Days", "Post-ASB"];
const parkOptions = ["All Parks", "Yankee Stadium", "Fenway Park", "Camden Yards"];
const homeAwayOptions = ["All Games", "Home", "Away"];

export function TeamHeader({
  teamInfo,
  season,
  onSeasonChange,
  split,
  onSplitChange,
  park,
  onParkChange,
  homeAway,
  onHomeAwayChange,
  isFavorite,
  onToggleFavorite,
}: TeamHeaderProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white">
            <Image
              src={teamInfo.teamLogoUrl}
              alt={teamInfo.teamName}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-slate-900">
                {teamInfo.teamName}
              </h1>
              <button
                type="button"
                onClick={onToggleFavorite}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-amber-500 shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
                aria-label={isFavorite ? "Remove from favorites" : "Save as favorite"}
              >
                {isFavorite ? "★" : "☆"}
              </button>
            </div>
            <p className="text-sm text-slate-600">
              {teamInfo.league} · {teamInfo.division}
            </p>
          </div>
        </div>

        <div className="grid w-full gap-3 sm:grid-cols-2 md:w-auto md:grid-cols-4">
          <Select
            label="Season"
            value={season}
            onChange={(value) => onSeasonChange(value)}
            options={seasonOptions}
          />
          <Select
            label="Split"
            value={split}
            onChange={(value) => onSplitChange(value)}
            options={splitOptions}
          />
          <Select
            label="Park"
            value={park}
            onChange={(value) => onParkChange(value)}
            options={parkOptions}
          />
          <Select
            label="Home/Away"
            value={homeAway}
            onChange={(value) => onHomeAwayChange(value)}
            options={homeAwayOptions}
          />
        </div>
      </div>
    </div>
  );
}

type SelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      <span className="text-xs text-slate-500">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
