"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fetchTodayGames, type TodayGamesData } from "@/lib/api/todayGames";
import { useFavorites } from "@/context/FavoritesContext";
import { PageContainer } from "@/components/ui/PageContainer";
import { TodayGamesHeader } from "./components/TodayGamesHeader";
import { TodayGamesList } from "./components/TodayGamesList";
import { TodayGamesSummaryBar } from "./components/TodayGamesSummaryBar";

/**
 * TodayGamesPage renders HR-focused context for today’s matchups.
 */
export function TodayGamesPage({ initialData }: { initialData: TodayGamesData }) {
  const { defaults, setDefaults } = useFavorites();

  const [gamesData, setGamesData] = useState(initialData);
  const [selectedDate, setSelectedDate] = useState(
    defaults.todayGamesDate ?? initialData.date,
  );
  const [teamQuery, setTeamQuery] = useState("");
  const [minHotBatScore, setMinHotBatScore] = useState(0);
  const [minParkHrFactor, setMinParkHrFactor] = useState(0);
  const [latestError, setLatestError] = useState("");
  const [isLoadingLatest, setIsLoadingLatest] = useState(false);
  const hasRefetchedOnce = useRef(false);

  const filteredGames = useMemo(
    () =>
      gamesData.games
        .filter((game) => game.date?.slice(0, 10) === selectedDate)
        .filter((game) =>
          teamQuery
            ? `${game.homeTeam} ${game.awayTeam}`.toLowerCase().includes(teamQuery.toLowerCase())
            : true,
        )
        .filter((game) => game.hotBatScore >= minHotBatScore)
        .filter((game) => game.parkHrFactor >= minParkHrFactor),
    [gamesData.games, minHotBatScore, minParkHrFactor, selectedDate, teamQuery],
  );

  const displayGames = filteredGames.length > 0 ? filteredGames : gamesData.games;
  const hasGamesForDate = displayGames.length > 0;

  useEffect(() => {
    if (gamesData.games.length === 0) return;
    const hasDate = gamesData.games.some(
      (game) => game.date?.slice(0, 10) === selectedDate,
    );
    if (!hasDate) {
      const firstDate = gamesData.games[0].date?.slice(0, 10);
      if (firstDate) {
        setSelectedDate(firstDate);
      }
    }
  }, [gamesData.games, selectedDate]);

  useEffect(() => {
    setDefaults((prev) => ({
      ...prev,
      todayGamesDate: selectedDate,
    }));
  }, [selectedDate, setDefaults]);

  useEffect(() => {
    const maybeRefetch = async () => {
      if (hasRefetchedOnce.current) return;
      if (gamesData.games.length > 0) return;
      hasRefetchedOnce.current = true;
      try {
        const refreshed = await fetchTodayGames(selectedDate);
        setGamesData(refreshed);
      } catch (error) {
        console.error("today games initial refetch failed", error);
      }
    };
    void maybeRefetch();
  }, [gamesData.games.length, selectedDate]);

  const handleLoadLatestSlate = async () => {
    setLatestError("");
    setIsLoadingLatest(true);
    try {
      const res = await fetch("/api/slates/latest");
      if (!res.ok) throw new Error("latest slate request failed");
      const body = (await res.json()) as { latestDate: string | null };
      if (!body.latestDate) {
        setLatestError("No historical slates available yet.");
        return;
      }
      const latest = await fetchTodayGames(body.latestDate);
      setGamesData(latest);
      setSelectedDate(body.latestDate);
    } catch (error) {
      console.error("load latest slate error", error);
      setLatestError("Unable to load the latest slate right now.");
    } finally {
      setIsLoadingLatest(false);
    }
  };

  return (
    <PageContainer
      className="flex flex-col gap-5 py-6"
      dataTestId="today-games"
    >
      <TodayGamesHeader
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        teamQuery={teamQuery}
        onTeamQueryChange={setTeamQuery}
        minHotBatScore={minHotBatScore}
        onMinHotBatScoreChange={setMinHotBatScore}
        minParkHrFactor={minParkHrFactor}
        onMinParkHrFactorChange={setMinParkHrFactor}
        gamesCount={displayGames.length}
      />

      {hasGamesForDate ? (
        <>
          <TodayGamesSummaryBar games={displayGames} />
          <TodayGamesList games={displayGames} />
        </>
      ) : (
        <div
          className="flex flex-col items-start gap-3 rounded-xl border border-dashed border-slate-300 bg-white/60 px-6 py-6 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
          data-testid="today-empty-state"
        >
          <p className="text-sm font-semibold">No games scheduled for this date.</p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              onClick={handleLoadLatestSlate}
              disabled={isLoadingLatest}
              data-testid="load-latest-slate"
            >
              {isLoadingLatest ? "Loading..." : "Load last available slate"}
            </button>
            {latestError ? (
              <span className="text-sm text-rose-500 dark:text-rose-300">{latestError}</span>
            ) : null}
          </div>
        </div>
      )}
    </PageContainer>
  );
}
