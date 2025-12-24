import type {
  DataBackend,
  GameSummary,
  PlayerDashboard,
  PlayerSummary,
  TeamDashboard,
  TeamSummary,
} from "@/lib/backend/DataBackend";
import { getDbSeasons } from "@/lib/dataAvailability";

export class DbBackend implements DataBackend {
  async getPlayers(): Promise<PlayerSummary[]> {
    throw new Error("DbBackend.getPlayers is not supported (Retrosheet IDs are not stored in the DB).");
  }

  async getTeams(): Promise<TeamSummary[]> {
    throw new Error("DbBackend.getTeams is not supported (Retrosheet IDs are not stored in the DB).");
  }

  async getPlayerDashboard(_player_id: string, _season: number): Promise<PlayerDashboard> {
    throw new Error("DbBackend.getPlayerDashboard not implemented yet.");
  }

  async getTeamDashboard(_team_id: string, _season: number): Promise<TeamDashboard> {
    throw new Error("DbBackend.getTeamDashboard not implemented yet.");
  }

  async getGamesByDate(_date: string): Promise<GameSummary[]> {
    throw new Error("DbBackend.getGamesByDate not implemented yet.");
  }

  async getAvailableSeasons(): Promise<number[]> {
    return getDbSeasons();
  }
}

