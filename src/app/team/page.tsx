import { TeamHrDashboardPage } from "@/features/team-dashboard/TeamHrDashboardPage";
import { fetchTeamDashboard } from "@/lib/api/teamDashboard";
import { headers } from "next/headers";

export default async function TeamPage() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : undefined;

  const data = await fetchTeamDashboard({
    teamId: 1,
    split: "overall",
    season: 2024,
    baseUrl,
  });
  return <TeamHrDashboardPage initialData={data} />;
}
