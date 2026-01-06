import { Badge } from "@/components/ui/Badge";
import type { PlayerSplitRow } from "../mock/playerDashboardData";

type PlayerSplitHighlightsProps = {
  overview: PlayerSplitRow[];
  homeAway: PlayerSplitRow[];
  lhpRhp: PlayerSplitRow[];
};

type Highlight = {
  label: string;
  value: number;
};

function prettifyLabel(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower === "overall") return "Overall";
  if (lower === "home") return "Home";
  if (lower === "away") return "Away";
  if (lower === "lhp") return "vs LHP";
  if (lower === "rhp") return "vs RHP";
  if (raw.startsWith("month:")) {
    const month = raw.replace("month:", "");
    // Expect YYYY-MM; display as Mon YYYY when possible
    const [year, mm] = month.split("-");
    const monthIdx = Number(mm) - 1;
    if (!Number.isNaN(monthIdx)) {
      const date = new Date(Number(year), monthIdx, 1);
      return date.toLocaleString("en", { month: "short", year: "numeric" });
    }
    return month;
  }
  return raw;
}

function pickHighlights(rows: PlayerSplitRow[], prefix?: string): Highlight[] {
  if (!rows || rows.length === 0) return [];
  const filtered = rows.filter((row) => row.hrPerPa !== null);
  if (!filtered.length) return [];
  const sorted = [...filtered].sort((a, b) => (b.hrPerPa ?? 0) - (a.hrPerPa ?? 0));
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];
  const highlights: Highlight[] = [];
  if (best) {
    highlights.push({ label: prettifyLabel(best.label), value: best.hrPerPa ?? 0 });
  }
  if (worst && worst !== best) {
    highlights.push({ label: prettifyLabel(worst.label), value: worst.hrPerPa ?? 0 });
  }
  return highlights;
}

export function PlayerSplitHighlights({
  overview,
  homeAway,
  lhpRhp,
}: PlayerSplitHighlightsProps) {
  const highlights = [
    ...pickHighlights(overview),
    ...pickHighlights(homeAway),
    ...pickHighlights(lhpRhp),
  ].slice(0, 4);

  return (
    <div
      data-testid="player-split-highlights"
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Hot & Cold Splits
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Quick context on HR/PA</p>
        </div>
      </div>
      {highlights.length === 0 ? (
        <p className="text-sm text-slate-500 dark:text-slate-400">No split data available.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {highlights.map((item) => (
            <Badge key={item.label} variant="secondary" className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-700 dark:text-slate-100">
                {item.label}
              </span>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-800 dark:text-slate-100">
                {item.value.toFixed(3)} HR/PA
              </span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
