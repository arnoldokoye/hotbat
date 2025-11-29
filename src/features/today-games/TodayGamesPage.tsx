"use client";

import { useMemo, useState } from "react";
import { PageContainer } from "@/components/ui/PageContainer";
import { TodayGamesHeader } from "./components/TodayGamesHeader";
import { TodayGamesList } from "./components/TodayGamesList";
import { TodayGamesSummaryBar } from "./components/TodayGamesSummaryBar";
import { defaultDate, todayGames } from "./mock/todayGamesData";

/**
 * TodayGamesPage renders HR-focused context for today’s matchups.
 */
export function TodayGamesPage() {
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [teamQuery, setTeamQuery] = useState("");
  const [minHotBatScore, setMinHotBatScore] = useState(0);
  const [minParkHrFactor, setMinParkHrFactor] = useState(0);

  const filteredGames = useMemo(() => {
    return todayGames
      .filter((game) => game.date === selectedDate)
      .filter((game) =>
        teamQuery
          ? `${game.homeTeam} ${game.awayTeam}`.toLowerCase().includes(teamQuery.toLowerCase())
          : true,
      )
      .filter((game) => game.hotBatScore >= minHotBatScore)
      .filter((game) => game.parkHrFactor >= minParkHrFactor);
  }, [selectedDate, teamQuery, minHotBatScore, minParkHrFactor]);

  return (
    <PageContainer className="flex flex-col gap-5 py-6">
      <TodayGamesHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        teamQuery={teamQuery}
        onTeamQueryChange={setTeamQuery}
        minHotBatScore={minHotBatScore}
        onMinHotBatScoreChange={setMinHotBatScore}
        minParkHrFactor={minParkHrFactor}
        onMinParkHrFactorChange={setMinParkHrFactor}
        gamesCount={filteredGames.length}
      />

      <TodayGamesSummaryBar games={filteredGames} />

      <TodayGamesList games={filteredGames} />
    </PageContainer>
  );
}
