import { TeamHrDashboardPage } from "@/features/team-dashboard/TeamHrDashboardPage";
import { fetchTeamDashboard } from "@/lib/api/teamDashboard";
import { discoverDailyLogsSeasons } from "@/lib/csv/dailyLogs";
import { loadDailyTeamStats } from "@/lib/csv/dailyTeamStats";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type TeamPageProps = {
  searchParams: Promise<{
    teamId?: string;
    team_id?: string;
    season?: string;
    split?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function TeamPage({ searchParams }: TeamPageProps) {
  const params = await searchParams;
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : undefined;

  const csvTeamId = params?.team_id?.trim() ?? "";
  const defaultTeamId = 1;
  const teamId =
    params?.teamId && !Number.isNaN(Number(params.teamId))
      ? Number(params.teamId)
      : defaultTeamId;
  const season =
    params?.season && !Number.isNaN(Number(params.season))
      ? Number(params.season)
      : 2024;
  const split = params?.split ?? "overall";

  if (!csvTeamId && !params?.teamId) {
    const backend = (process.env.HOTBAT_BACKEND ?? "auto").toLowerCase();
    if (backend !== "db") {
      const csvSeasons = await discoverDailyLogsSeasons();
      const defaultSeason = csvSeasons.length ? csvSeasons[csvSeasons.length - 1] : season;
      const rows = await loadDailyTeamStats(defaultSeason);
      const firstGame = rows[0];
      if (firstGame?.team_id) {
        const nextParams = new URLSearchParams();
        nextParams.set("team_id", firstGame.team_id);
        nextParams.set("season", String(defaultSeason));
        nextParams.set("split", split);
        redirect(`/team?${nextParams.toString()}`);
      }
    }
  }

  const data = csvTeamId
    ? await fetchTeamDashboard({
        teamId: csvTeamId,
        split,
        season,
        from: params?.from,
        to: params?.to,
        baseUrl,
      })
    : await fetchTeamDashboard({
        teamId,
        split,
        season,
        from: params?.from,
        to: params?.to,
        baseUrl,
      });
  return <TeamHrDashboardPage initialData={data} />;
}
