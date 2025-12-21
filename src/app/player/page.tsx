import { PlayerHrDashboardPage } from "@/features/player-dashboard/PlayerHrDashboardPage";
import { fetchPlayerDashboard } from "@/lib/api/fetchPlayerDashboard";
import { PlayerSelector } from "@/features/player-dashboard/components/PlayerSelector";
import { PlayerFilters } from "@/features/player-dashboard/components/PlayerFilters";

type PlayerPageProps = {
  searchParams: Promise<{
    playerId?: string;
    season?: string;
    split?: string;
  }>;
};

export default async function PlayerPage({ searchParams }: PlayerPageProps) {
  const params = await searchParams;
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

  const data = await fetchPlayerDashboard({ playerId, season, split });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <PlayerSelector
          currentPlayerId={playerId}
          season={season}
          split={split}
        />
        <PlayerFilters playerId={playerId} season={season} split={split} />
      </div>
      <PlayerHrDashboardPage initialData={data} />
    </div>
  );
}
