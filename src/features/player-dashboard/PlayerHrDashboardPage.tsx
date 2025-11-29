"use client";

import { useMemo, useState } from "react";
import { PlayerFiltersStrip } from "./components/PlayerFiltersStrip";
import { PlayerGameLogTable } from "./components/PlayerGameLogTable";
import { PlayerHeader } from "./components/PlayerHeader";
import { PlayerHrEventsTable } from "./components/PlayerHrEventsTable";
import { PlayerHrTrendCard } from "./components/PlayerHrTrendCard";
import { PlayerKeyMetricsRow } from "./components/PlayerKeyMetricsRow";
import { PlayerParkProfileCard } from "./components/PlayerParkProfileCard";
import { PlayerPitchDamageCard } from "./components/PlayerPitchDamageCard";
import { PlayerSplitsCard } from "./components/PlayerSplitsCard";
import {
  defaultDateRange,
  defaultPitchType,
  defaultPitcherHand,
  defaultSeason,
  defaultSplit,
  parkProfileRows,
  pitchDamageRows,
  playerGameLogRows,
  playerHrEventRows,
  playerHrTimeSeries,
  playerInfo,
  playerKeyMetrics,
  playerSplitsHomeAway,
  playerSplitsLhpRhp,
  playerSplitsMonthly,
  playerSplitsOverview,
} from "./mock/playerDashboardData";

/**
 * PlayerHrDashboardPage renders the player-focused HR dashboard with mock data.
 */
export function PlayerHrDashboardPage() {
  const [season, setSeason] = useState(defaultSeason);
  const [split, setSplit] = useState(defaultSplit);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [pitchType, setPitchType] = useState(defaultPitchType);
  const [pitcherHand, setPitcherHand] = useState(defaultPitcherHand);

  const filteredPitchDamage = useMemo(() => {
    if (pitchType === "All") return pitchDamageRows;
    return pitchDamageRows.filter((row) => row.pitchType === pitchType);
  }, [pitchType]);

  const filteredHrEvents = useMemo(() => {
    let rows = playerHrEventRows;
    if (pitcherHand !== "All") {
      rows = rows.filter((row) => row.pitcherHand === (pitcherHand === "vs LHP" ? "L" : "R"));
    }
    if (pitchType !== "All") {
      rows = rows.filter((row) => row.pitchType === pitchType);
    }
    return rows;
  }, [pitchType, pitcherHand]);

  const handleResetFilters = () => {
    setDateRange(defaultDateRange);
    setPitchType(defaultPitchType);
    setPitcherHand(defaultPitcherHand);
  };

  return (
    <section className="space-y-5">
      <PlayerHeader
        playerInfo={playerInfo}
        season={season}
        onSeasonChange={setSeason}
        split={split}
        onSplitChange={setSplit}
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

      <PlayerKeyMetricsRow metrics={playerKeyMetrics} />

      <div className="grid gap-4 md:grid-cols-2">
        <PlayerHrTrendCard data={playerHrTimeSeries} />
        <PlayerPitchDamageCard rows={filteredPitchDamage} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <PlayerParkProfileCard rows={parkProfileRows} />
        <PlayerSplitsCard
          overview={playerSplitsOverview}
          homeAway={playerSplitsHomeAway}
          lhpRhp={playerSplitsLhpRhp}
          monthly={playerSplitsMonthly}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <PlayerGameLogTable rows={playerGameLogRows} />
        <PlayerHrEventsTable rows={filteredHrEvents} />
      </div>
    </section>
  );
}
