import fs from "node:fs/promises";
import path from "node:path";

import { fetchBaselineHrPicks } from "@/lib/baseline/fetchBaselineHrPicks";
import { getCsvDateIndex } from "@/lib/dataAvailability";
import { HrPicksPage } from "@/features/hr-picks/HrPicksPage";

type PicksPageProps =
  | { searchParams?: { date?: string } }
  | { searchParams?: Promise<{ date?: string }> };

type SeasonMeta = {
  complete?: boolean;
  covid_season?: boolean;
};

async function getSeasonMetadata(): Promise<Record<number, SeasonMeta> | null> {
  try {
    const seasonMetaPath = path.join(process.cwd(), "public", "data", "season_metadata.json");
    const text = await fs.readFile(seasonMetaPath, "utf8");
    const parsed = JSON.parse(text) as Record<string, SeasonMeta>;
    if (!parsed || typeof parsed !== "object") return null;

    const out: Record<number, SeasonMeta> = {};
    for (const [k, v] of Object.entries(parsed)) {
      const n = Number.parseInt(k, 10);
      if (!Number.isFinite(n)) continue;
      out[n] = v ?? {};
    }
    return out;
  } catch {
    return null;
  }
}

export default async function PicksPage({ searchParams }: PicksPageProps) {
  const params =
    searchParams && typeof (searchParams as Promise<unknown>).then === "function"
      ? await (searchParams as Promise<{ date?: string }>)
      : (searchParams as { date?: string } | undefined) ?? {};

  const [csvIndex, seasonMetadata] = await Promise.all([getCsvDateIndex(), getSeasonMetadata()]);
  const requestedDate = (params.date ?? "").trim();
  const effectiveDate =
    requestedDate && csvIndex.dates.includes(requestedDate)
      ? requestedDate
      : csvIndex.maxDate || "";

  let picksData;
  try {
    picksData = await fetchBaselineHrPicks(effectiveDate);
  } catch (error) {
    // Leave noisy logging to the server; keep client console clean for expected failures.
    console.warn("hr-picks page fetch warning", error);
    picksData = { date: effectiveDate, picks: [], availableDates: [] };
  }

  return (
    <HrPicksPage
      key={picksData.date}
      initialData={picksData}
      latestDate={csvIndex.maxDate || null}
      csvIndex={csvIndex}
      seasonMetadata={seasonMetadata ?? undefined}
    />
  );
}
