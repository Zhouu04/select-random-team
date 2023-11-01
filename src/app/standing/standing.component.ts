import {Component, OnInit} from '@angular/core';
import {LeaderboardService} from "../leaderboard.service";

@Component({
  selector: 'app-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.css']
})
export class StandingComponent implements OnInit {
  standings: any[] = [];
  matchScores: any = {};
  schedule: any[] = [];
  players: { name: string }[] = [];
  seasons: any[] = [];
  currentSeasonId: number;
  list: any[] = [];

  constructor(private leaderboardService: LeaderboardService) {
  }

  ngOnInit() {
    const savedSeasons = localStorage.getItem('seasons');
    if (savedSeasons) {
      this.seasons = JSON.parse(savedSeasons);
    }

    for (let i = 0; i < this.seasons.length; i++) {
      this.currentSeasonId = this.seasons[i].id;
    }

    const savedPlayer = localStorage.getItem('players');
    if (savedPlayer) {
      this.players = JSON.parse(savedPlayer);
      console.log(this.players.length);
    }

    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule) {
      this.schedule = JSON.parse(savedSchedule);
    }

    const savedMatchScores = localStorage.getItem('matchScores');
    if (savedMatchScores) {
      this.matchScores = JSON.parse(savedMatchScores);
    }
    this.standings = this.players.map((team) => ({
      name: team.name,
      points: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      goalsFor: 0,
      goalsAgainst: 0,
    }));

    this.calculatePointsFromScores();
  }

  updatePoints(teamName: string, points: number, wins: number, losses: number, draws: number, goalsFor: number, goalsAgainst: number) {
    const teamIndex = this.standings.findIndex((team) => team.name === teamName);
    if (teamIndex !== -1) {
      this.standings[teamIndex].points += points;
      this.standings[teamIndex].wins += wins;
      this.standings[teamIndex].losses += losses;
      this.standings[teamIndex].draws += draws;
      this.standings[teamIndex].goalsFor += goalsFor;
      this.standings[teamIndex].goalsAgainst += goalsAgainst;
    }
  }

  calculatePointsFromScores() {
    for (const match of this.schedule) {
      const matchKey = `${match.team1.name} vs ${match.team2.name}`;
      const score1 = this.matchScores[matchKey]?.score1;
      const score2 = this.matchScores[matchKey]?.score2;

      if (score1 !== undefined && score2 !== undefined) {
        if (score1 > score2) {
          this.updatePoints(match.team1.name, 3, 1, 0, 0, score1, score2);
          this.updatePoints(match.team2.name, 0, 0, 1, 0, score2, score1);
        } else if (score1 < score2) {
          this.updatePoints(match.team2.name, 3, 1, 0, 0, score2, score1);
          this.updatePoints(match.team1.name, 0, 0, 1, 0, score1, score2);
        } else {
          this.updatePoints(match.team1.name, 1, 0, 0, 1, score1, score2);
          this.updatePoints(match.team2.name, 1, 0, 0, 1, score2, score1);
        }
      }
    }

    // Add the standings to the leaderboard service and save them
    this.leaderboardService.addLeaderboard(this.currentSeasonId, this.standings);
    this.leaderboardService.saveLeaderboardsToLocal();

    this.standings.sort((a, b) => {
      if (b.points === a.points) {
        // Nếu cùng điểm, sắp xếp theo hiệu số bàn thắng
        return b.goalsFor - a.goalsFor;
      }
      return b.points - a.points;
    });
  }

  changeSeason(seasonId: number) {
    // Lấy bảng xếp hạng cho mùa giải mới được chọn và cập nhật this.standings
    this.standings = this.leaderboardService.getLeaderboard(seasonId);

  }
}
