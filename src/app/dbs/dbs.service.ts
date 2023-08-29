import { Injectable } from '@angular/core';
import { Team } from './db';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  keyData = 'teamData';

  constructor() { }

  initDefaultTeam() {

  }

  getAllTeams(): Array<Team>{
    const teamData = localStorage.getItem(this.keyData);

    return JSON.parse(teamData) as Array<Team>;
  }

  addTeam(model: Team) {
    var teams = this.getAllTeams();

    teams.push(model);

    this.saveAllTeam(teams);
  }

  /*updateTeam(model: Team) {
    var teams = this.getAllTeams();

    var team = _.find(teams, {code: model.code});

    if(team == null)
      return;

    Object.assign(model, team);

    this.saveAllTeam(teams);
  }*/

  /**
   * Tìm một team theo mã nhập vào.
   * @param code Mã team cần tìm
   * @returns trả về team kết quả hoặc null
   */
  /*
  findOneTeam(code: string) {
    var teams = this.getAllTeams();

    return _.find(teams, {code: code});
  }*/

  private randomTeam(num: number){

  }

  randomOneTeam() {
    return this.randomTeam(1);
  }

  saveAllTeam(teams: Array<Team>) {
    localStorage.setItem(this.keyData, JSON.stringify(teams))
  }
}
