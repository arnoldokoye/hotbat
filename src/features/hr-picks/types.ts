export type MatchupAdvantage = "positive" | "neutral" | "negative";

export type Handedness = "L" | "R" | "B";

export type CompareHRPick = {
  // Identity
  player_id: string;
  player_name: string;
  team_name: string;

  // Game context
  game_date: string;
  park_id: string;
  park_name: string;

  // Scoring
  pick_score: number; // UX-scaled
  baseline_score: number; // raw baseline_hr_score

  // Batter signals
  hr_rate_last_50: number;
  hr_rate_last_10: number | null;
  season_hr_rate: number;
  season_hr_total: number;

  // Pitcher matchup
  opposing_pitcher_name: string | null;
  opposing_pitcher_hand: "L" | "R" | null;
  pitcher_hr_rate_allowed: number | null;
  pitcher_hr_total_allowed: number | null;

  // Matchup context
  batter_hand: Handedness;
  matchup_advantage: MatchupAdvantage;

  // Environment
  park_hr_factor: number;
  expected_pa: number;

  // Explainability
  score_breakdown: {
    base_hr_rate: number;
    park_factor: number;
    pitcher_factor: number | null;
    expected_pa: number;
  };
  top_reasons: string[];
};

export type HrPicksBaselineResponse = {
  date: string;
  picks: CompareHRPick[];
  availableDates: string[];
};

