import { Injectable } from '@angular/core';
import {Team, listTeam} from "../share/listTeam";

@Injectable({
  providedIn: 'root'
})
export class TeamManageService {
  data = listTeam;
  keyData = 'teamData'
  team: Team;
  constructor() { }

  getAllTeams() : Array<Team> {

    const teamData = localStorage.getItem(this.keyData);
    return JSON.parse(teamData) as Array<Team>;
  }
  saveAllTeam(teams: Array<Team>) {
    localStorage.setItem(this.keyData, JSON.stringify(teams))
  }
  deleteTeam(index: number) {
    const listTeam = this.getAllTeams();
    if (confirm('Are you sure you want to delete this team?')) {
      listTeam.splice(index, 1);
    }
    return listTeam;
  }
  updateTeam(index: number, teamUpdate: Team) {
    const listTeam = this.getAllTeams();
    if(index !== -1) {
      listTeam[index] = teamUpdate;
    }
    return listTeam;
  }

  filterTeam(numberTeam: number,selectLeague: string | null, selectRank: number| null) {
    let listTeam = this.getAllTeams();
    let copiedList: Team[] = [...listTeam];
    let filterTeam = [];

    for (let i = 0; i < numberTeam; i++) {
      if (selectLeague == null && selectRank == null) {
        filterTeam = copiedList;
      } else if (selectLeague == null && selectRank !== null) {
        filterTeam = listTeam.filter(team => team.star == selectRank)
      } else if (selectLeague !== null && selectRank == null) {
        filterTeam = listTeam.filter(team => team.nameLeague === selectLeague)
      } else {
        filterTeam = listTeam.filter(team => team.nameLeague === selectLeague && team.star == selectRank)
      }
    }
    return filterTeam
  }

}
