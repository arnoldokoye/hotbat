import { TeamHrDashboardPage } from "@/features/team-dashboard/TeamHrDashboardPage";
import { fetchTeamDashboard } from "@/lib/api/teamDashboard";

export default async function TeamPage() {
  const data = await fetchTeamDashboard("nyy");
  return <TeamHrDashboardPage initialData={data} />;
}
