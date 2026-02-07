export interface Match {
    match_number: number;
    date_and_time: string;
    match_id: string;
    ACT: string;
    map: string;
    agent: string;
    team: string;
    result: "Won" | "Lost" | "Draw";
    total_rounds: number;
    ACS: number;
    kills: number;
    deaths: number;
    assists: number;
    kd_ratio: number;
    headshot_percentage: number;
    headshots: number;
    bodyshots: number;
    legshots: number;
    damage_made: number;
    damage_received: number;
}

export interface Player {
    player_name: string;
    player_card_link: string;
    player_puuid: string;
    player_account_level: number;
    current_rank: string;
    rank_protection_shields: string;
    peak_rank: string;
    leaderboard_placement: number;
    overall_headshot_percentage: number;
    overall_kd_ratio: number;
    overall_ACS: number;
    overall_win_percent: number;
    top_agent: string;
    best_map: string;
    worst_map: string;
    matches: Match[];
}
