import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  listTeam = [];
  showSuccess: boolean;
  showUpdate: boolean;
  showAdd: boolean;
  manageForm: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const teamData = localStorage.getItem('teamData');
    if (teamData) {
      this.listTeam = JSON.parse(teamData);
    }

    this.manageForm = this.fb.group({
      teamname: '',
      teamrank: '',
    })
  }

  addTeam() {
    console.log(this.manageForm.value.teamname)

    const newTeam = { id: 0, name: '', nameLeague: '', star: 0, logo: '' }
    const teamName = this.manageForm.value.teamname
    const teamStar = this.manageForm.value.teamrank
    if (teamName) {
      newTeam.name = teamName
      if (teamStar) {
        newTeam.star = Number(teamStar)
      }
    }
    this.listTeam.push(newTeam)
  }

  update() {
    this.showUpdate = true;
    this.showAdd = false;
  }

  add() {
    this.showUpdate = false;
    this.showAdd = true;
  }

  editTeam(index: number) {
    const editedTeam = this.listTeam[index];
    const updatedName = this.manageForm.value.teamname
    const updatedRank = this.manageForm.value.teamrank;

    if (updatedName !== null && updatedRank !== null) {
      editedTeam.name = updatedName;
      editedTeam.star = updatedRank;
    }
  }
  

  editTeam1(index: number) {
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
