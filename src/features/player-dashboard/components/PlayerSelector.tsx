/** @jsxImportSource react */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const PLAYER_OPTIONS = [
  { id: 1, label: "Aaron Judge (NYY)" },
  { id: 2, label: "Juan Soto (NYY)" },
  { id: 3, label: "Rafael Devers (BOS)" },
  { id: 4, label: "Triston Casas (BOS)" },
];

type PlayerSelectorProps = {
  mode?: "db" | "csv";
  currentPlayerId: number | string;
  season: number;
  split: string;
};

type CsvPlayer = {
  player_id: string;
  player_name: string;
  bats: string | null;
  throws: string | null;
  first_season: number | null;
  last_season: number | null;
};

type PlayerSuggestion = {
  value: string;
  label: string;
  sublabel?: string;
};

function normalizeForSearch(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function boundedLevenshtein(a: string, b: string, maxDistance: number): number {
  if (a === b) return 0;
  if (!a.length || !b.length) return Math.max(a.length, b.length);
  if (Math.abs(a.length - b.length) > maxDistance) return maxDistance + 1;

  const prev = new Array(b.length + 1);
  const curr = new Array(b.length + 1);
  for (let j = 0; j <= b.length; j += 1) prev[j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;
    let minInRow = curr[0];
    const aChar = a.charCodeAt(i - 1);
    for (let j = 1; j <= b.length; j += 1) {
      const cost = aChar === b.charCodeAt(j - 1) ? 0 : 1;
      const del = prev[j] + 1;
      const ins = curr[j - 1] + 1;
      const sub = prev[j - 1] + cost;
      const v = Math.min(del, ins, sub);
      curr[j] = v;
      if (v < minInRow) minInRow = v;
    }
    if (minInRow > maxDistance) return maxDistance + 1;
    for (let j = 0; j <= b.length; j += 1) prev[j] = curr[j];
  }
  return prev[b.length];
}

function scoreSuggestion(query: string, candidate: PlayerSuggestion): number {
  const q = normalizeForSearch(query);
  if (!q) return 0;

  const qCompact = q.replace(/\s+/g, "");
  const labelNorm = normalizeForSearch(candidate.label);
  const labelCompact = labelNorm.replace(/\s+/g, "");
  const valueNorm = normalizeForSearch(candidate.value);

  if (valueNorm === qCompact) return -100;
  if (candidate.value.toLowerCase() === query.trim().toLowerCase()) return -95;
  if (candidate.value.toLowerCase().startsWith(query.trim().toLowerCase())) return -90;

  if (labelCompact === qCompact) return -80;
  if (labelNorm.startsWith(q)) return -70;
  if (labelNorm.includes(q)) return -60 + labelNorm.indexOf(q) / 100;

  const qTokens = q.split(/\s+/g).filter(Boolean);
  const tokens = labelNorm.split(/\s+/g).filter(Boolean);
  if (!qTokens.length || !tokens.length) return 999;

  // Token-level fuzzy match (handles minor misspellings and swapped first/last).
  let tokenDistanceSum = 0;
  for (const qt of qTokens) {
    let best = 3; // only allow small edits per token
    for (const t of tokens) {
      const maxEdits = qt.length <= 4 ? 1 : 2;
      const d = boundedLevenshtein(qt, t, maxEdits);
      if (d < best) best = d;
      if (best === 0) break;
    }
    tokenDistanceSum += best;
  }

  if (tokenDistanceSum <= qTokens.length * 2) {
    return 10 + tokenDistanceSum;
  }

  return 999;
}

export function PlayerSelector({
  mode = "db",
  currentPlayerId,
  season,
  split,
}: PlayerSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [csvPlayers, setCsvPlayers] = useState<CsvPlayer[] | null>(null);
  const currentId = String(currentPlayerId);
  const initialQuery =
    mode === "db"
      ? PLAYER_OPTIONS.find((opt) => String(opt.id) === currentId)?.label ?? currentId
      : currentId;
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (mode !== "csv") return;
    let alive = true;
    fetch("/api/players")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!alive) return;
        const players = Array.isArray(data) ? (data as CsvPlayer[]) : [];
        setCsvPlayers(players);
        const id = String(currentPlayerId);
        const selected = players.find((p) => p.player_id === id);
        if (selected) {
          setQuery((prev) => (prev.trim() === "" || prev.trim() === id ? selected.player_name : prev));
        }
      })
      .catch(() => {
        if (!alive) return;
        setCsvPlayers([]);
      });
    return () => {
      alive = false;
    };
  }, [currentPlayerId, mode]);

  const csvOptions = useMemo(() => {
    return (csvPlayers ?? [])
      .filter((p) => p.player_id && p.player_name)
      .sort((a, b) => a.player_name.localeCompare(b.player_name));
  }, [csvPlayers]);

  const dbSuggestions: PlayerSuggestion[] = useMemo(
    () => PLAYER_OPTIONS.map((opt) => ({ value: String(opt.id), label: opt.label })),
    [],
  );

  const csvSuggestions: PlayerSuggestion[] = useMemo(
    () =>
      csvOptions.map((p) => ({
        value: p.player_id,
        label: p.player_name,
        sublabel: p.player_id,
      })),
    [csvOptions],
  );

  const allSuggestions = mode === "csv" ? csvSuggestions : dbSuggestions;

  const ranked = useMemo(() => {
    if (!open) return [];
    const q = query.trim();
    const scored = allSuggestions
      .map((cand) => ({ cand, score: scoreSuggestion(q, cand) }))
      .filter((x) => (q ? x.score < 999 : true))
      .sort((a, b) => (a.score !== b.score ? a.score - b.score : a.cand.label.localeCompare(b.cand.label)));
    return scored.slice(0, 10).map((x) => x.cand);
  }, [allSuggestions, open, query]);

  const selectedLabel = allSuggestions.find((s) => s.value === currentId)?.label ?? currentId;

  const commitSelection = (value: string, label: string) => {
    setQuery(label);
    setOpen(false);
    setActiveIndex(0);

    const newParams = new URLSearchParams(searchParams.toString());
    if (mode === "csv") {
      newParams.delete("playerId");
      newParams.set("player_id", value);
    } else {
      newParams.delete("player_id");
      newParams.set("playerId", value);
    }
    newParams.set("season", String(season));
    newParams.set("split", split);
    router.replace(`/player?${newParams.toString()}`);
  };

  return (
    <div className="relative flex w-full max-w-md items-center gap-3">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Player
      </label>
      <div className="relative w-full">
        <input
          data-testid="player-selector"
          className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm transition hover:border-slate-300 focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-slate-700"
          value={query}
          placeholder="Search player (name or ID)…"
          onFocus={() => {
            setOpen(true);
            setActiveIndex(0);
          }}
          onBlur={() => {
            // Delay so click events on suggestions register.
            setTimeout(() => setOpen(false), 120);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (!open) return;
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((prev) => Math.min(prev + 1, Math.max(ranked.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((prev) => Math.max(prev - 1, 0));
            } else if (event.key === "Enter") {
              const pick = ranked[activeIndex] ?? ranked[0];
              if (pick) {
                event.preventDefault();
                commitSelection(pick.value, pick.label);
              } else if (query.trim() === selectedLabel) {
                // No-op: user hit enter without changing selection.
                event.preventDefault();
              }
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        />

        {open ? (
          <div
            data-testid="player-suggestions"
            className="absolute z-50 mt-2 max-h-72 w-full overflow-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            {mode === "csv" && csvPlayers === null ? (
              <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                Loading players…
              </div>
            ) : ranked.length === 0 ? (
              <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                No matches
              </div>
            ) : (
              ranked.map((s, idx) => (
                <button
                  key={s.value}
                  type="button"
                  data-testid="player-suggestion"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => commitSelection(s.value, s.label)}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                    idx === activeIndex
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
                      : "text-slate-800 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span className="font-medium">{s.label}</span>
                  {s.sublabel ? (
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {s.sublabel}
                    </span>
                  ) : null}
                </button>
              ))
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
