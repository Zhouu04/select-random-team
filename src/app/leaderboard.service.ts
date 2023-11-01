import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  private leaderboards: { seasonId: number; standings: any[] }[] = [];

  constructor() {
    // Load leaderboards from local storage when the service is constructed
    this.loadLeaderboardsFromLocal();
  }

  addLeaderboard(seasonId: number, standings: any[]): void {
    // Check if a leaderboard with the same seasonId already exists
    const existingLeaderboardIndex = this.leaderboards.findIndex(item => item.seasonId === seasonId);

    if (existingLeaderboardIndex !== -1) {
      // If it exists, update the existing leaderboard
      this.leaderboards[existingLeaderboardIndex].standings = standings;
    } else {
      // If it doesn't exist, add a new leaderboard
      this.leaderboards.push({ seasonId, standings });
    }

    this.saveLeaderboardsToLocal(); // Save the leaderboards to local storage
  }

  getLeaderboard(seasonId: number): any[] {
    const leaderboard = this.leaderboards.find(item => item.seasonId === seasonId);
    return leaderboard ? leaderboard.standings : [];
  }

  saveLeaderboardsToLocal(): void {
    // Save the leaderboards to local storage
    localStorage.setItem('leaderboards', JSON.stringify(this.leaderboards));
  }

  loadLeaderboardsFromLocal(): void {
    // Load the leaderboards from local storage
    const leaderboardsJSON = localStorage.getItem('leaderboards');
    if (leaderboardsJSON) {
      this.leaderboards = JSON.parse(leaderboardsJSON);
    }
  }
}
