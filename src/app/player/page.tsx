import { PlayerHrDashboardPage } from "@/features/player-dashboard/PlayerHrDashboardPage";
import { fetchPlayerDashboard } from "@/lib/api/fetchPlayerDashboard";
import { PlayerSelector } from "@/features/player-dashboard/components/PlayerSelector";
import { PlayerFilters } from "@/features/player-dashboard/components/PlayerFilters";
import { discoverDailyLogsSeasons } from "@/lib/csv/dailyLogs";
import { loadDailyBatting } from "@/lib/csv/dailyBatting";
import { redirect } from "next/navigation";

type PlayerPageProps = {
  searchParams: Promise<{
    playerId?: string;
    player_id?: string;
    season?: string;
    split?: string;
    date?: string;
  }>;
};

export default async function PlayerPage({ searchParams }: PlayerPageProps) {
  const params = await searchParams;
  const csvPlayerId = params?.player_id?.trim() ?? "";
  const defaultPlayerId = 1;
  const playerId =
    params?.playerId && !Number.isNaN(Number(params.playerId))
      ? Number(params.playerId)
      : defaultPlayerId;
  const season =
    params?.season && !Number.isNaN(Number(params.season))
      ? Number(params.season)
      : 2024;
  const split = params?.split ?? "overall";
  const date = params?.date?.trim() ?? "";

  if (!csvPlayerId && !params?.playerId) {
    const backend = (process.env.HOTBAT_BACKEND ?? "auto").toLowerCase();
    if (backend !== "db") {
      const csvSeasons = await discoverDailyLogsSeasons();
      const defaultSeason = csvSeasons.length ? csvSeasons[csvSeasons.length - 1] : season;
      const rows = await loadDailyBatting(defaultSeason);
      const withPa = rows.find((r) => r.b_pa > 0) ?? rows[0];
      if (withPa?.player_id) {
        const nextParams = new URLSearchParams();
        nextParams.set("player_id", withPa.player_id);
        nextParams.set("season", String(defaultSeason));
        nextParams.set("split", split);
        redirect(`/player?${nextParams.toString()}`);
      }
    }
  }

  const mode: "db" | "csv" = csvPlayerId ? "csv" : "db";
  const data = csvPlayerId
    ? await fetchPlayerDashboard({
        player_id: csvPlayerId,
        season,
        split,
        date: date || undefined,
      })
    : await fetchPlayerDashboard({ playerId, season, split });

  const csvSeasons = mode === "csv" ? await discoverDailyLogsSeasons() : [];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <PlayerSelector
          key={`${mode}:${mode === "csv" ? csvPlayerId : playerId}`}
          mode={mode}
          currentPlayerId={mode === "csv" ? csvPlayerId : playerId}
          season={season}
          split={split}
        />
        <PlayerFilters
          mode={mode}
          playerId={mode === "csv" ? csvPlayerId : playerId}
          season={season}
          split={split}
          seasonOptions={csvSeasons}
          availableDates={data.availableDates}
          availableMonths={data.availableMonths}
          currentDate={data.effectiveDate ?? date}
        />
      </div>
      <PlayerHrDashboardPage initialData={data} />
    </div>
  );
}
