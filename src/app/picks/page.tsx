import { headers } from "next/headers";
import { fetchHrPicks } from "@/lib/api/fetchHrPicks";
import { HrPicksPage } from "@/features/hr-picks/HrPicksPage";

type PicksPageProps =
  | { searchParams?: { date?: string } }
  | { searchParams?: Promise<{ date?: string }> };

async function fetchLatestDate(baseUrl?: string): Promise<string | null> {
  try {
    const url = new URL("/api/slates/latest", baseUrl || "http://127.0.0.1:3000");
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    const data = (await res.json()) as { latestDate: string | null };
    return data.latestDate ?? null;
  } catch {
    return null;
  }
}

export default async function PicksPage({ searchParams }: PicksPageProps) {
  const params =
    searchParams && typeof (searchParams as Promise<unknown>).then === "function"
      ? await (searchParams as Promise<{ date?: string }>)
      : (searchParams as { date?: string } | undefined) ?? {};

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : undefined;

  const latestDate = await fetchLatestDate(baseUrl);
  const effectiveDate = params.date ?? latestDate ?? "";

  let picksData;
  try {
    picksData = effectiveDate
      ? await fetchHrPicks(effectiveDate, baseUrl)
      : { date: "", picks: [] };
  } catch (error) {
    console.error("hr-picks page fetch error", error);
    picksData = { date: effectiveDate, picks: [] };
  }

  return <HrPicksPage initialData={picksData} latestDate={latestDate} />;
}
