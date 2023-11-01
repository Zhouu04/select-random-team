import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Team} from "../share/listTeam";

@Component({
  selector: 'app-shedule',
  templateUrl: './shedule.component.html',
  styleUrls: ['./shedule.component.css']
})
export class SheduleComponent implements OnInit {
  schedule: any[] = [];
  players: { name: string }[] = [];
  matchScores: any = {};
  teamSelect: Team = {};
  matchTeam: any = {}

  ngOnInit() {
    const savedMatchScores = localStorage.getItem('matchScores');
    if (savedMatchScores) {
      this.matchScores = JSON.parse(savedMatchScores);
    }

    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers)
      this.players = JSON.parse(savedPlayers);

    const savedSchedule = localStorage.getItem('schedule');
    if (savedSchedule)
      this.schedule = JSON.parse(savedSchedule);
    else
      this.generateRoundRobinSchedule()

    const savedMatchTeam = localStorage.getItem('matchTeam');
    if (savedMatchTeam) {
      this.matchTeam = JSON.parse(savedMatchTeam)
    }


  }

  shuffleSchedule() {
    // Xáo trộn lịch thi đấu
    this.schedule.sort(() => Math.random() - 0.5);
    localStorage.setItem('schedule', JSON.stringify(this.schedule));
  }

  receiveTeam($event) {
    this.teamSelect = $event;
  }

  generateRoundRobinSchedule() {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers)
      this.players = JSON.parse(savedPlayers);
    const numTeams = this.players.length;

    this.schedule = [];

    for (let i = 0; i < numTeams - 1; i++) {
      for (let j = i + 1; j < numTeams; j++) {
        const match = {
          team1: this.players[i],
          team2: this.players[j],
          score1: null,
          score2: null,
          teamSelect1: null,
          teamSelect2: null,
        };
        this.shuffleSchedule();
        this.schedule.push(match);
      }
    }
    localStorage.setItem('schedule', JSON.stringify(this.schedule));

  }

  updateScore(match: any) {
    const score1 = prompt('Nhập tỷ số đội 1:');
    const score2 = prompt('Nhập tỷ số đội 2:');

    if (score1 !== null && score2 !== null) {
      match.score1 = parseInt(score1);
      match.score2 = parseInt(score2);

      const matchKey = `${match.team1.name} vs ${match.team2.name}`;
      this.matchScores[matchKey] = {score1, score2};
      localStorage.setItem('matchScores', JSON.stringify(this.matchScores));
    }
  }

  selectTeam(match: any) {
    setTimeout(() => {
      const team1 = this.teamSelect[0];
      const team2 = this.teamSelect[1];


      match.teamSelect1 = team1;
      match.teamSelect2 = team2;

      const matchKey = `${match.team1.name} vs ${match.team2.name}`;
      this.matchTeam[matchKey] = {team1, team2};
      localStorage.setItem('matchTeam', JSON.stringify(this.matchTeam));

    }, 5001)

  }

  selectTeam1(match: any) {

  }
}



