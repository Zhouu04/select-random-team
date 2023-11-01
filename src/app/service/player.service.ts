import { Injectable } from '@angular/core';
import {Team} from "../share/listTeam";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  keyData: 'listPlayerData';
  team: Team;

  constructor() { }

  //chua duoc
  getAllPlayer()  {
    const playerData = localStorage.getItem(this.keyData);
    return JSON.parse(playerData);
  }

  deletePlayer() {

  }

}
