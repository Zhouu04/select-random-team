import { Injectable } from '@angular/core';
// import { FootballClubs, Schedule } from '../dbs/db';
import { FootballclubRepositoryService } from '../repository/footballclub-repository.service';
import { TeamRepositoryService } from '../repository/team-repository.service';
import { SeasonRepositoryService } from '../repository/season-repository.service';

@Injectable({
  providedIn: 'root'
})
export class ViewSeasonService {

  constructor(private footBallClubRepo: FootballclubRepositoryService,
    private teamRepo: TeamRepositoryService,
    private seasonRepo: SeasonRepositoryService) { }

    getAllSeaon() {
      // Trả về tất cả các mùa.
    }

    getAllSchedule(seasonCode: string) {
      // 1. Lấy ra hết các lịch đấu (schedules)

      // 2. Lấy ra mã Footballclub trong lịch đấu => Từ mã Footballclub => Lấy ra danh sách Footballclub (footballclubs)

      // 3. Lấy ra mã Team trong lịch đấu => Từ mã Team => Lấy ra danh sách Team (teams)

      // 4. Gép dữ liệu Footballclub và Team vào lịch.

      //
      /*
      schedules.forEach(schecule: Schedule => {
          var team = _.find(teams, {code: schecule.team1.teamCode})
      });*/
    }
}
