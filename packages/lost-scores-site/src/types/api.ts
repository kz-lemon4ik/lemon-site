export interface LostScore {
  pp: number;
  beatmap_id: number;
  beatmapset_id?: number;
  artist: string;
  title: string;
  creator: string;
  version: string;
  mods: string[];
  accuracy: number;
  count100: number;
  count50: number;
  countMiss: number;
  rank: string;
  score_time: string;
}

export interface CurrentUserStats {
  current_pp: number;
  current_global_rank: number;
  current_country_rank: number;
  username: string;
  avatar_url: string;
  country_code: string;
}

export interface SubmissionDetail {
  metadata: {
    analysis_timestamp: string;
    user_identifier: string;
  };
  summary_stats: {
    lost_scores_found: number;
    current_pp: number;
    potential_pp: number;
    delta_pp: number;
    current_global_rank: number;
  };
  lost_scores: LostScore[];
  current_user_stats?: CurrentUserStats;
  total_count?: number;
}

export interface SubmissionSummary {
  username: string;
  user_id: number;
  scan_date: string;
  lost_scores_count: number;
  total_pp_gain: number;
  current_pp: number;
  potential_pp: number;
}
