// season.component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {
  newSeasonName: string = ''; // Biến lưu trữ tên mùa giải mới
  seasons: { id: number, name: string, standing: any }[] = [];
  currentSeasonId: number; // ID của mùa giải hiện tại

  constructor() { }

  ngOnInit(): void {
    const savedSeasons = localStorage.getItem('seasons');
    if (savedSeasons) {
      this.seasons = JSON.parse(savedSeasons);
    }

    if (this.seasons.length === 0) {
      this.currentSeasonId = 1; // Gán 1 cho mùa giải đầu tiên nếu danh sách trống
    } else {
      // Lấy ID của mùa giải cuối cùng và tự động tăng lên 1
      this.currentSeasonId = this.seasons[this.seasons.length - 1].id + 1;
    }
  }

  addSeason() {
    if (this.newSeasonName.trim() !== '') {
      this.seasons.push({ id: this.currentSeasonId, name: this.newSeasonName, standing: [] });
      this.newSeasonName = '';
      this.currentSeasonId++; // Tự động tăng ID cho mùa giải tiếp theo
      localStorage.removeItem('schedule');
      localStorage.removeItem('matchScores');
    }
  }

  saveSeason() {
    localStorage.setItem('seasons', JSON.stringify(this.seasons));
  }
}
