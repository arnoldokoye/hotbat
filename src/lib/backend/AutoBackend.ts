import type {
  BackendMode,
  DataBackend,
  GameSummary,
  PlayerDashboard,
  PlayerSummary,
  TeamDashboard,
  TeamSummary,
} from "@/lib/backend/DataBackend";
import { CsvBackend } from "@/lib/backend/CsvBackend";
import { DbBackend } from "@/lib/backend/DbBackend";

async function preferCsv<T>(csvFn: () => Promise<T>, dbFn: () => Promise<T>): Promise<T> {
  try {
    return await csvFn();
  } catch {
    return dbFn();
  }
}

export class AutoBackend implements DataBackend {
  private readonly csv = new CsvBackend();
  private readonly db = new DbBackend();

  async getPlayers(): Promise<PlayerSummary[]> {
    return preferCsv(() => this.csv.getPlayers(), () => this.db.getPlayers());
  }

  async getTeams(): Promise<TeamSummary[]> {
    return preferCsv(() => this.csv.getTeams(), () => this.db.getTeams());
  }

  async getPlayerDashboard(player_id: string, season: number): Promise<PlayerDashboard> {
    return preferCsv(
      () => this.csv.getPlayerDashboard(player_id, season),
      () => this.db.getPlayerDashboard(player_id, season),
    );
  }

  async getTeamDashboard(team_id: string, season: number): Promise<TeamDashboard> {
    return preferCsv(
      () => this.csv.getTeamDashboard(team_id, season),
      () => this.db.getTeamDashboard(team_id, season),
    );
  }

  async getGamesByDate(date: string): Promise<GameSummary[]> {
    return preferCsv(() => this.csv.getGamesByDate(date), () => this.db.getGamesByDate(date));
  }

  async getAvailableSeasons(): Promise<number[]> {
    return preferCsv(() => this.csv.getAvailableSeasons(), () => this.db.getAvailableSeasons());
  }
}

export function resolveBackendMode(raw: unknown): BackendMode {
  if (raw === "csv" || raw === "db" || raw === "auto") return raw;
  return "auto";
}
