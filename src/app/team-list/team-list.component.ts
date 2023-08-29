import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Team } from '../share/listTeam';
import { NoWhitespaceValidator } from '../validator/no-whitespace.validator';
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
  teamBeingEdited: Team;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const teamData = localStorage.getItem('teamData');
    if (teamData) {
      this.listTeam = JSON.parse(teamData);
    }

    this.manageForm = this.fb.group({
      teamname: ['', Validators.compose([
        Validators.required,
        NoWhitespaceValidator(),
      ])],
      teamrank: ['', Validators.compose([
        Validators.required,
      ])],
      nameleague: ['', Validators.compose([
        Validators.required,
        NoWhitespaceValidator(),
      ])]
    })
  }

  get teamname() {
    return this.manageForm.get('teamname')
  }

  get teamrank() {
    return this.manageForm.get('teamrank')
  }

  get nameleague() {
    return this.manageForm.get('nameleague')
  }

  addTeam() {
    const newTeam = { id: 0, name: '', nameLeague: '', star: 0, logo: '' }
    const teamName = this.manageForm.value.teamname
    const teamStar = this.manageForm.value.teamrank
    const nameLeague = this.manageForm.value.nameleague

    newTeam.name = teamName
    newTeam.star = teamStar
    newTeam.nameLeague = nameLeague

    this.listTeam.push(newTeam);
    this.manageForm.reset();
    this.saveDataToLocal();
  }

  edit(team: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.teamBeingEdited = team;
    this.manageForm.controls['teamname'].setValue(team.name)
    this.manageForm.controls['teamrank'].setValue(team.star)
    this.manageForm.controls['nameleague'].setValue(team.nameLeague)
  }

  update() {
    const updatedTeam = {
      id: this.teamBeingEdited.id, // Sử dụng biến đã gán
      name: this.manageForm.value.teamname,
      nameLeague: this.teamBeingEdited.nameLeague,
      star: this.manageForm.value.teamrank,
      logo: this.teamBeingEdited.logo,
    };

    const updatedIndex = this.listTeam.findIndex(team => team.id === updatedTeam.id);

    if (updatedIndex !== -1) {
      this.listTeam[updatedIndex] = updatedTeam;
      this.manageForm.reset();
    }
    this.saveDataToLocal();
  }

  add() {
    this.showUpdate = false;
    this.showAdd = true;
  }

  deleteTeam(index: number) {
    if (confirm('Are you sure you want to delete this team?')) {
      this.listTeam.splice(index, 1);
    }
    this.saveDataToLocal()
  }

  saveDataToLocal() {
    localStorage.setItem('teamData', JSON.stringify(this.listTeam));
  }

  showNotify(): void {
    this.showSuccess = true
    setTimeout(() => {
      this.showSuccess = false
    }, 5000)
  }

}
