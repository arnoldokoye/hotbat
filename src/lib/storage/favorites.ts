import { getItem, setItem } from "./localStorageSafe";

const FAVORITE_TEAMS_KEY = "hotbat_favorite_teams";
const FAVORITE_PLAYERS_KEY = "hotbat_favorite_players";

const unique = (values: string[]) => Array.from(new Set(values));

export function getFavoriteTeams(): string[] {
  return getItem<string[]>(FAVORITE_TEAMS_KEY, []);
}

export function addFavoriteTeam(teamId: string): void {
  const next = unique([...getFavoriteTeams(), teamId]);
  setItem(FAVORITE_TEAMS_KEY, next);
}

export function removeFavoriteTeam(teamId: string): void {
  const next = getFavoriteTeams().filter((id) => id !== teamId);
  setItem(FAVORITE_TEAMS_KEY, next);
}

export function isTeamFavorite(teamId: string): boolean {
  return getFavoriteTeams().includes(teamId);
}

export function getFavoritePlayers(): string[] {
  return getItem<string[]>(FAVORITE_PLAYERS_KEY, []);
}

export function addFavoritePlayer(playerId: string): void {
  const next = unique([...getFavoritePlayers(), playerId]);
  setItem(FAVORITE_PLAYERS_KEY, next);
}

export function removeFavoritePlayer(playerId: string): void {
  const next = getFavoritePlayers().filter((id) => id !== playerId);
  setItem(FAVORITE_PLAYERS_KEY, next);
}

export function isPlayerFavorite(playerId: string): boolean {
  return getFavoritePlayers().includes(playerId);
}
