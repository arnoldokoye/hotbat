import { PlayerHrDashboardPage } from "@/features/player-dashboard/PlayerHrDashboardPage";
import { fetchPlayerDashboard } from "@/lib/api/fetchPlayerDashboard";

export default async function PlayerPage() {
  // Use seeded playerId (Aaron Judge) by default; can make this dynamic later.
  const data = await fetchPlayerDashboard({ playerId: 1, season: 2024, split: "overall" });
  return <PlayerHrDashboardPage initialData={data} />;
}
