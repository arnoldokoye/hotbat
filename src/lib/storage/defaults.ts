import { getItem, setItem } from "./localStorageSafe";

export type HotbatDefaults = {
  teamId?: string;
  playerId?: string;
  todayGamesDate?: string;
  teamDashboardFilters?: {
    season?: string;
    split?: string;
    dateRange?: string;
  };
  playerDashboardFilters?: {
    season?: string;
    split?: string;
    dateRange?: string;
    pitchType?: string;
  };
};

const DEFAULTS_KEY = "hotbat_defaults";

export function getDefaults(): HotbatDefaults {
  return getItem<HotbatDefaults>(DEFAULTS_KEY, {});
}

export function setDefaults(next: HotbatDefaults): void {
  setItem(DEFAULTS_KEY, next);
}

export function updateDefaults(partial: Partial<HotbatDefaults>): void {
  const current = getDefaults();
  const merged = { ...current, ...partial };
  setDefaults(merged);
}
