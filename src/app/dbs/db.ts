// Thông tin một câu lặc bộ bóng đá
// Thêm, Sửa, Xóa
export class FootballClubs {
    code: string;
    name: string;
    rank: number;
    logo: string;
}

// Thông tin Team tham gia thi đấu4
// Thêm, Sửa, Xóa
export class Team {
    code: string;
    name: string;
}

// Thông tin mùa giải
// Thêm, Sửa, Xóa, random lịch đấu, Random all footballclub cho các lịch đấu, random footballclub cho 1 lịch đấu.
export class Season {
    code: string;
    name: string;
    teams: Array<Team>;
    soluot: number;
    // 
    //schedules: Array<Schedule>;
}

export class Schedule {
    time: number;
    seasionCode: string;
    team1: ScheduleTeam;
    team2: ScheduleTeam;
    used: boolean;
}

export class ScheduleTeam {
    name: string;
    teamCode: string;
    footballClubCode?: string;
    point: number;
}