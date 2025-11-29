"use client";

import { useEffect, useMemo, useState } from "react";
import type { PlayerDashboardData } from "@/lib/api/playerDashboard";
import { useFavorites } from "@/context/FavoritesContext";
import { PlayerFiltersStrip } from "./components/PlayerFiltersStrip";
import { PlayerGameLogTable } from "./components/PlayerGameLogTable";
import { PlayerHeader } from "./components/PlayerHeader";
import { PlayerHrEventsTable } from "./components/PlayerHrEventsTable";
import { PlayerHrTrendCard } from "./components/PlayerHrTrendCard";
import { PlayerKeyMetricsRow } from "./components/PlayerKeyMetricsRow";
import { PlayerParkProfileCard } from "./components/PlayerParkProfileCard";
import { PlayerPitchDamageCard } from "./components/PlayerPitchDamageCard";
import { PlayerSplitsCard } from "./components/PlayerSplitsCard";

/**
 * PlayerHrDashboardPage renders the player-focused HR dashboard with mock data.
 */
export function PlayerHrDashboardPage({ initialData }: { initialData: PlayerDashboardData }) {
  const { favoritePlayers, togglePlayerFavorite, defaults, setDefaults } = useFavorites();

  const [season, setSeason] = useState(
    defaults.playerDashboardFilters?.season ?? initialData.filters.defaultSeason,
  );
  const [split, setSplit] = useState(
    defaults.playerDashboardFilters?.split ?? initialData.filters.defaultSplit,
  );
  const [dateRange, setDateRange] = useState(
    defaults.playerDashboardFilters?.dateRange ?? initialData.filters.defaultDateRange,
  );
  const [pitchType, setPitchType] = useState(
    defaults.playerDashboardFilters?.pitchType ?? initialData.filters.defaultPitchType,
  );
  const [pitcherHand, setPitcherHand] = useState("All");

  const isFavorite = favoritePlayers.includes(playerInfo.playerId);

  const filteredPitchDamage = useMemo(() => {
    if (pitchType === "All") return initialData.pitchDamageRows;
    return initialData.pitchDamageRows.filter((row) => row.pitchType === pitchType);
  }, [initialData.pitchDamageRows, pitchType]);

  const filteredHrEvents = useMemo(() => {
    let rows = initialData.hrEvents;
    if (pitcherHand !== "All") {
      rows = rows.filter((row) => row.pitcherHand === (pitcherHand === "vs LHP" ? "L" : "R"));
    }
    if (pitchType !== "All") {
      rows = rows.filter((row) => row.pitchType === pitchType);
    }
    return rows;
  }, [initialData.hrEvents, pitchType, pitcherHand]);

  const handleResetFilters = () => {
    setDateRange(initialData.filters.defaultDateRange);
    setPitchType(initialData.filters.defaultPitchType);
    setPitcherHand("All");
  };

  useEffect(() => {
    setDefaults((prev) => ({
      ...prev,
      playerId: initialData.playerInfo.playerId,
      playerDashboardFilters: {
        ...prev.playerDashboardFilters,
        season,
        split,
        dateRange,
        pitchType,
      },
    }));
  }, [dateRange, initialData.filters.defaultDateRange, initialData.filters.defaultPitchType, initialData.playerInfo.playerId, pitchType, season, setDefaults, split]);

  return (
    <section className="space-y-5">
      <PlayerHeader
        playerInfo={initialData.playerInfo}
        season={season}
        onSeasonChange={setSeason}
        split={split}
        onSplitChange={setSplit}
        isFavorite={isFavorite}
        onToggleFavorite={() => togglePlayerFavorite(initialData.playerInfo.playerId)}
      />

      <PlayerFiltersStrip
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        pitchType={pitchType}
        onPitchTypeChange={setPitchType}
        pitcherHand={pitcherHand}
        onPitcherHandChange={setPitcherHand}
        onResetFilters={handleResetFilters}
      />

      <PlayerKeyMetricsRow metrics={initialData.playerKeyMetrics} />

      <div className="grid gap-4 md:grid-cols-2">
        <PlayerHrTrendCard data={initialData.playerHrTimeSeries} />
        <PlayerPitchDamageCard rows={filteredPitchDamage} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PlayerParkProfileCard rows={initialData.parkProfileRows} />
        <PlayerSplitsCard
          overview={initialData.splits.overview}
          homeAway={initialData.splits.homeAway}
          lhpRhp={initialData.splits.lhpRhp}
          monthly={initialData.splits.monthly}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PlayerGameLogTable rows={initialData.gameLog} />
        <PlayerHrEventsTable rows={filteredHrEvents} />
      </div>
    </section>
  );
}
