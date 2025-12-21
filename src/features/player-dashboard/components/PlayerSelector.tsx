/** @jsxImportSource react */
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

const PLAYER_OPTIONS = [
  { id: 1, label: "Aaron Judge (NYY)" },
  { id: 2, label: "Juan Soto (NYY)" },
  { id: 3, label: "Rafael Devers (BOS)" },
  { id: 4, label: "Triston Casas (BOS)" },
];

type PlayerSelectorProps = {
  currentPlayerId: number;
  season: number;
  split: string;
};

export function PlayerSelector({ currentPlayerId, season, split }: PlayerSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("playerId", value);
    newParams.set("season", String(season));
    newParams.set("split", split);
    router.replace(`/player?${newParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Player
      </label>
      <Select
        value={String(currentPlayerId)}
        data-testid="player-selector"
        onChange={(event) => handleChange(event.target.value)}
        className="w-64"
      >
        {PLAYER_OPTIONS.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </Select>
    </div>
  );
}
