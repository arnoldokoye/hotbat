/** @jsxImportSource react */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

type PlayerFiltersProps = {
  mode?: "db" | "csv";
  playerId: number | string;
  season: number;
  split: string;
  seasonOptions?: number[];
};

const DEFAULT_DB_SEASONS = [2024];
const DEFAULT_SPLITS = ["overall", "home", "away"];
const CSV_SPLITS = ["overall", "home", "away", "lhp", "rhp"];

export function PlayerFilters({
  mode = "db",
  playerId,
  season,
  split,
  seasonOptions,
}: PlayerFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (mode === "csv") {
      params.delete("playerId");
      params.set("player_id", String(playerId));
    } else {
      params.delete("player_id");
      params.set("playerId", String(playerId));
    }
    params.set(key, value);
    // Preserve the other param: if updating season, keep split; if updating split, keep season.
    if (key === "season" && !params.get("split")) {
      params.set("split", split);
    }
    if (key === "split" && !params.get("season")) {
      params.set("season", String(season));
    }
    router.replace(`/player?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select
        value={String(season)}
        onChange={(event) => updateParam("season", event.target.value)}
        className="w-32"
        data-testid="player-season-selector"
        aria-label="Player season selector"
      >
        {(mode === "csv"
          ? (seasonOptions?.length ? seasonOptions : DEFAULT_DB_SEASONS)
          : DEFAULT_DB_SEASONS
        ).map((option) => (
          <option key={option} value={String(option)}>
            {option}
          </option>
        ))}
      </Select>

      <Select
        value={split}
        onChange={(event) => updateParam("split", event.target.value)}
        className="w-40"
        data-testid="player-split-selector"
        aria-label="Player split selector"
      >
        {(mode === "csv" ? CSV_SPLITS : DEFAULT_SPLITS).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
