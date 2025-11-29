"use client";
import { useEffect, useState } from "react";
import type { TeamDashboardData } from "@/lib/api/teamDashboard";
import { useFavorites } from "@/context/FavoritesContext";
import { TeamFiltersStrip } from "./components/TeamFiltersStrip";
import { TeamHeader } from "./components/TeamHeader";
import { TeamKeyMetricsRow } from "./components/TeamKeyMetricsRow";
import { GameHrTable } from "./components/GameHrTable";
import { PitcherHrVulnerabilityCard } from "./components/PitcherHrVulnerabilityCard";
import { TeamHrTrendCard } from "./components/TeamHrTrendCard";
import { TeamSplitsCard } from "./components/TeamSplitsCard";
import { UpcomingGamesCard } from "./components/UpcomingGamesCard";

type TeamHrDashboardPageProps = {
  initialData: TeamDashboardData;
};

export function TeamHrDashboardPage({ initialData }: TeamHrDashboardPageProps) {
  const { favoriteTeams, toggleTeamFavorite, defaults, setDefaults } = useFavorites();

  const [season, setSeason] = useState(
    defaults.teamDashboardFilters?.season ?? initialData.filters.defaultSeason,
  );
  const [split, setSplit] = useState(
    defaults.teamDashboardFilters?.split ?? initialData.filters.defaultSplit,
  );
  const [park, setPark] = useState(initialData.filters.defaultPark);
  const [homeAway, setHomeAway] = useState(initialData.filters.defaultHomeAway);

  const [dateRange, setDateRange] = useState(
    defaults.teamDashboardFilters?.dateRange ?? initialData.filters.defaultDateRange,
  );
  const [pitcherHand, setPitcherHand] = useState(initialData.filters.defaultPitcherHand);
  const [minPA, setMinPA] = useState(initialData.filters.defaultMinPa);

  const isFavorite = favoriteTeams.includes(initialData.teamInfo.teamId);

  const handleResetFilters = () => {
    setDateRange(initialData.filters.defaultDateRange);
    setPitcherHand(initialData.filters.defaultPitcherHand);
    setMinPA(initialData.filters.defaultMinPa);
  };

  useEffect(() => {
    setDefaults((prev) => ({
      ...prev,
      teamId: initialData.teamInfo.teamId,
      teamDashboardFilters: {
        ...prev.teamDashboardFilters,
        season,
        split,
        dateRange,
      },
    }));
  }, [dateRange, initialData.teamInfo.teamId, season, setDefaults, split]);

  return (
    <section className="space-y-5">
      <TeamHeader
        teamInfo={initialData.teamInfo}
        season={season}
        onSeasonChange={setSeason}
        split={split}
        onSplitChange={setSplit}
        park={park}
        onParkChange={setPark}
        homeAway={homeAway}
        onHomeAwayChange={setHomeAway}
        isFavorite={isFavorite}
        onToggleFavorite={() => toggleTeamFavorite(initialData.teamInfo.teamId)}
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

      <TeamKeyMetricsRow metrics={initialData.teamKeyMetrics} />

      <div className="grid gap-4 md:grid-cols-2">
        <TeamHrTrendCard data={initialData.teamHrTimeSeries} />
        <PitcherHrVulnerabilityCard
          rows={initialData.pitcherRows}
          teamName={initialData.teamInfo.teamName}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <UpcomingGamesCard games={initialData.upcomingGames} />
        <TeamSplitsCard
          overview={initialData.splits.overview}
          homeAway={initialData.splits.homeAway}
          lhpRhp={initialData.splits.lhpRhp}
          monthly={initialData.splits.monthly}
        />
      </div>

      <GameHrTable rows={initialData.gameRows} />
    </section>
  );
}
