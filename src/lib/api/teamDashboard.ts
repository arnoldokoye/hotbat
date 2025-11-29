import {
  defaultDateRange,
  defaultHomeAway,
  defaultMinPa,
  defaultPark,
  defaultPitcherHand,
  defaultSeason,
  defaultSplit,
  gameRows,
  pitcherRows,
  teamHrTimeSeries,
  teamInfo,
  teamKeyMetrics,
  teamSplitsHomeAway,
  teamSplitsLhpRhp,
  teamSplitsMonthly,
  teamSplitsOverview,
  upcomingGames,
} from "@/features/team-dashboard/mock/teamDashboardData";
import { simulateNetworkLatency } from "./utils";

export type TeamDashboardData = {
  teamInfo: typeof teamInfo;
  teamKeyMetrics: typeof teamKeyMetrics;
  teamHrTimeSeries: typeof teamHrTimeSeries;
  pitcherRows: typeof pitcherRows;
  upcomingGames: typeof upcomingGames;
  splits: {
    overview: typeof teamSplitsOverview;
    homeAway: typeof teamSplitsHomeAway;
    lhpRhp: typeof teamSplitsLhpRhp;
    monthly: typeof teamSplitsMonthly;
  };
  gameRows: typeof gameRows;
  filters: {
    defaultSeason: string;
    defaultSplit: string;
    defaultPark: string;
    defaultHomeAway: string;
    defaultDateRange: string;
    defaultPitcherHand: string;
    defaultMinPa: number;
  };
};

export async function fetchTeamDashboard(teamId: string): Promise<TeamDashboardData> {
  void teamId;
  await simulateNetworkLatency();

  return {
    teamInfo,
    teamKeyMetrics,
    teamHrTimeSeries,
    pitcherRows,
    upcomingGames,
    splits: {
      overview: teamSplitsOverview,
      homeAway: teamSplitsHomeAway,
      lhpRhp: teamSplitsLhpRhp,
      monthly: teamSplitsMonthly,
    },
    gameRows,
    filters: {
      defaultSeason,
      defaultSplit,
      defaultPark,
      defaultHomeAway,
      defaultDateRange,
      defaultPitcherHand,
      defaultMinPa,
    },
  };
}
