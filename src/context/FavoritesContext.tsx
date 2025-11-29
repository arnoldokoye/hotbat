"use client";

import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import {
  addFavoritePlayer,
  addFavoriteTeam,
  getFavoritePlayers,
  getFavoriteTeams,
  isPlayerFavorite,
  isTeamFavorite,
  removeFavoritePlayer,
  removeFavoriteTeam,
} from "@/lib/storage/favorites";
import {
  HotbatDefaults,
  getDefaults,
  setDefaults as setDefaultsStorage,
} from "@/lib/storage/defaults";

type FavoritesContextValue = {
  favoriteTeams: string[];
  favoritePlayers: string[];
  toggleTeamFavorite: (teamId: string) => void;
  togglePlayerFavorite: (playerId: string) => void;
  defaults: HotbatDefaults;
  setDefaults: (updater: (prev: HotbatDefaults) => HotbatDefaults) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>(() => getFavoriteTeams());
  const [favoritePlayers, setFavoritePlayers] = useState<string[]>(() => getFavoritePlayers());
  const [defaults, setDefaultsState] = useState<HotbatDefaults>(() => getDefaults());

  const setDefaults = (updater: (prev: HotbatDefaults) => HotbatDefaults) => {
    setDefaultsState((prev) => {
      const next = updater(prev);
      setDefaultsStorage(next);
      return next;
    });
  };

  const toggleTeamFavorite = (teamId: string) => {
    setFavoriteTeams((prev) => {
      const exists = isTeamFavorite(teamId);
      if (exists) {
        removeFavoriteTeam(teamId);
        return prev.filter((id) => id !== teamId);
      }
      addFavoriteTeam(teamId);
      return Array.from(new Set([...prev, teamId]));
    });
  };

  const togglePlayerFavorite = (playerId: string) => {
    setFavoritePlayers((prev) => {
      const exists = isPlayerFavorite(playerId);
      if (exists) {
        removeFavoritePlayer(playerId);
        return prev.filter((id) => id !== playerId);
      }
      addFavoritePlayer(playerId);
      return Array.from(new Set([...prev, playerId]));
    });
  };

  const value = useMemo<FavoritesContextValue>(
    () => ({
      favoriteTeams,
      favoritePlayers,
      toggleTeamFavorite,
      togglePlayerFavorite,
      defaults,
      setDefaults,
    }),
    [favoriteTeams, favoritePlayers, defaults],
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
