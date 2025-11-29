import { useState } from "react";
import { TeamFiltersStrip } from "./components/TeamFiltersStrip";
import { TeamHeader } from "./components/TeamHeader";
import { TeamKeyMetricsRow } from "./components/TeamKeyMetricsRow";
import {
  defaultDateRange,
  defaultHomeAway,
  defaultMinPa,
  defaultPark,
  defaultPitcherHand,
  defaultSeason,
  defaultSplit,
  teamInfo,
  teamKeyMetrics,
} from "./mock/teamDashboardData";

export function TeamHrDashboardPage() {
  const [season, setSeason] = useState(defaultSeason);
  const [split, setSplit] = useState(defaultSplit);
  const [park, setPark] = useState(defaultPark);
  const [homeAway, setHomeAway] = useState(defaultHomeAway);
  const [isFavorite, setIsFavorite] = useState(false);

  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [pitcherHand, setPitcherHand] = useState(defaultPitcherHand);
  const [minPA, setMinPA] = useState(defaultMinPa);

  const handleResetFilters = () => {
    setDateRange(defaultDateRange);
    setPitcherHand(defaultPitcherHand);
    setMinPA(defaultMinPa);
  };

  return (
    <section className="space-y-5">
      <TeamHeader
        teamInfo={teamInfo}
        season={season}
        onSeasonChange={setSeason}
        split={split}
        onSplitChange={setSplit}
        park={park}
        onParkChange={setPark}
        homeAway={homeAway}
        onHomeAwayChange={setHomeAway}
        isFavorite={isFavorite}
        onToggleFavorite={() => setIsFavorite((prev) => !prev)}
      />

      <TeamFiltersStrip
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        pitcherHand={pitcherHand}
        onPitcherHandChange={setPitcherHand}
        minPA={minPA}
        onMinPAChange={setMinPA}
        onResetFilters={handleResetFilters}
      />

      <TeamKeyMetricsRow metrics={teamKeyMetrics} />

      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderCard title="TeamHrTrendCard placeholder" />
        <PlaceholderCard title="PitcherHrVulnerabilityCard placeholder" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PlaceholderCard title="UpcomingGamesCard placeholder" />
        <PlaceholderCard title="TeamSplitsCard placeholder" />
      </div>

      <PlaceholderCard title="GameHrTable placeholder" />
    </section>
  );
}

type PlaceholderCardProps = {
  title: string;
};

function PlaceholderCard({ title }: PlaceholderCardProps) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-6 py-10 text-center text-sm font-semibold text-slate-500">
      {title}
    </div>
  );
}
