export type BackendMode = "csv" | "db" | "auto";

export type Handedness = "L" | "R" | "B";
export type ThrowHand = "L" | "R";

export type PlayerSummary = {
  player_id: string; // Retrosheet player ID (e.g. "abrej003")
  player_name: string;
  first_name?: string;
  last_name?: string;
  bats: Handedness | null;
  throws: ThrowHand | null;
  first_season: number | null;
  last_season: number | null;
};

export type TeamSummary = {
  team_id: string; // Retrosheet team ID (e.g. "NYA")
  team_name: string;
  league: string | null;
};

export type GameSummary = {
  game_id: string; // Retrosheet gid
  game_date: string; // YYYY-MM-DD
  home_team_id: string;
  away_team_id: string;
  park_id: string;
  home_starting_pitcher_id: string | null;
  away_starting_pitcher_id: string | null;
};

// Dashboard shapes are currently sourced from DB-backed endpoints.
// We intentionally keep these as `unknown` for now while the CSV-backed equivalents are implemented.
export type PlayerDashboard = unknown;
export type TeamDashboard = unknown;

export interface DataBackend {
  getPlayers(): Promise<PlayerSummary[]>;
  getTeams(): Promise<TeamSummary[]>;

  getPlayerDashboard(player_id: string, season: number): Promise<PlayerDashboard>;
  getTeamDashboard(team_id: string, season: number): Promise<TeamDashboard>;

  getGamesByDate(date: string): Promise<GameSummary[]>;

  getAvailableSeasons(): Promise<number[]>;
}

export function parseBackendMode(value: unknown): BackendMode {
  if (value === "csv" || value === "db" || value === "auto") return value;
  return "auto";
}
