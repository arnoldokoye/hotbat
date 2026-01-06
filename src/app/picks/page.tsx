import fs from "node:fs/promises";
import path from "node:path";

import { fetchMlHrPicks } from "@/lib/baseline/fetchBaselineHrPicks";
import { getCsvDateIndex } from "@/lib/dataAvailability";
import { HrPicksPage } from "@/features/hr-picks/HrPicksPage";

type PicksPageProps =
  | { searchParams?: { date?: string } }
  | { searchParams?: Promise<{ date?: string }> };

type SeasonMeta = {
  complete?: boolean;
  covid_season?: boolean;
};

type ModelMeta = {
  model_version?: string;
  rankings_file?: string;
  generated_at?: string;
};

type ModelHealth = {
  status: "above" | "similar" | "below" | "baseline";
  label: string;
};

type YesterdayRecap =
  | { kind: "ml"; label: string }
  | { kind: "baseline"; label: string }
  | { kind: "missing"; label: null };

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

async function getModelVersion(): Promise<string | null> {
  try {
    const modelPath = path.join(process.cwd(), "scripts", "ml", "data", "model_versions.json");
    const text = await fs.readFile(modelPath, "utf8");
    const parsed = JSON.parse(text) as ModelMeta;
    if (!parsed || typeof parsed !== "object") return null;
    return parsed.model_version ?? null;
  } catch {
    return null;
  }
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
        continue;
      }
      inQuotes = !inQuotes;
      continue;
    }
    if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out;
}

async function getModelHealth(): Promise<ModelHealth | null> {
  try {
    const monitorPath = path.join(process.cwd(), "scripts", "ml", "data", "hr_picks_monitoring_v1.csv");
    const text = await fs.readFile(monitorPath, "utf8");
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return null;
    const header = splitCsvLine(lines[0]).map((h) => h.trim());
    const idx = new Map(header.map((h, i) => [h, i]));
    const last = splitCsvLine(lines[lines.length - 1]);

    const get = (key: string) => {
      const i = idx.get(key);
      return i === undefined ? "" : (last[i] ?? "").trim();
    };

    const mlTop5 = Number.parseFloat(get("top_5_hit_rate"));
    const baselineTop5 = Number.parseFloat(get("baseline_top_5_hit_rate"));
    const randomRate = Number.parseFloat(get("expected_random_rate"));

    if (!Number.isFinite(mlTop5)) return null;

    const hasBaseline = Number.isFinite(baselineTop5);
    const compare = hasBaseline ? baselineTop5 : Number.isFinite(randomRate) ? randomRate : null;
    if (compare === null) return null;

    const delta = mlTop5 - compare;
    if (delta >= 0.02) {
      return { status: "above", label: "Model status: Performing above baseline recently" };
    }
    if (delta <= -0.02) {
      return { status: "below", label: "Model status: Underperforming baseline recently" };
    }
    return { status: "similar", label: "Model status: Similar to baseline lately" };
  } catch {
    return null;
  }
}

async function getYesterdayRecap(targetDate: string | null): Promise<YesterdayRecap> {
  if (!targetDate) return { kind: "missing", label: null };
  try {
    const monitorPath = path.join(process.cwd(), "scripts", "ml", "data", "hr_picks_monitoring_v1.csv");
    const text = await fs.readFile(monitorPath, "utf8");
    const lines = text.trim().split(/\r?\n/).filter(Boolean);
    if (lines.length < 2) return { kind: "missing", label: null };
    const header = splitCsvLine(lines[0]).map((h) => h.trim());
    const idx = new Map(header.map((h, i) => [h, i]));
    const rows = lines.slice(1).map((line) => splitCsvLine(line));
    const dateIdx = idx.get("game_date");
    if (dateIdx === undefined) return { kind: "missing", label: null };
    const targetIndex = rows.findIndex((row) => (row[dateIdx] ?? "").trim() === targetDate);
    if (targetIndex <= 0) return { kind: "missing", label: null };
    const prev = rows[targetIndex - 1];

    const get = (key: string) => {
      const i = idx.get(key);
      return i === undefined ? "" : (prev[i] ?? "").trim();
    };

    const mlTop5 = Number.parseFloat(get("top_5_hit_rate"));
    const baselineTop5Raw = get("baseline_top_5_hit_rate");
    const baselineTop5 = Number.parseFloat(baselineTop5Raw);

    if (!Number.isFinite(mlTop5)) return { kind: "missing", label: null };
    if (!Number.isFinite(baselineTop5) && baselineTop5Raw === "") {
      const hits = Math.round(mlTop5 * 5);
      if (hits === 0) {
        return { kind: "ml", label: "Yesterday’s top-5 picks: no home runs (variance happens)" };
      }
      return { kind: "ml", label: `Yesterday’s top-5 picks: ${hits} hit a home run` };
    }

    const hits = Math.round(mlTop5 * 5);
    if (hits === 0) {
      return { kind: "ml", label: "Yesterday’s top-5 picks: no home runs (variance happens)" };
    }
    return { kind: "ml", label: `Yesterday’s top-5 picks: ${hits} hit a home run` };
  } catch {
    return { kind: "missing", label: null };
  }
}

export default async function PicksPage({ searchParams }: PicksPageProps) {
  const params =
    searchParams && typeof (searchParams as Promise<unknown>).then === "function"
      ? await (searchParams as Promise<{ date?: string }>)
      : (searchParams as { date?: string } | undefined) ?? {};

  const csvIndex = await getCsvDateIndex();
  const requestedDate = (params.date ?? "").trim();
  const effectiveDate =
    requestedDate && csvIndex.dates.includes(requestedDate)
      ? requestedDate
      : csvIndex.maxDate || "";
  const [seasonMetadata, modelVersion, recap] = await Promise.all([
    getSeasonMetadata(),
    getModelVersion(),
    getYesterdayRecap(effectiveDate || null),
  ]);

  let picksData;
  try {
    picksData = await fetchMlHrPicks(effectiveDate);
  } catch (error) {
    // Leave noisy logging to the server; keep client console clean for expected failures.
    console.warn("hr-picks page fetch warning", error);
    picksData = { date: effectiveDate, picks: [], availableDates: [] };
  }

  const mlActive = picksData.picks.some(
    (pick) =>
      pick.confidence_label ||
      pick.top_signal ||
      pick.player_recent_hr_rate !== null ||
      pick.pitcher_recent_hr_allowed_rate !== null,
  );
  const modelHealthRaw = mlActive ? await getModelHealth() : null;
  const modelHealth =
    modelHealthRaw ?? { status: "baseline", label: "Model status: Using baseline rankings" };
  const yesterdayRecap = mlActive
    ? recap
    : { kind: "baseline", label: "Yesterday’s picks used baseline rankings" };

  return (
    <HrPicksPage
      key={picksData.date}
      initialData={picksData}
      latestDate={csvIndex.maxDate || null}
      csvIndex={csvIndex}
      seasonMetadata={seasonMetadata ?? undefined}
      modelVersion={modelVersion}
      showModelBadge={process.env.NODE_ENV !== "production"}
      modelHealth={modelHealth}
      yesterdayRecap={yesterdayRecap.label}
    />
  );
}
