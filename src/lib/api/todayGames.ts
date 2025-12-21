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

const DEFAULT_TODAY_DATE = process.env.SEED_TODAY_DATE ?? "2024-06-15";

function resolveBaseUrl(explicit?: string) {
  if (explicit) return explicit;
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  const envHost =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    process.env.NEXTAUTH_URL;
  if (envHost) {
    return envHost.startsWith("http") ? envHost : `https://${envHost}`;
  }
  const port = process.env.PORT || "3000";
  return `http://127.0.0.1:${port}`;
}

export async function fetchTodayGames(
  date: string = DEFAULT_TODAY_DATE,
  baseUrl?: string,
): Promise<TodayGamesResponse> {
  await simulateNetworkLatency();
  const url = new URL("/api/today-games", resolveBaseUrl(baseUrl));
  url.searchParams.set("date", date);

  const res = await fetch(url.toString(), {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch today games: ${res.status} ${text}`);
  }
  return (await res.json()) as TodayGamesResponse;
}
