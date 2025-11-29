import {
  defaultDateRange,
  defaultPitchType,
  defaultSeason,
  defaultSplit,
  parkProfileRows,
  pitchDamageRows,
  playerGameLogRows,
  playerHrEventRows,
  playerHrTimeSeries,
  playerInfo,
  playerKeyMetrics,
  playerSplitsHomeAway,
  playerSplitsLhpRhp,
  playerSplitsMonthly,
  playerSplitsOverview,
} from "@/features/player-dashboard/mock/playerDashboardData";
import { simulateNetworkLatency } from "./utils";

export type PlayerDashboardData = {
  playerInfo: typeof playerInfo;
  playerKeyMetrics: typeof playerKeyMetrics;
  playerHrTimeSeries: typeof playerHrTimeSeries;
  pitchDamageRows: typeof pitchDamageRows;
  parkProfileRows: typeof parkProfileRows;
  splits: {
    overview: typeof playerSplitsOverview;
    homeAway: typeof playerSplitsHomeAway;
    lhpRhp: typeof playerSplitsLhpRhp;
    monthly: typeof playerSplitsMonthly;
  };
  gameLog: typeof playerGameLogRows;
  hrEvents: typeof playerHrEventRows;
  filters: {
    defaultSeason: string;
    defaultSplit: string;
    defaultDateRange: string;
    defaultPitchType: string;
  };
};

export async function fetchPlayerDashboard(playerId: string): Promise<PlayerDashboardData> {
  void playerId;
  await simulateNetworkLatency();

  return {
    playerInfo,
    playerKeyMetrics,
    playerHrTimeSeries,
    pitchDamageRows,
    parkProfileRows,
    splits: {
      overview: playerSplitsOverview,
      homeAway: playerSplitsHomeAway,
      lhpRhp: playerSplitsLhpRhp,
      monthly: playerSplitsMonthly,
    },
    gameLog: playerGameLogRows,
    hrEvents: playerHrEventRows,
    filters: {
      defaultSeason,
      defaultSplit,
      defaultDateRange,
      defaultPitchType,
    },
  };
}
