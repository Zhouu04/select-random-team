import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit{
  newPlayerName = '';
  players: { name: string }[] = [];
  show: boolean;

  ngOnInit() {
    this.show = true;
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers)
      this.players = JSON.parse(savedPlayers);
  }
  edit() {
    this.show = !this.show;
  }
  addPlayer() {
    if (this.newPlayerName.trim() !== '') {
      this.players.push({ name: this.newPlayerName });
      this.newPlayerName = '';
    }
  }
  updatePlayer(player: { name: string }) {
    const playerIndex = this.players.findIndex(p => p === player);

    if (playerIndex !== -1) {
      this.players[playerIndex].name = player.name;
    }
  }
  savePlayer() {
    localStorage.setItem('players', JSON.stringify(this.players));
  }

  resetPlayer() {
    localStorage.removeItem('players');
    localStorage.removeItem('matchScores');
    localStorage.removeItem('schedule');
    localStorage.removeItem('matchTeam');
    this.players = [];
  }

  deletePlayer(index) {
    this.players.splice(index, 1);
    this.savePlayer();
  }
}
