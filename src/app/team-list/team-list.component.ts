import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {listTeam, Team} from '../share/listTeam';
import {NoWhitespaceValidator} from '../validator/no-whitespace.validator';
import {TeamManageService} from "../service/team-manage.service";

@Component({
    selector: 'app-team-list',
    templateUrl: './team-list.component.html',
    styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
    data = listTeam;
    listTeam = [];
    teamModel: Team = new Team;
    showSuccess: boolean;
    showUpdate: boolean;
    showAdd: boolean;
    manageForm: FormGroup;
    teamBeingEdited: Team;

    constructor(private fb: FormBuilder, private teamService: TeamManageService) {}

    ngOnInit(): void {
        this.listTeam = this.teamService.getAllTeams();
        if(this.listTeam === null)
          localStorage.setItem('teamData', JSON.stringify(this.data))
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
    add() {
        this.showUpdate = false;
        this.showAdd = true;
    }

    addTeam() {
        this.teamModel.name = this.manageForm.value.teamname;
        this.teamModel.star = this.manageForm.value.teamrank;
        this.teamModel.nameLeague = this.manageForm.value.nameleague;

        this.listTeam.push(this.teamModel);
        this.manageForm.reset();
        this.saveDataToLocal();
    }

    edit(teamModel: Team) {
        this.showUpdate = true;
        this.showAdd = false;
        this.teamBeingEdited = teamModel;
        this.manageForm.controls['teamname'].setValue(teamModel.name)
        this.manageForm.controls['teamrank'].setValue(teamModel.star)
        this.manageForm.controls['nameleague'].setValue(teamModel.nameLeague)
    }

    update() {
        const updatedTeam: Team = {
            id: this.teamBeingEdited.id, // Sử dụng biến đã gán
            name: this.manageForm.value.teamname,
            nameLeague: this.teamBeingEdited.nameLeague,
            star: this.manageForm.value.teamrank,
            logo: this.teamBeingEdited.logo,
        };

        const updatedIndex = this.listTeam.findIndex(team => team.id === updatedTeam.id);

        this.listTeam = this.teamService.updateTeam(updatedIndex, updatedTeam)
        this.manageForm.reset();
        this.saveDataToLocal();
    }

    deleteTeam(index: number) {
        this.listTeam = this.teamService.deleteTeam(index)
        this.saveDataToLocal();
    }

    saveDataToLocal() {
        this.teamService.saveAllTeam(this.listTeam);
    }

    showNotify(): void {
        this.showSuccess = true
        setTimeout(() => {
            this.showSuccess = false;
        }, 5000)
    }

}
