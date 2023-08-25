import { Component, OnInit } from '@angular/core';
import { Team, listTeam } from '../share/listTeam';

export interface OPtion {
  selectLeague?: string;
  selectRank?: number;
}

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamData = listTeam
  listTeam: any[] = []
  selectTeam: Team;
  selectTeams: Team[] = [];
  logo: string;
  logo1: string;
  

  private audio: HTMLAudioElement;

  selectLeague: string | null
  selectRank: number | null

  selectOption: OPtion;
  selectOptionDefault: OPtion = {
    selectLeague: "",
    selectRank: 4.5
  };
  
  constructor() {
    this.selectOption = this.selectOptionDefault;
    this.audio = new Audio('./assets/audio/xo-so-mien-bac.mp3')
  }

  ngOnInit(): void {
    localStorage.setItem('teamData', JSON.stringify(this.teamData));
    const teamData = localStorage.getItem('teamData');
    if (teamData) {
      this.listTeam = JSON.parse(teamData);
    }
  }

  resetOption() {
    Object.assign(this.selectOption, this.selectOptionDefault);
  }

  private filterTeamByCondition(league: string | null, rank: number | null): Team[] {
    return this.listTeam.filter(team => team.nameLeague === league && team.star == rank)
  }

  playSound() {
    this.audio.currentTime = 0; // Đảm bảo âm thanh bắt đầu từ đầu khi được phát
    this.audio.play();
  }

  randomTeam(numberTeam: number) {
    this.selectTeams = [];
    const copiedList = [...this.listTeam];
    // Select two random teams
    for (let i = 0; i < numberTeam; i++) {

      let filterTeam = [];
      if (this.selectTeams.length > 1) {
        this.selectTeams = []
      }

      if (this.selectLeague == null && this.selectRank == null) {
        filterTeam = copiedList;
      }

      else if (this.selectLeague == null && this.selectRank !== null) {
        filterTeam = this.listTeam.filter(team => team.star == this.selectRank)
      }
      else if (this.selectLeague !== null && this.selectRank == null) {
        filterTeam = this.listTeam.filter(team => team.nameLeague === this.selectLeague)
      }
      else {
        filterTeam = this.filterTeamByCondition(this.selectLeague, this.selectRank)
      }

      if(numberTeam == 1) {
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * filterTeam.length);
          this.logo1 = filterTeam[randomIndex].logo
        }, 100)
        setTimeout(() => {
          clearInterval(interval)
          this.logo1 = ''
          const randomIndex = Math.floor(Math.random() * filterTeam.length);
          const selectedTeam = filterTeam.splice(randomIndex, 1)[0];
          this.selectTeams.push(selectedTeam);
        }, 25000)
        setTimeout(() => {
          this.audio.pause()
        }, 25000)
      }

      else if(numberTeam == 2) {
        const interval = setInterval(() => {
          const randomIndex = Math.floor(Math.random() * filterTeam.length);
          this.logo = filterTeam[randomIndex].logo
          this.logo1 = filterTeam[randomIndex + 1].logo
        }, 100)
        setTimeout(() => {
          clearInterval(interval)
          this.logo = ''
          this.logo1 = ''
          const randomIndex = Math.floor(Math.random() * filterTeam.length);
          const selectedTeam = filterTeam.splice(randomIndex, 1)[0];
          this.selectTeams.push(selectedTeam);
        }, 25000)
        setTimeout(() => {
          this.audio.pause()
        }, 25000)
      }
    }
  }
}
