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

export type TeamHrTimePoint = {
  date: string;
  hr: number;
  xHr: number;
  avgEv: number;
  barrels: number;
};

export type PitcherRow = {
  pitcherName: string;
  pitcherTeam: string;
  hrAllowed: number;
  hrPer9: number;
  avgEvAllowed: number;
  maxDistance: number;
};

export type UpcomingGame = {
  date: string;
  opponentName: string;
  opponentLogoUrl?: string;
  parkName: string;
  parkHrFactor: number;
  projectedHrMin: number;
  projectedHrMax: number;
};

export type TeamSplitRow = {
  label: string;
  hrPerGame: number;
  leagueAvgHrPerGame?: number;
};

export type GameRow = {
  id: string;
  date: string;
  opponent: string;
  park: string;
  result: string;
  hr: number;
  xHr: number;
  hrDiff: number;
  opposingSp: string;
  opposingSpHr9: number;
};

export const teamHrTimeSeries: TeamHrTimePoint[] = [
  { date: "2025-03-30", hr: 2, xHr: 1.6, avgEv: 90.8, barrels: 3 },
  { date: "2025-04-02", hr: 1, xHr: 1.2, avgEv: 89.1, barrels: 2 },
  { date: "2025-04-05", hr: 0, xHr: 0.7, avgEv: 87.4, barrels: 1 },
  { date: "2025-04-08", hr: 3, xHr: 2.1, avgEv: 92.3, barrels: 4 },
  { date: "2025-04-11", hr: 2, xHr: 1.5, avgEv: 91.5, barrels: 3 },
  { date: "2025-04-14", hr: 1, xHr: 1.0, avgEv: 88.9, barrels: 2 },
  { date: "2025-04-17", hr: 2, xHr: 1.8, avgEv: 90.7, barrels: 3 },
  { date: "2025-04-20", hr: 1, xHr: 1.3, avgEv: 89.8, barrels: 2 },
  { date: "2025-04-23", hr: 4, xHr: 2.9, avgEv: 93.1, barrels: 5 },
  { date: "2025-04-26", hr: 2, xHr: 1.9, avgEv: 91.0, barrels: 3 },
  { date: "2025-04-29", hr: 1, xHr: 1.4, avgEv: 90.2, barrels: 2 },
  { date: "2025-05-02", hr: 3, xHr: 2.2, avgEv: 92.0, barrels: 4 },
  { date: "2025-05-05", hr: 2, xHr: 1.7, avgEv: 91.3, barrels: 3 },
  { date: "2025-05-08", hr: 1, xHr: 1.1, avgEv: 89.0, barrels: 2 },
  { date: "2025-05-11", hr: 2, xHr: 1.8, avgEv: 90.9, barrels: 3 },
  { date: "2025-05-14", hr: 3, xHr: 2.4, avgEv: 92.5, barrels: 4 },
  { date: "2025-05-17", hr: 1, xHr: 1.2, avgEv: 88.7, barrels: 2 },
  { date: "2025-05-20", hr: 2, xHr: 1.6, avgEv: 90.5, barrels: 3 },
];

export const pitcherRows: PitcherRow[] = [
  { pitcherName: "Chris Bassett", pitcherTeam: "TOR", hrAllowed: 6, hrPer9: 1.45, avgEvAllowed: 90.8, maxDistance: 422 },
  { pitcherName: "Nick Pivetta", pitcherTeam: "BOS", hrAllowed: 5, hrPer9: 1.38, avgEvAllowed: 91.4, maxDistance: 438 },
  { pitcherName: "Logan Gilbert", pitcherTeam: "SEA", hrAllowed: 4, hrPer9: 1.12, avgEvAllowed: 89.7, maxDistance: 410 },
  { pitcherName: "Carlos Rodón", pitcherTeam: "NYY", hrAllowed: 3, hrPer9: 0.98, avgEvAllowed: 88.5, maxDistance: 401 },
  { pitcherName: "Kyle Gibson", pitcherTeam: "STL", hrAllowed: 5, hrPer9: 1.32, avgEvAllowed: 90.1, maxDistance: 427 },
  { pitcherName: "Clarke Schmidt", pitcherTeam: "NYY", hrAllowed: 3, hrPer9: 1.05, avgEvAllowed: 89.0, maxDistance: 403 },
  { pitcherName: "Michael Wacha", pitcherTeam: "KC", hrAllowed: 4, hrPer9: 1.21, avgEvAllowed: 89.9, maxDistance: 415 },
  { pitcherName: "Yusei Kikuchi", pitcherTeam: "TOR", hrAllowed: 4, hrPer9: 1.18, avgEvAllowed: 90.3, maxDistance: 419 },
];

export const upcomingGames: UpcomingGame[] = [
  {
    date: "2025-05-22",
    opponentName: "Boston Red Sox",
    opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
    parkName: "Fenway Park",
    parkHrFactor: 1.12,
    projectedHrMin: 1,
    projectedHrMax: 3,
  },
  {
    date: "2025-05-24",
    opponentName: "Toronto Blue Jays",
    opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/tor.png",
    parkName: "Rogers Centre",
    parkHrFactor: 1.08,
    projectedHrMin: 1,
    projectedHrMax: 2,
  },
  {
    date: "2025-05-27",
    opponentName: "Baltimore Orioles",
    opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bal.png",
    parkName: "Camden Yards",
    parkHrFactor: 0.95,
    projectedHrMin: 0,
    projectedHrMax: 2,
  },
  {
    date: "2025-05-30",
    opponentName: "Los Angeles Dodgers",
    opponentLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
    parkName: "Dodger Stadium",
    parkHrFactor: 0.98,
    projectedHrMin: 1,
    projectedHrMax: 2,
  },
];

export const teamSplitsOverview: TeamSplitRow[] = [
  { label: "HR/G (Season)", hrPerGame: 1.34, leagueAvgHrPerGame: 1.08 },
  { label: "Last 30 Days HR/G", hrPerGame: 1.42, leagueAvgHrPerGame: 1.11 },
  { label: "Home HR/G", hrPerGame: 1.48, leagueAvgHrPerGame: 1.12 },
  { label: "Away HR/G", hrPerGame: 1.19, leagueAvgHrPerGame: 1.05 },
  { label: "vs LHP HR/G", hrPerGame: 1.27, leagueAvgHrPerGame: 1.02 },
  { label: "vs RHP HR/G", hrPerGame: 1.36, leagueAvgHrPerGame: 1.09 },
];

export const teamSplitsHomeAway: TeamSplitRow[] = [
  { label: "Home HR/G", hrPerGame: 1.48, leagueAvgHrPerGame: 1.12 },
  { label: "Away HR/G", hrPerGame: 1.19, leagueAvgHrPerGame: 1.05 },
  { label: "Home xHR/G", hrPerGame: 1.30, leagueAvgHrPerGame: 1.06 },
  { label: "Away xHR/G", hrPerGame: 1.11, leagueAvgHrPerGame: 1.00 },
];

export const teamSplitsLhpRhp: TeamSplitRow[] = [
  { label: "vs LHP HR/G", hrPerGame: 1.27, leagueAvgHrPerGame: 1.02 },
  { label: "vs RHP HR/G", hrPerGame: 1.36, leagueAvgHrPerGame: 1.09 },
  { label: "vs LHP xHR/G", hrPerGame: 1.15, leagueAvgHrPerGame: 1.01 },
  { label: "vs RHP xHR/G", hrPerGame: 1.18, leagueAvgHrPerGame: 1.04 },
];

export const teamSplitsMonthly: TeamSplitRow[] = [
  { label: "March/April HR/G", hrPerGame: 1.25, leagueAvgHrPerGame: 1.05 },
  { label: "May HR/G", hrPerGame: 1.41, leagueAvgHrPerGame: 1.10 },
  { label: "June HR/G (proj)", hrPerGame: 1.36, leagueAvgHrPerGame: 1.09 },
];

export const gameRows: GameRow[] = [
  {
    id: "nyy-2025-03-30-bos",
    date: "2025-03-30",
    opponent: "BOS",
    park: "Yankee Stadium",
    result: "W 6-3",
    hr: 2,
    xHr: 1.6,
    hrDiff: 0.4,
    opposingSp: "Brayan Bello",
    opposingSpHr9: 1.12,
  },
  {
    id: "nyy-2025-04-02-bos",
    date: "2025-04-02",
    opponent: "BOS",
    park: "Yankee Stadium",
    result: "L 2-4",
    hr: 1,
    xHr: 1.2,
    hrDiff: -0.2,
    opposingSp: "Nick Pivetta",
    opposingSpHr9: 1.38,
  },
  {
    id: "nyy-2025-04-05-kc",
    date: "2025-04-05",
    opponent: "KC",
    park: "Kauffman Stadium",
    result: "W 5-1",
    hr: 0,
    xHr: 0.7,
    hrDiff: -0.7,
    opposingSp: "Cole Ragans",
    opposingSpHr9: 0.95,
  },
  {
    id: "nyy-2025-04-08-tor",
    date: "2025-04-08",
    opponent: "TOR",
    park: "Rogers Centre",
    result: "W 7-4",
    hr: 3,
    xHr: 2.1,
    hrDiff: 0.9,
    opposingSp: "Kevin Gausman",
    opposingSpHr9: 1.15,
  },
  {
    id: "nyy-2025-04-11-min",
    date: "2025-04-11",
    opponent: "MIN",
    park: "Target Field",
    result: "L 3-5",
    hr: 2,
    xHr: 1.5,
    hrDiff: 0.5,
    opposingSp: "Joe Ryan",
    opposingSpHr9: 1.22,
  },
  {
    id: "nyy-2025-04-14-tex",
    date: "2025-04-14",
    opponent: "TEX",
    park: "Globe Life Field",
    result: "W 4-2",
    hr: 1,
    xHr: 1.0,
    hrDiff: 0.0,
    opposingSp: "Nathan Eovaldi",
    opposingSpHr9: 1.10,
  },
  {
    id: "nyy-2025-04-17-bal",
    date: "2025-04-17",
    opponent: "BAL",
    park: "Yankee Stadium",
    result: "W 6-2",
    hr: 2,
    xHr: 1.8,
    hrDiff: 0.2,
    opposingSp: "Kyle Bradish",
    opposingSpHr9: 1.05,
  },
  {
    id: "nyy-2025-04-20-bal",
    date: "2025-04-20",
    opponent: "BAL",
    park: "Yankee Stadium",
    result: "L 3-5",
    hr: 1,
    xHr: 1.3,
    hrDiff: -0.3,
    opposingSp: "Grayson Rodriguez",
    opposingSpHr9: 1.28,
  },
  {
    id: "nyy-2025-04-23-ana",
    date: "2025-04-23",
    opponent: "LAA",
    park: "Angel Stadium",
    result: "W 8-4",
    hr: 4,
    xHr: 2.9,
    hrDiff: 1.1,
    opposingSp: "Patrick Sandoval",
    opposingSpHr9: 1.20,
  },
  {
    id: "nyy-2025-04-26-lad",
    date: "2025-04-26",
    opponent: "LAD",
    park: "Dodger Stadium",
    result: "W 5-3",
    hr: 2,
    xHr: 1.9,
    hrDiff: 0.1,
    opposingSp: "Walker Buehler",
    opposingSpHr9: 1.05,
  },
  {
    id: "nyy-2025-04-29-sea",
    date: "2025-04-29",
    opponent: "SEA",
    park: "T-Mobile Park",
    result: "L 2-3",
    hr: 1,
    xHr: 1.4,
    hrDiff: -0.4,
    opposingSp: "Logan Gilbert",
    opposingSpHr9: 1.12,
  },
  {
    id: "nyy-2025-05-02-oak",
    date: "2025-05-02",
    opponent: "OAK",
    park: "Oakland Coliseum",
    result: "W 6-1",
    hr: 3,
    xHr: 2.2,
    hrDiff: 0.8,
    opposingSp: "JP Sears",
    opposingSpHr9: 1.30,
  },
  {
    id: "nyy-2025-05-05-ari",
    date: "2025-05-05",
    opponent: "ARI",
    park: "Chase Field",
    result: "W 5-4",
    hr: 2,
    xHr: 1.7,
    hrDiff: 0.3,
    opposingSp: "Zac Gallen",
    opposingSpHr9: 1.00,
  },
  {
    id: "nyy-2025-05-08-col",
    date: "2025-05-08",
    opponent: "COL",
    park: "Coors Field",
    result: "W 7-5",
    hr: 1,
    xHr: 1.1,
    hrDiff: -0.1,
    opposingSp: "Kyle Freeland",
    opposingSpHr9: 1.35,
  },
  {
    id: "nyy-2025-05-11-phi",
    date: "2025-05-11",
    opponent: "PHI",
    park: "Citizens Bank Park",
    result: "L 3-6",
    hr: 2,
    xHr: 1.8,
    hrDiff: 0.2,
    opposingSp: "Aaron Nola",
    opposingSpHr9: 1.18,
  },
  {
    id: "nyy-2025-05-14-phi",
    date: "2025-05-14",
    opponent: "PHI",
    park: "Citizens Bank Park",
    result: "W 6-4",
    hr: 3,
    xHr: 2.4,
    hrDiff: 0.6,
    opposingSp: "Ranger Suarez",
    opposingSpHr9: 1.14,
  },
  {
    id: "nyy-2025-05-17-det",
    date: "2025-05-17",
    opponent: "DET",
    park: "Comerica Park",
    result: "L 2-3",
    hr: 1,
    xHr: 1.2,
    hrDiff: -0.2,
    opposingSp: "Tarik Skubal",
    opposingSpHr9: 1.04,
  },
  {
    id: "nyy-2025-05-20-det",
    date: "2025-05-20",
    opponent: "DET",
    park: "Comerica Park",
    result: "W 5-2",
    hr: 2,
    xHr: 1.6,
    hrDiff: 0.4,
    opposingSp: "Jack Flaherty",
    opposingSpHr9: 1.26,
  },
  {
    id: "nyy-2025-05-22-bos",
    date: "2025-05-22",
    opponent: "BOS",
    park: "Fenway Park",
    result: "L 4-5",
    hr: 1,
    xHr: 1.3,
    hrDiff: -0.3,
    opposingSp: "Kutter Crawford",
    opposingSpHr9: 1.09,
  },
  {
    id: "nyy-2025-05-24-tor",
    date: "2025-05-24",
    opponent: "TOR",
    park: "Rogers Centre",
    result: "W 7-4",
    hr: 2,
    xHr: 1.9,
    hrDiff: 0.1,
    opposingSp: "José Berríos",
    opposingSpHr9: 1.17,
  },
  {
    id: "nyy-2025-05-27-bal",
    date: "2025-05-27",
    opponent: "BAL",
    park: "Camden Yards",
    result: "W 5-3",
    hr: 2,
    xHr: 1.8,
    hrDiff: 0.2,
    opposingSp: "Dean Kremer",
    opposingSpHr9: 1.20,
  },
  {
    id: "nyy-2025-05-30-lad",
    date: "2025-05-30",
    opponent: "LAD",
    park: "Dodger Stadium",
    result: "L 2-4",
    hr: 1,
    xHr: 1.2,
    hrDiff: -0.2,
    opposingSp: "Bobby Miller",
    opposingSpHr9: 1.16,
  },
  {
    id: "nyy-2025-06-02-chc",
    date: "2025-06-02",
    opponent: "CHC",
    park: "Wrigley Field",
    result: "W 6-2",
    hr: 3,
    xHr: 2.3,
    hrDiff: 0.7,
    opposingSp: "Justin Steele",
    opposingSpHr9: 1.10,
  },
  {
    id: "nyy-2025-06-04-chc",
    date: "2025-06-04",
    opponent: "CHC",
    park: "Wrigley Field",
    result: "W 4-3",
    hr: 2,
    xHr: 1.7,
    hrDiff: 0.3,
    opposingSp: "Kyle Hendricks",
    opposingSpHr9: 1.25,
  },
];
