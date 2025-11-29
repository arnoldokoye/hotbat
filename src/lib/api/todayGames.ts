import { defaultDate, todayGames } from "@/features/today-games/mock/todayGamesData";
import { simulateNetworkLatency } from "./utils";

export type TodayGamesData = {
  date: string;
  games: typeof todayGames;
};

export async function fetchTodayGames(date?: string): Promise<TodayGamesData> {
  await simulateNetworkLatency();
  const effectiveDate = date ?? defaultDate;
  return {
    date: effectiveDate,
    games: todayGames,
  };
}
