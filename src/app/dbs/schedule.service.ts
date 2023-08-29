import { Injectable } from '@angular/core';
import { Schedule } from './db';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  keyData = 'scheduleData';

  constructor() { }

  getAllTeams(): Array<Schedule>{
    const teamData = localStorage.getItem(this.keyData);

    return JSON.parse(teamData) as Array<Schedule>;
  }

  /**
   * Tìm một team theo mã nhập vào.
   * @param code Mã team cần tìm
   * @returns trả về team kết quả hoặc null
   */
  /**findOneTeam(code: string): Schedule {
    var teams = this.getAllTeams();

    return _.find(teams, {code: code});
  }**/

  saveAllTeam(teams: Array<Schedule>) {
    localStorage.setItem(this.keyData, JSON.stringify(teams))
  }
}
