export interface MockScan {
  id: string;
  date: string;
  username: string;
  summary: {
    lost_scores_count: number;
    pp_gain: number;
    duration_sec: number;
    current_pp: number;
    potential_pp: number;
  };
  status: "completed";
  is_public: boolean;
  full_json: {
    scan_metadata: {
      scan_id: string;
      timestamp: string;
      analyzer_version: string;
      scan_duration_sec: number;
    };
    user_data: {
      username: string;
      user_id: number;
      current_pp: number;
      country: string;
      global_rank: number;
      country_rank: number;
    };
    lost_scores: Array<{
      beatmap_id: number;
      beatmap_title: string;
      artist: string;
      difficulty: string;
      max_combo: number;
      stars: number;
      mods: string[];
      accuracy: number;
      score_rank: string;
      pp_current: number;
      pp_potential: number;
      pp_difference: number;
      fc_probability: number;
      replay_date: string;
    }>;
    statistics: {
      total_scores_analyzed: number;
      lost_scores_found: number;
      total_pp_gain_potential: number;
      average_pp_per_score: number;
      top_pp_gain: number;
    };
  };
}

export const MOCK_SCANS: MockScan[] = [
  {
    id: "scan_001_abc123",
    date: "2025-10-20T14:32:18Z",
    username: "KZ_Lemon4ik",
    summary: {
      lost_scores_count: 37,
      pp_gain: 284.5,
      duration_sec: 142,
      current_pp: 5234.8,
      potential_pp: 5519.3,
    },
    status: "completed",
    is_public: true,
    full_json: {
      scan_metadata: {
        scan_id: "scan_001_abc123",
        timestamp: "2025-10-20T14:32:18Z",
        analyzer_version: "2.1.0",
        scan_duration_sec: 142,
      },
      user_data: {
        username: "KZ_Lemon4ik",
        user_id: 8274569,
        current_pp: 5234.8,
        country: "KZ",
        global_rank: 48503,
        country_rank: 127,
      },
      lost_scores: [
        {
          beatmap_id: 3847291,
          beatmap_title: "Pretender",
          artist: "Official HIGE DANdism",
          difficulty: "Expert",
          max_combo: 1247,
          stars: 6.42,
          mods: ["HD", "DT"],
          accuracy: 97.83,
          score_rank: "A",
          pp_current: 312.4,
          pp_potential: 389.7,
          pp_difference: 77.3,
          fc_probability: 0.87,
          replay_date: "2025-08-15T19:23:41Z",
        },
        {
          beatmap_id: 2945182,
          beatmap_title: "Teo",
          artist: "Omoi",
          difficulty: "Expert",
          max_combo: 1508,
          stars: 6.89,
          mods: ["HD"],
          accuracy: 96.21,
          score_rank: "S",
          pp_current: 287.3,
          pp_potential: 352.8,
          pp_difference: 65.5,
          fc_probability: 0.73,
          replay_date: "2025-07-22T16:42:09Z",
        },
        {
          beatmap_id: 4123847,
          beatmap_title: "Kanpeki na Risou no Unmei",
          artist: "Suzuki Konomi",
          difficulty: "Insane",
          max_combo: 892,
          stars: 5.94,
          mods: ["DT"],
          accuracy: 98.44,
          score_rank: "A",
          pp_current: 198.7,
          pp_potential: 241.2,
          pp_difference: 42.5,
          fc_probability: 0.91,
          replay_date: "2025-09-03T12:18:33Z",
        },
      ],
      statistics: {
        total_scores_analyzed: 1847,
        lost_scores_found: 37,
        total_pp_gain_potential: 284.5,
        average_pp_per_score: 7.69,
        top_pp_gain: 77.3,
      },
    },
  },
  {
    id: "scan_002_def456",
    date: "2025-10-15T09:15:42Z",
    username: "KZ_Lemon4ik",
    summary: {
      lost_scores_count: 42,
      pp_gain: 312.8,
      duration_sec: 168,
      current_pp: 5198.2,
      potential_pp: 5511.0,
    },
    status: "completed",
    is_public: true,
    full_json: {
      scan_metadata: {
        scan_id: "scan_002_def456",
        timestamp: "2025-10-15T09:15:42Z",
        analyzer_version: "2.0.8",
        scan_duration_sec: 168,
      },
      user_data: {
        username: "KZ_Lemon4ik",
        user_id: 8274569,
        current_pp: 5198.2,
        country: "KZ",
        global_rank: 49127,
        country_rank: 132,
      },
      lost_scores: [
        {
          beatmap_id: 3721894,
          beatmap_title: "KING",
          artist: "Kanaria",
          difficulty: "Extra",
          max_combo: 1124,
          stars: 6.73,
          mods: ["HD", "HR"],
          accuracy: 96.89,
          score_rank: "A",
          pp_current: 324.1,
          pp_potential: 412.9,
          pp_difference: 88.8,
          fc_probability: 0.79,
          replay_date: "2025-06-28T21:47:15Z",
        },
        {
          beatmap_id: 2834729,
          beatmap_title: "Kimi no Shiranai Monogatari",
          artist: "supercell",
          difficulty: "Insane",
          max_combo: 1342,
          stars: 5.87,
          mods: ["DT"],
          accuracy: 97.53,
          score_rank: "S",
          pp_current: 241.7,
          pp_potential: 298.3,
          pp_difference: 56.6,
          fc_probability: 0.85,
          replay_date: "2025-08-02T14:29:57Z",
        },
      ],
      statistics: {
        total_scores_analyzed: 1812,
        lost_scores_found: 42,
        total_pp_gain_potential: 312.8,
        average_pp_per_score: 7.45,
        top_pp_gain: 88.8,
      },
    },
  },
  {
    id: "scan_003_ghi789",
    date: "2025-10-08T18:47:29Z",
    username: "KZ_Lemon4ik",
    summary: {
      lost_scores_count: 28,
      pp_gain: 197.4,
      duration_sec: 135,
      current_pp: 5167.9,
      potential_pp: 5365.3,
    },
    status: "completed",
    is_public: true,
    full_json: {
      scan_metadata: {
        scan_id: "scan_003_ghi789",
        timestamp: "2025-10-08T18:47:29Z",
        analyzer_version: "2.0.8",
        scan_duration_sec: 135,
      },
      user_data: {
        username: "KZ_Lemon4ik",
        user_id: 8274569,
        current_pp: 5167.9,
        country: "KZ",
        global_rank: 49784,
        country_rank: 135,
      },
      lost_scores: [
        {
          beatmap_id: 3982451,
          beatmap_title: "Hikari Are",
          artist: "BURNOUT SYNDROMES",
          difficulty: "Expert",
          max_combo: 1089,
          stars: 6.28,
          mods: ["HD"],
          accuracy: 98.12,
          score_rank: "S",
          pp_current: 276.8,
          pp_potential: 329.5,
          pp_difference: 52.7,
          fc_probability: 0.88,
          replay_date: "2025-05-19T10:34:22Z",
        },
      ],
      statistics: {
        total_scores_analyzed: 1789,
        lost_scores_found: 28,
        total_pp_gain_potential: 197.4,
        average_pp_per_score: 7.05,
        top_pp_gain: 52.7,
      },
    },
  },
  {
    id: "scan_004_xyz789",
    date: "2025-10-22T18:45:12Z",
    username: "Cookiezi",
    summary: {
      lost_scores_count: 15,
      pp_gain: 156.3,
      duration_sec: 98,
      current_pp: 15847.2,
      potential_pp: 16003.5,
    },
    status: "completed",
    is_public: true,
    full_json: {
      scan_metadata: {
        scan_id: "scan_004_xyz789",
        timestamp: "2025-10-22T18:45:12Z",
        analyzer_version: "2.1.0",
        scan_duration_sec: 98,
      },
      user_data: {
        username: "Cookiezi",
        user_id: 124493,
        current_pp: 15847.2,
        country: "JP",
        global_rank: 142,
        country_rank: 8,
      },
      lost_scores: [
        {
          beatmap_id: 3847291,
          beatmap_title: "Freedom Dive",
          artist: "xi",
          difficulty: "Four Dimensions",
          max_combo: 2385,
          stars: 8.45,
          mods: ["HD", "HR"],
          accuracy: 99.12,
          score_rank: "S",
          pp_current: 892.4,
          pp_potential: 978.2,
          pp_difference: 85.8,
          fc_probability: 0.65,
          replay_date: "2025-09-28T21:15:33Z",
        },
        {
          beatmap_id: 2945182,
          beatmap_title: "Blue Zenith",
          artist: "xi",
          difficulty: "FOUR DIMENSIONS",
          max_combo: 2402,
          stars: 8.02,
          mods: ["HD", "DT"],
          accuracy: 97.54,
          score_rank: "A",
          pp_current: 734.1,
          pp_potential: 804.6,
          pp_difference: 70.5,
          fc_probability: 0.58,
          replay_date: "2025-08-14T19:42:18Z",
        },
      ],
      statistics: {
        total_scores_analyzed: 2341,
        lost_scores_found: 15,
        total_pp_gain_potential: 156.3,
        average_pp_per_score: 10.42,
        top_pp_gain: 85.8,
      },
    },
  },
];
