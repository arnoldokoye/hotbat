/** @jsxImportSource react */
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@/components/ui/Select";

type TeamSelectorProps = {
  currentTeamId: string;
  season: string;
  split: string;
};

type TeamOption = {
  team_id: string;
  team_name: string;
  league: string | null;
};

export function TeamSelector({ currentTeamId, season, split }: TeamSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teams, setTeams] = useState<TeamOption[] | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/teams")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (!alive) return;
        const list = Array.isArray(data) ? (data as TeamOption[]) : [];
        setTeams(list);
      })
      .catch(() => {
        if (!alive) return;
        setTeams([]);
      });
    return () => {
      alive = false;
    };
  }, []);

  const options = useMemo(() => {
    const list = teams ?? [];
    const sorted = [...list].sort((a, b) => a.team_name.localeCompare(b.team_name));
    if (sorted.some((team) => team.team_id === currentTeamId)) return sorted;
    if (!currentTeamId) return sorted;
    return [{ team_id: currentTeamId, team_name: currentTeamId, league: null }, ...sorted];
  }, [currentTeamId, teams]);

  const onChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("teamId");
    params.set("team_id", value);
    if (!params.get("season")) params.set("season", season);
    if (!params.get("split")) params.set("split", split);
    router.replace(`/team?${params.toString()}`);
  };

  return (
    <Select
      label="Team"
      value={currentTeamId}
      onChange={(event) => onChange(event.target.value)}
      data-testid="team-selector"
    >
      {options.length ? null : <option value="">Loading teams…</option>}
      {options.map((team) => (
        <option key={team.team_id} value={team.team_id}>
          {team.team_name}
        </option>
      ))}
    </Select>
  );
}
