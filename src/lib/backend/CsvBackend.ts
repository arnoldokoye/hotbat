import type {
  DataBackend,
  GameSummary,
  PlayerDashboard,
  PlayerSummary,
  TeamDashboard,
  TeamSummary,
} from "@/lib/backend/DataBackend";
import { discoverDailyLogsSeasons } from "@/lib/csv/dailyLogs";
import { loadPlayerRegistry } from "@/lib/csv/playerRegistry";
import { loadTeams } from "@/lib/csv/teams";

export class CsvBackend implements DataBackend {
  async getPlayers(): Promise<PlayerSummary[]> {
    return loadPlayerRegistry();
  }

  async getTeams(): Promise<TeamSummary[]> {
    return loadTeams();
  }

  async getPlayerDashboard(_player_id: string, _season: number): Promise<PlayerDashboard> {
    throw new Error("CsvBackend.getPlayerDashboard not implemented yet.");
  }

  async getTeamDashboard(_team_id: string, _season: number): Promise<TeamDashboard> {
    throw new Error("CsvBackend.getTeamDashboard not implemented yet.");
  }

  async getGamesByDate(_date: string): Promise<GameSummary[]> {
    throw new Error("CsvBackend.getGamesByDate not implemented yet.");
  }

  async getAvailableSeasons(): Promise<number[]> {
    return discoverDailyLogsSeasons();
  }
}
