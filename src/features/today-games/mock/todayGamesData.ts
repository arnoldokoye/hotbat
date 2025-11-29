export type GamePitcherInfo = {
  name: string;
  teamName: string;
  throws: "L" | "R";
  hrPer9: number;
  era: number;
};

export type TodayGame = {
  id: string;
  date: string;
  startTimeLocal: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamLogoUrl?: string;
  awayTeamLogoUrl?: string;
  parkName: string;
  parkHrFactor: number;
  homeProjectedHrMin: number;
  homeProjectedHrMax: number;
  awayProjectedHrMin: number;
  awayProjectedHrMax: number;
  homeStartingPitcher: GamePitcherInfo;
  awayStartingPitcher: GamePitcherInfo;
  hotBatScore: number;
};

export const defaultDate = "2024-06-15";

export const todayGames: TodayGame[] = [
  {
    id: "bos-nyy-2024-06-15",
    date: defaultDate,
    startTimeLocal: "7:05 PM",
    homeTeam: "New York Yankees",
    awayTeam: "Boston Red Sox",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png",
    parkName: "Yankee Stadium",
    parkHrFactor: 1.22,
    homeProjectedHrMin: 1,
    homeProjectedHrMax: 3,
    awayProjectedHrMin: 0,
    awayProjectedHrMax: 2,
    homeStartingPitcher: { name: "Carlos Rodón", teamName: "NYY", throws: "L", hrPer9: 1.05, era: 3.41 },
    awayStartingPitcher: { name: "Nick Pivetta", teamName: "BOS", throws: "R", hrPer9: 1.38, era: 4.12 },
    hotBatScore: 84,
  },
  {
    id: "tor-bal-2024-06-15",
    date: defaultDate,
    startTimeLocal: "4:10 PM",
    homeTeam: "Baltimore Orioles",
    awayTeam: "Toronto Blue Jays",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/bal.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/tor.png",
    parkName: "Camden Yards",
    parkHrFactor: 1.05,
    homeProjectedHrMin: 1,
    homeProjectedHrMax: 2,
    awayProjectedHrMin: 1,
    awayProjectedHrMax: 2,
    homeStartingPitcher: { name: "Kyle Bradish", teamName: "BAL", throws: "R", hrPer9: 1.10, era: 3.21 },
    awayStartingPitcher: { name: "José Berríos", teamName: "TOR", throws: "R", hrPer9: 1.17, era: 3.89 },
    hotBatScore: 72,
  },
  {
    id: "lad-sf-2024-06-15",
    date: defaultDate,
    startTimeLocal: "9:10 PM",
    homeTeam: "San Francisco Giants",
    awayTeam: "Los Angeles Dodgers",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/sf.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png",
    parkName: "Oracle Park",
    parkHrFactor: 0.88,
    homeProjectedHrMin: 0,
    homeProjectedHrMax: 1,
    awayProjectedHrMin: 1,
    awayProjectedHrMax: 2,
    homeStartingPitcher: { name: "Logan Webb", teamName: "SF", throws: "R", hrPer9: 0.92, era: 3.05 },
    awayStartingPitcher: { name: "Bobby Miller", teamName: "LAD", throws: "R", hrPer9: 1.08, era: 3.45 },
    hotBatScore: 58,
  },
  {
    id: "hou-tex-2024-06-15",
    date: defaultDate,
    startTimeLocal: "8:05 PM",
    homeTeam: "Texas Rangers",
    awayTeam: "Houston Astros",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/tex.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/hou.png",
    parkName: "Globe Life Field",
    parkHrFactor: 1.09,
    homeProjectedHrMin: 1,
    homeProjectedHrMax: 2,
    awayProjectedHrMin: 1,
    awayProjectedHrMax: 2,
    homeStartingPitcher: { name: "Nathan Eovaldi", teamName: "TEX", throws: "R", hrPer9: 1.10, era: 3.70 },
    awayStartingPitcher: { name: "Cristian Javier", teamName: "HOU", throws: "R", hrPer9: 1.24, era: 3.95 },
    hotBatScore: 69,
  },
  {
    id: "cws-min-2024-06-15",
    date: defaultDate,
    startTimeLocal: "2:10 PM",
    homeTeam: "Minnesota Twins",
    awayTeam: "Chicago White Sox",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/min.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/chw.png",
    parkName: "Target Field",
    parkHrFactor: 0.96,
    homeProjectedHrMin: 1,
    homeProjectedHrMax: 2,
    awayProjectedHrMin: 0,
    awayProjectedHrMax: 1,
    homeStartingPitcher: { name: "Joe Ryan", teamName: "MIN", throws: "R", hrPer9: 1.22, era: 3.82 },
    awayStartingPitcher: { name: "Dylan Cease", teamName: "CWS", throws: "R", hrPer9: 1.35, era: 4.05 },
    hotBatScore: 63,
  },
  {
    id: "phi-atl-2024-06-15",
    date: defaultDate,
    startTimeLocal: "7:20 PM",
    homeTeam: "Atlanta Braves",
    awayTeam: "Philadelphia Phillies",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/atl.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/phi.png",
    parkName: "Truist Park",
    parkHrFactor: 1.14,
    homeProjectedHrMin: 1,
    homeProjectedHrMax: 3,
    awayProjectedHrMin: 1,
    awayProjectedHrMax: 2,
    homeStartingPitcher: { name: "Max Fried", teamName: "ATL", throws: "L", hrPer9: 0.95, era: 3.20 },
    awayStartingPitcher: { name: "Aaron Nola", teamName: "PHI", throws: "R", hrPer9: 1.18, era: 3.65 },
    hotBatScore: 77,
  },
  {
    id: "ari-col-2024-06-15",
    date: defaultDate,
    startTimeLocal: "8:10 PM",
    homeTeam: "Colorado Rockies",
    awayTeam: "Arizona Diamondbacks",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/col.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/ari.png",
    parkName: "Coors Field",
    parkHrFactor: 1.28,
    homeProjectedHrMin: 2,
    homeProjectedHrMax: 3,
    awayProjectedHrMin: 1,
    awayProjectedHrMax: 3,
    homeStartingPitcher: { name: "Kyle Freeland", teamName: "COL", throws: "L", hrPer9: 1.35, era: 4.90 },
    awayStartingPitcher: { name: "Zac Gallen", teamName: "ARI", throws: "R", hrPer9: 1.05, era: 3.12 },
    hotBatScore: 86,
  },
  {
    id: "nyy-mia-2024-06-16",
    date: "2024-06-16",
    startTimeLocal: "1:10 PM",
    homeTeam: "Miami Marlins",
    awayTeam: "New York Yankees",
    homeTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/mia.png",
    awayTeamLogoUrl: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png",
    parkName: "loanDepot park",
    parkHrFactor: 0.92,
    homeProjectedHrMin: 0,
    homeProjectedHrMax: 1,
    awayProjectedHrMin: 1,
    awayProjectedHrMax: 2,
    homeStartingPitcher: { name: "Jesús Luzardo", teamName: "MIA", throws: "L", hrPer9: 1.05, era: 3.88 },
    awayStartingPitcher: { name: "Gerrit Cole", teamName: "NYY", throws: "R", hrPer9: 0.95, era: 2.98 },
    hotBatScore: 61,
  },
];
