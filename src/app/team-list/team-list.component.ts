import { Component, OnInit } from '@angular/core';
import { listTeam } from '../share/listTeam';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  listTeam = [];
  showSuccess: boolean;
  constructor() {
    this.showSuccess = false;
  }

  ngOnInit(): void {
    const teamData = localStorage.getItem('teamData');
    if (teamData) {
      this.listTeam = JSON.parse(teamData);
    }
  }

  editTeam(index: number) {
    const editedTeam = this.listTeam[index];
    const updatedName = prompt('Edit team name:', editedTeam.name);
    const updatedRank = prompt('Edit team rank:', String(editedTeam.star));

    if (updatedName !== null && updatedRank !== null) {
      editedTeam.name = updatedName;
      editedTeam.star = parseInt(updatedRank);
    }
  }

  deleteTeam(index: number) {
    if (confirm('Are you sure you want to delete this team?')) {
      this.listTeam.splice(index, 1);
    }
  }
  addTeam() {
    const newTeam = { id: 0, name: '', nameLeague: '', star: 0, logo: '' }
    const teamName = prompt('Enter team name:');
    const teamStar = prompt('Enter team rank:')
    if (teamName) {
      newTeam.name = teamName
      if (teamStar) {
        newTeam.star = Number(teamStar)
      }
    }
    this.listTeam.push(newTeam)
  }

  saveDataToLocal() {
    localStorage.setItem('teamData', JSON.stringify(this.listTeam));
  }

  showNotify() :void {
    this.showSuccess = true
    setTimeout(() => {
      this.showSuccess = false
    }, 5000)
  }
  
}
