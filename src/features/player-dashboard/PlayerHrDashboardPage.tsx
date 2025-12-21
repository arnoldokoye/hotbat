"use client";

import { useEffect, useMemo, useState } from "react";
import type { PlayerDashboardData } from "@/lib/api/fetchPlayerDashboard";
import { useFavorites } from "@/context/FavoritesContext";
import { PlayerFiltersStrip } from "./components/PlayerFiltersStrip";
import { PlayerGameLogTable } from "./components/PlayerGameLogTable";
import { PlayerHeader } from "./components/PlayerHeader";
import { PlayerHrEventsTable } from "./components/PlayerHrEventsTable";
import { PlayerHrChart } from "./components/PlayerHrChart";
import { PlayerKeyMetricsRow } from "./components/PlayerKeyMetricsRow";
import { PlayerParkProfileCard } from "./components/PlayerParkProfileCard";
import { PlayerPitchDamageCard } from "./components/PlayerPitchDamageCard";
import { PlayerRecentFormCard } from "./components/PlayerRecentFormCard";
import { PlayerSplitsCard } from "./components/PlayerSplitsCard";
import { PlayerSplitHighlights } from "./components/PlayerSplitHighlights";

const metricOrder = ["HR", "xHR", "HR/PA", "Barrel%", "ISO", "HardHit%", "Avg EV"];

/**
 * PlayerHrDashboardPage renders the player-focused HR dashboard with mock data.
 */
export function PlayerHrDashboardPage({ initialData }: { initialData: PlayerDashboardData }) {
  const { favoritePlayers, togglePlayerFavorite, defaults, setDefaults } = useFavorites();

  const [season, setSeason] = useState(
    defaults.playerDashboardFilters?.season ?? initialData?.filters.defaultSeason,
  );
  const [split, setSplit] = useState(
    defaults.playerDashboardFilters?.split ?? initialData?.filters.defaultSplit,
  );
  const [dateRange, setDateRange] = useState(
    defaults.playerDashboardFilters?.dateRange ?? initialData?.filters.defaultDateRange,
  );
  const [pitchType, setPitchType] = useState(
    defaults.playerDashboardFilters?.pitchType ?? initialData?.filters.defaultPitchType,
  );
  const [pitcherHand, setPitcherHand] = useState("All");

  const isFavorite = initialData ? favoritePlayers.includes(initialData.playerInfo.playerId) : false;

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
    setDateRange(initialData?.filters.defaultDateRange ?? dateRange);
    setPitchType(initialData?.filters.defaultPitchType ?? pitchType);
    setPitcherHand("All");
  };

  const orderedMetrics = useMemo(
    () =>
      [...initialData.playerKeyMetrics].sort((a, b) => {
        const aIdx = metricOrder.indexOf(a.label);
        const bIdx = metricOrder.indexOf(b.label);
        return (aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx) -
          (bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx);
      }),
    [initialData.playerKeyMetrics],
  );

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
  }, [
    dateRange,
    initialData.filters.defaultDateRange,
    initialData.filters.defaultPitchType,
    initialData.playerInfo.playerId,
    pitchType,
    season,
    setDefaults,
    split,
  ]);

  return (
    <section className="space-y-6">
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

      <div className="mt-6 space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Key Metrics</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            HR quality and contact profile
          </p>
        </div>
        <PlayerKeyMetricsRow metrics={orderedMetrics} />
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">HR Trend</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Game-by-game HR and xHR signals
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <PlayerHrChart
            series={initialData.playerHrTimeSeries.map((point) => ({
              date: point.date,
              hr: point.hr,
              xHr: point.xHr,
              opponentTeamName: point.opponentTeamName,
              parkName: point.parkName,
            }))}
          />
          <PlayerPitchDamageCard rows={filteredPitchDamage} />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Streaks & Recent Form
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Quick view of the last five games
          </p>
        </div>
        <PlayerRecentFormCard
          recentGames={[...initialData.playerHrTimeSeries]
            .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
            .slice(0, 5)}
          summary={(() => {
            const sorted = [...initialData.playerHrTimeSeries].sort(
              (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf(),
            );
            const recent = sorted.slice(0, 5);
            const recentHrTotal = recent.reduce((sum, g) => sum + (g.hr ?? 0), 0);
            const recentXhrTotal = recent.reduce((sum, g) => sum + (g.xHr ?? 0), 0);
            let currentHrStreak = 0;
            for (const g of sorted) {
              if ((g.hr ?? 0) > 0) {
                currentHrStreak += 1;
              } else {
                break;
              }
            }
            return { recentHrTotal, recentXhrTotal, currentHrStreak };
          })()}
        />
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            Splits & Parks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Park profile and contextual splits
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <PlayerParkProfileCard rows={initialData.parkProfileRows} />
            <PlayerSplitHighlights
              overview={initialData.splits.overview}
              homeAway={initialData.splits.homeAway}
              lhpRhp={initialData.splits.lhpRhp}
            />
          </div>
          <PlayerSplitsCard
            overview={initialData.splits.overview}
            homeAway={initialData.splits.homeAway}
            lhpRhp={initialData.splits.lhpRhp}
            monthly={initialData.splits.monthly}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Game Log</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Game-by-game HR outcomes
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <PlayerGameLogTable rows={initialData.gameLog} />
          <PlayerHrEventsTable rows={filteredHrEvents} />
        </div>
      </div>
    </section>
  );
}
