import { simulateNetworkLatency } from "./utils";

// Types aligned with docs/Backend_API_Contracts.md
export type TodayGamesResponse = {
  date: string;
  games: {
    id: number;
    date: string;
    startTimeLocal?: string;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamAbbrev: string;
    awayTeamAbbrev: string;
    homeTeamLogoUrl?: string;
    awayTeamLogoUrl?: string;
    parkName: string;
    parkHrFactor?: number;
    homePredictedHrMean?: number;
    awayPredictedHrMean?: number;
    hotbatScore?: number;
  }[];
};

export async function fetchTodayGames(date: string): Promise<TodayGamesResponse> {
  await simulateNetworkLatency();
  const res = await fetch(
    `/api/today-games?date=${encodeURIComponent(date)}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch today games: ${res.status} ${text}`);
  }
  return (await res.json()) as TodayGamesResponse;
}
