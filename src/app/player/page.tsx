import { PlayerHrDashboardPage } from "@/features/player-dashboard/PlayerHrDashboardPage";
import { fetchPlayerDashboard } from "@/lib/api/playerDashboard";

export default async function PlayerPage() {
  const data = await fetchPlayerDashboard("judge");
  return <PlayerHrDashboardPage initialData={data} />;
}
