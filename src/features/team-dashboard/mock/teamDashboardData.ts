export type TeamInfo = {
  teamId: string;
  teamName: string;
  teamLogoUrl: string;
  league: string;
  division: string;
};

export type TeamKeyMetric = {
  id: string;
  label: string;
  value: string;
  comparisonText: string;
  trendDirection?: "up" | "down" | "flat";
  trendValue?: string;
};

export const teamInfo: TeamInfo = {
  teamId: "nyy",
  teamName: "New York Yankees",
  teamLogoUrl:
    "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
  league: "American League",
  division: "AL East",
};

export const teamKeyMetrics: TeamKeyMetric[] = [
  {
    id: "hr-per-game",
    label: "Team HR/G",
    value: "1.34",
    comparisonText: "3rd in MLB (last 30 games)",
    trendDirection: "up",
    trendValue: "+0.12 vs season",
  },
  {
    id: "hr-vs-league",
    label: "HR% vs League",
    value: "+18%",
    comparisonText: "Above league average",
    trendDirection: "up",
    trendValue: "+3% vs last 14 days",
  },
  {
    id: "xhr-diff",
    label: "xHR Difference",
    value: "+6.2",
    comparisonText: "Overperforming expected by 6 HR",
    trendDirection: "flat",
  },
  {
    id: "top-park",
    label: "Top HR Park",
    value: "Yankee Stadium",
    comparisonText: "42% of team HRs hit here",
    trendDirection: "flat",
  },
];

export const defaultSeason = "2025";
export const defaultSplit = "Full Season";
export const defaultPark = "All Parks";
export const defaultHomeAway = "All Games";
export const defaultDateRange = "Last 30 days";
export const defaultPitcherHand = "All";
export const defaultMinPa = 25;
