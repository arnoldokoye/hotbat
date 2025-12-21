export type PlayerInfo = {
  playerId: string;
  name: string;
  teamName: string;
  teamLogoUrl?: string;
  position: string;
  bats: "L" | "R" | "S";
  throws: "L" | "R";
};

export type PlayerKeyMetric = {
  id: string;
  label: string;
  value: string;
  comparisonText?: string;
  trendDirection?: "up" | "down" | "flat";
};

export type PlayerHrTimePoint = {
  date: string;
  hr: number;
  xHr: number | null;
  avgEv: number;
  barrels: number;
  opponentTeamName?: string | null;
  parkName?: string | null;
};

export type PitchDamageRow = {
  pitchType: string;
  hr: number;
  avgEv: number;
  maxDistance: number;
  hrPer100Pitches: number;
};

export type ParkProfileRow = {
  parkName: string;
  hrAtPark: number;
  hrPerPaAtPark: number;
  parkHrFactor: number;
};

export type PlayerSplitRow = {
  label: string;
  hr: number;
  pa: number;
  hrPerPa: number;
};

export type PlayerGameLogRow = {
  id: string;
  date: string;
  opponent: string;
  park: string;
  result: string;
  ab: number;
  pa: number;
  hr: number;
  rbi: number;
  bb: number;
  k: number;
};

export type PlayerHrEventRow = {
  id: string;
  date: string;
  opponent: string;
  park: string;
  inning: string;
  pitchType: string;
  pitchVelocity: number;
  distance: number;
  ev: number;
  launchAngle: number;
  pitcherHand: "L" | "R";
};

export const playerInfo: PlayerInfo = {
  playerId: "aaron-judge",
  name: "Aaron Judge",
  teamName: "New York Yankees",
  teamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
  position: "RF",
  bats: "R",
  throws: "R",
};

export const playerKeyMetrics: PlayerKeyMetric[] = [
  { id: "hr-total", label: "HR", value: "17", comparisonText: "Leads AL", trendDirection: "up" },
  { id: "hr-per-game", label: "HR/G", value: "0.42", comparisonText: "Last 30 games", trendDirection: "up" },
  { id: "hr-per-pa", label: "HR/PA", value: "7.8%", comparisonText: "Career avg 6.6%", trendDirection: "up" },
  { id: "max-ev", label: "Max EV", value: "117.3 mph", comparisonText: "Top 1%", trendDirection: "flat" },
];

export const playerHrTimeSeries: PlayerHrTimePoint[] = [
  { date: "2025-04-02", hr: 1, xHr: 0.8, avgEv: 109.2, barrels: 2 },
  { date: "2025-04-04", hr: 0, xHr: 0.3, avgEv: 98.1, barrels: 0 },
  { date: "2025-04-06", hr: 2, xHr: 1.5, avgEv: 110.5, barrels: 3 },
  { date: "2025-04-09", hr: 1, xHr: 0.9, avgEv: 106.8, barrels: 2 },
  { date: "2025-04-12", hr: 0, xHr: 0.4, avgEv: 97.5, barrels: 1 },
  { date: "2025-04-15", hr: 1, xHr: 1.1, avgEv: 108.3, barrels: 2 },
  { date: "2025-04-18", hr: 0, xHr: 0.6, avgEv: 99.7, barrels: 1 },
  { date: "2025-04-21", hr: 1, xHr: 0.9, avgEv: 107.1, barrels: 2 },
  { date: "2025-04-24", hr: 2, xHr: 1.6, avgEv: 111.0, barrels: 3 },
  { date: "2025-04-27", hr: 0, xHr: 0.5, avgEv: 96.9, barrels: 1 },
  { date: "2025-04-30", hr: 1, xHr: 1.0, avgEv: 108.8, barrels: 2 },
  { date: "2025-05-03", hr: 2, xHr: 1.7, avgEv: 112.2, barrels: 4 },
  { date: "2025-05-06", hr: 1, xHr: 1.2, avgEv: 109.6, barrels: 2 },
  { date: "2025-05-09", hr: 0, xHr: 0.4, avgEv: 97.8, barrels: 1 },
  { date: "2025-05-12", hr: 1, xHr: 1.0, avgEv: 107.9, barrels: 2 },
  { date: "2025-05-15", hr: 2, xHr: 1.5, avgEv: 111.4, barrels: 3 },
  { date: "2025-05-18", hr: 1, xHr: 0.9, avgEv: 106.2, barrels: 2 },
  { date: "2025-05-21", hr: 0, xHr: 0.5, avgEv: 98.4, barrels: 1 },
];

export const pitchDamageRows: PitchDamageRow[] = [
  { pitchType: "4-Seam", hr: 9, avgEv: 109.5, maxDistance: 440, hrPer100Pitches: 3.2 },
  { pitchType: "Slider", hr: 4, avgEv: 107.1, maxDistance: 428, hrPer100Pitches: 2.6 },
  { pitchType: "Sinker", hr: 2, avgEv: 110.3, maxDistance: 435, hrPer100Pitches: 2.1 },
  { pitchType: "Curveball", hr: 1, avgEv: 104.8, maxDistance: 410, hrPer100Pitches: 1.4 },
  { pitchType: "Changeup", hr: 1, avgEv: 103.2, maxDistance: 399, hrPer100Pitches: 1.0 },
  { pitchType: "Cutter", hr: 0, avgEv: 101.0, maxDistance: 385, hrPer100Pitches: 0.0 },
];

export const parkProfileRows: ParkProfileRow[] = [
  { parkName: "Yankee Stadium", hrAtPark: 9, hrPerPaAtPark: 0.082, parkHrFactor: 1.21 },
  { parkName: "Fenway Park", hrAtPark: 3, hrPerPaAtPark: 0.065, parkHrFactor: 1.08 },
  { parkName: "Camden Yards", hrAtPark: 2, hrPerPaAtPark: 0.060, parkHrFactor: 0.96 },
  { parkName: "Rogers Centre", hrAtPark: 2, hrPerPaAtPark: 0.061, parkHrFactor: 1.05 },
  { parkName: "Dodger Stadium", hrAtPark: 1, hrPerPaAtPark: 0.054, parkHrFactor: 0.98 },
];

export const playerSplitsOverview: PlayerSplitRow[] = [
  { label: "Overall", hr: 17, pa: 218, hrPerPa: 0.078 },
  { label: "Last 30 games", hr: 13, pa: 154, hrPerPa: 0.084 },
  { label: "Last 14 games", hr: 6, pa: 75, hrPerPa: 0.080 },
];

export const playerSplitsHomeAway: PlayerSplitRow[] = [
  { label: "Home", hr: 9, pa: 110, hrPerPa: 0.082 },
  { label: "Away", hr: 8, pa: 108, hrPerPa: 0.074 },
];

export const playerSplitsLhpRhp: PlayerSplitRow[] = [
  { label: "vs LHP", hr: 6, pa: 68, hrPerPa: 0.088 },
  { label: "vs RHP", hr: 11, pa: 150, hrPerPa: 0.073 },
];

export const playerSplitsMonthly: PlayerSplitRow[] = [
  { label: "March/April", hr: 11, pa: 140, hrPerPa: 0.079 },
  { label: "May", hr: 6, pa: 78, hrPerPa: 0.077 },
];

export const playerGameLogRows: PlayerGameLogRow[] = [
  {
    id: "nyy-2025-04-02-bos-judge",
    date: "2025-04-02",
    opponent: "BOS",
    park: "Yankee Stadium",
    result: "W 6-3",
    ab: 4,
    pa: 5,
    hr: 1,
    rbi: 2,
    bb: 1,
    k: 1,
  },
  {
    id: "nyy-2025-04-04-bos-judge",
    date: "2025-04-04",
    opponent: "BOS",
    park: "Yankee Stadium",
    result: "L 2-4",
    ab: 4,
    pa: 4,
    hr: 0,
    rbi: 0,
    bb: 0,
    k: 2,
  },
  {
    id: "nyy-2025-04-06-kc-judge",
    date: "2025-04-06",
    opponent: "KC",
    park: "Kauffman Stadium",
    result: "W 7-2",
    ab: 5,
    pa: 5,
    hr: 2,
    rbi: 4,
    bb: 0,
    k: 1,
  },
  {
    id: "nyy-2025-04-09-tor-judge",
    date: "2025-04-09",
    opponent: "TOR",
    park: "Rogers Centre",
    result: "W 5-3",
    ab: 4,
    pa: 4,
    hr: 1,
    rbi: 2,
    bb: 0,
    k: 1,
  },
  {
    id: "nyy-2025-04-12-min-judge",
    date: "2025-04-12",
    opponent: "MIN",
    park: "Target Field",
    result: "L 3-5",
    ab: 4,
    pa: 5,
    hr: 0,
    rbi: 1,
    bb: 1,
    k: 2,
  },
  {
    id: "nyy-2025-04-15-tex-judge",
    date: "2025-04-15",
    opponent: "TEX",
    park: "Globe Life Field",
    result: "W 4-2",
    ab: 4,
    pa: 5,
    hr: 1,
    rbi: 2,
    bb: 1,
    k: 0,
  },
  {
    id: "nyy-2025-04-18-bal-judge",
    date: "2025-04-18",
    opponent: "BAL",
    park: "Yankee Stadium",
    result: "W 6-2",
    ab: 5,
    pa: 5,
    hr: 0,
    rbi: 0,
    bb: 0,
    k: 2,
  },
  {
    id: "nyy-2025-04-21-bal-judge",
    date: "2025-04-21",
    opponent: "BAL",
    park: "Yankee Stadium",
    result: "L 3-5",
    ab: 4,
    pa: 4,
    hr: 1,
    rbi: 1,
    bb: 0,
    k: 1,
  },
  {
    id: "nyy-2025-04-24-laa-judge",
    date: "2025-04-24",
    opponent: "LAA",
    park: "Angel Stadium",
    result: "W 8-4",
    ab: 5,
    pa: 5,
    hr: 2,
    rbi: 5,
    bb: 0,
    k: 0,
  },
  {
    id: "nyy-2025-04-27-lad-judge",
    date: "2025-04-27",
    opponent: "LAD",
    park: "Dodger Stadium",
    result: "W 5-3",
    ab: 4,
    pa: 4,
    hr: 0,
    rbi: 0,
    bb: 0,
    k: 2,
  },
  {
    id: "nyy-2025-04-30-sea-judge",
    date: "2025-04-30",
    opponent: "SEA",
    park: "T-Mobile Park",
    result: "L 2-3",
    ab: 4,
    pa: 4,
    hr: 1,
    rbi: 2,
    bb: 0,
    k: 1,
  },
  {
    id: "nyy-2025-05-03-oak-judge",
    date: "2025-05-03",
    opponent: "OAK",
    park: "Oakland Coliseum",
    result: "W 6-1",
    ab: 4,
    pa: 5,
    hr: 2,
    rbi: 3,
    bb: 1,
    k: 0,
  },
  {
    id: "nyy-2025-05-06-ari-judge",
    date: "2025-05-06",
    opponent: "ARI",
    park: "Chase Field",
    result: "W 5-4",
    ab: 4,
    pa: 5,
    hr: 1,
    rbi: 2,
    bb: 1,
    k: 1,
  },
  {
    id: "nyy-2025-05-09-col-judge",
    date: "2025-05-09",
    opponent: "COL",
    park: "Coors Field",
    result: "W 7-5",
    ab: 5,
    pa: 5,
    hr: 0,
    rbi: 0,
    bb: 0,
    k: 2,
  },
  {
    id: "nyy-2025-05-12-phi-judge",
    date: "2025-05-12",
    opponent: "PHI",
    park: "Citizens Bank Park",
    result: "L 3-6",
    ab: 4,
    pa: 5,
    hr: 1,
    rbi: 1,
    bb: 1,
    k: 1,
  },
  {
    id: "nyy-2025-05-15-phi-judge",
    date: "2025-05-15",
    opponent: "PHI",
    park: "Citizens Bank Park",
    result: "W 6-4",
    ab: 4,
    pa: 4,
    hr: 2,
    rbi: 3,
    bb: 0,
    k: 0,
  },
  {
    id: "nyy-2025-05-18-det-judge",
    date: "2025-05-18",
    opponent: "DET",
    park: "Comerica Park",
    result: "L 2-3",
    ab: 4,
    pa: 4,
    hr: 1,
    rbi: 1,
    bb: 0,
    k: 1,
  },
  {
    id: "nyy-2025-05-21-det-judge",
    date: "2025-05-21",
    opponent: "DET",
    park: "Comerica Park",
    result: "W 5-2",
    ab: 4,
    pa: 5,
    hr: 0,
    rbi: 1,
    bb: 1,
    k: 1,
  },
];

export const playerHrEventRows: PlayerHrEventRow[] = [
  {
    id: "hr-2025-04-02-bos",
    date: "2025-04-02",
    opponent: "BOS",
    park: "Yankee Stadium",
    inning: "3rd",
    pitchType: "4-Seam",
    pitchVelocity: 96.8,
    distance: 421,
    ev: 110.3,
    launchAngle: 28,
    pitcherHand: "R",
  },
  {
    id: "hr-2025-04-06-kc-1",
    date: "2025-04-06",
    opponent: "KC",
    park: "Kauffman Stadium",
    inning: "1st",
    pitchType: "Slider",
    pitchVelocity: 85.1,
    distance: 429,
    ev: 112.1,
    launchAngle: 30,
    pitcherHand: "L",
  },
  {
    id: "hr-2025-04-06-kc-2",
    date: "2025-04-06",
    opponent: "KC",
    park: "Kauffman Stadium",
    inning: "6th",
    pitchType: "4-Seam",
    pitchVelocity: 97.3,
    distance: 437,
    ev: 114.5,
    launchAngle: 27,
    pitcherHand: "R",
  },
  {
    id: "hr-2025-04-09-tor",
    date: "2025-04-09",
    opponent: "TOR",
    park: "Rogers Centre",
    inning: "8th",
    pitchType: "Sinker",
    pitchVelocity: 94.2,
    distance: 409,
    ev: 109.8,
    launchAngle: 31,
    pitcherHand: "R",
  },
  {
    id: "hr-2025-04-15-tex",
    date: "2025-04-15",
    opponent: "TEX",
    park: "Globe Life Field",
    inning: "4th",
    pitchType: "Changeup",
    pitchVelocity: 86.5,
    distance: 402,
    ev: 107.0,
    launchAngle: 26,
    pitcherHand: "R",
  },
  {
    id: "hr-2025-04-21-bal",
    date: "2025-04-21",
    opponent: "BAL",
    park: "Yankee Stadium",
    inning: "5th",
    pitchType: "Curveball",
    pitchVelocity: 78.4,
    distance: 390,
    ev: 103.5,
    launchAngle: 35,
    pitcherHand: "R",
  },
  {
    id: "hr-2025-04-24-laa",
    date: "2025-04-24",
    opponent: "LAA",
    park: "Angel Stadium",
    inning: "2nd",
    pitchType: "4-Seam",
    pitchVelocity: 95.5,
    distance: 431,
    ev: 111.7,
    launchAngle: 29,
    pitcherHand: "L",
  },
  {
    id: "hr-2025-05-03-oak",
    date: "2025-05-03",
    opponent: "OAK",
    park: "Oakland Coliseum",
    inning: "7th",
    pitchType: "Slider",
    pitchVelocity: 84.6,
    distance: 415,
    ev: 109.2,
    launchAngle: 32,
    pitcherHand: "L",
  },
];

export const defaultSeason = "2025";
export const defaultSplit = "Full Season";
export const defaultDateRange = "Last 30 days";
export const defaultPitchType = "All";
export const defaultPitcherHand = "All";
