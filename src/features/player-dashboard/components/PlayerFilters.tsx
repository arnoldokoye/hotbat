/** @jsxImportSource react */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

const SEASON_OPTIONS = ["2024"];
const SPLIT_OPTIONS = ["overall", "home", "away", "month:2024-06"];

type PlayerFiltersProps = {
  playerId: number;
  season: number;
  split: string;
};

export function PlayerFilters({ playerId, season, split }: PlayerFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("playerId", String(playerId));
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
        {SEASON_OPTIONS.map((option) => (
          <option key={option} value={option}>
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
        {SPLIT_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </Select>
    </div>
  );
}
