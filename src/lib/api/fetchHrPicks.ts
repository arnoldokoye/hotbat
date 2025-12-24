import { simulateNetworkLatency } from "./utils";

export type HrPick = {
  rank: number;
  playerId: number;
  playerName: string;
  teamAbbrev: string;
  hotbatScore: number;
  pickScore: number;
  reasons: string[];
  parkName?: string;
  parkHrFactor?: number;
  hrPerPa?: number;
  seasonHr?: number;
};

export type HrPicksResponse = {
  date: string;
  picks: HrPick[];
};

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

export async function fetchHrPicks(
  date: string,
  baseUrl?: string,
): Promise<HrPicksResponse> {
  await simulateNetworkLatency();

  const url = new URL("/api/hr-picks", resolveBaseUrl(baseUrl));
  url.searchParams.set("date", date);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    const isExpected =
      res.headers.get("x-hotbat-error") === "1" || res.status >= 500;
    const body = await res.json().catch(() => null);
    const message = body?.error ?? `Failed to fetch HR picks: ${res.status}`;
    if (isExpected) {
      return { date, picks: [] };
    }
    throw new Error(message);
  }
  return (await res.json()) as HrPicksResponse;
}
