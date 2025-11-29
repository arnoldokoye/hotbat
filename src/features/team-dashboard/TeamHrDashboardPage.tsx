"use client";
import { useEffect, useState } from "react";
import { useFavorites } from "@/context/FavoritesContext";
import { TeamFiltersStrip } from "./components/TeamFiltersStrip";
import { TeamHeader } from "./components/TeamHeader";
import { TeamKeyMetricsRow } from "./components/TeamKeyMetricsRow";
import { GameHrTable } from "./components/GameHrTable";
import { PitcherHrVulnerabilityCard } from "./components/PitcherHrVulnerabilityCard";
import { TeamHrTrendCard } from "./components/TeamHrTrendCard";
import { TeamSplitsCard } from "./components/TeamSplitsCard";
import { UpcomingGamesCard } from "./components/UpcomingGamesCard";
import {
  defaultDateRange,
  defaultHomeAway,
  defaultMinPa,
  defaultPark,
  defaultPitcherHand,
  defaultSeason,
  defaultSplit,
  gameRows,
  pitcherRows,
  teamInfo,
  teamHrTimeSeries,
  teamKeyMetrics,
  teamSplitsHomeAway,
  teamSplitsLhpRhp,
  teamSplitsMonthly,
  teamSplitsOverview,
  upcomingGames,
} from "./mock/teamDashboardData";

export function TeamHrDashboardPage() {
  const { favoriteTeams, toggleTeamFavorite, defaults, setDefaults } = useFavorites();

  const [season, setSeason] = useState(defaults.teamDashboardFilters?.season ?? defaultSeason);
  const [split, setSplit] = useState(defaults.teamDashboardFilters?.split ?? defaultSplit);
  const [park, setPark] = useState(defaultPark);
  const [homeAway, setHomeAway] = useState(defaultHomeAway);

  const [dateRange, setDateRange] = useState(
    defaults.teamDashboardFilters?.dateRange ?? defaultDateRange,
  );
  const [pitcherHand, setPitcherHand] = useState(defaultPitcherHand);
  const [minPA, setMinPA] = useState(defaultMinPa);

  const isFavorite = favoriteTeams.includes(teamInfo.teamId);

  const handleResetFilters = () => {
    setDateRange(defaultDateRange);
    setPitcherHand(defaultPitcherHand);
    setMinPA(defaultMinPa);
  };

  useEffect(() => {
    setDefaults((prev) => ({
      ...prev,
      teamId: teamInfo.teamId,
      teamDashboardFilters: {
        ...prev.teamDashboardFilters,
        season,
        split,
        dateRange,
      },
    }));
  }, [dateRange, season, setDefaults, split]);

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
        onToggleFavorite={() => toggleTeamFavorite(teamInfo.teamId)}
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
        <TeamHrTrendCard data={teamHrTimeSeries} />
        <PitcherHrVulnerabilityCard rows={pitcherRows} teamName={teamInfo.teamName} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <UpcomingGamesCard games={upcomingGames} />
        <TeamSplitsCard
          overview={teamSplitsOverview}
          homeAway={teamSplitsHomeAway}
          lhpRhp={teamSplitsLhpRhp}
          monthly={teamSplitsMonthly}
        />
      </div>

      <GameHrTable rows={gameRows} />
    </section>
  );
}
