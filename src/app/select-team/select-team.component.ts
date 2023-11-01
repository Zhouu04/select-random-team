import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Team} from '../share/listTeam';
import {TeamManageService} from "../service/team-manage.service";

@Component({
    selector: 'app-select-team',
    templateUrl: './select-team.component.html',
    styleUrls: ['./select-team.component.css']
})
export class SelectTeamComponent implements OnInit {
    selectTeams: Team[] = [];
    @Output() teams = new EventEmitter<Team[]>();
    listTeam: any[] = [];
    logo: string;
    logo1: string;
    selectLeague: string | null;
    selectRank: number | null;
    show: boolean = true;

    private audio: HTMLAudioElement;

    constructor(private teamService: TeamManageService,) {
        this.audio = new Audio('./assets/audio/xo-so-mien-bac.mp3');
    }
    ngOnInit() {
        this.show = false;
        this.listTeam = this.teamService.getAllTeams();
    }

    setting() {
        this.show = true;
    }
    randomTeam(numberTeam: number) {
        if (this.selectTeams.length > 1) {
            this.selectTeams = [];
        }
        let filterTeam = this.teamService.filterTeam(numberTeam, this.selectLeague, this.selectRank);

        if (numberTeam == 1) {
            const interval = setInterval(() => {
                const randomIndex1 = Math.floor(Math.random() * filterTeam.length);
                const randomIndex2 = Math.floor(Math.random() * filterTeam.length);
                this.logo = filterTeam[randomIndex1].logo;
                this.logo1 = filterTeam[randomIndex2].logo;
                this.show = true;
            }, 100)
            setTimeout(() => {
                clearInterval(interval)
                this.logo = '';
                this.logo1 = '';
                const randomIndex = Math.floor(Math.random() * filterTeam.length);
                const selectedTeam = filterTeam.splice(randomIndex, 1)[0];
                this.selectTeams.push(selectedTeam);

                this.teams.emit(this.selectTeams);
                this.audio.pause();
                this.show = false;
            }, 5000)
        }
        else if(numberTeam == 2) {
            for (let i = 0; i < numberTeam; i++) {
                const interval = setInterval(() => {
                    const randomIndex1 = Math.floor(Math.random() * filterTeam.length);
                    const randomIndex2 = Math.floor(Math.random() * filterTeam.length);
                    this.logo = filterTeam[randomIndex1].logo;
                    this.logo1 = filterTeam[randomIndex2].logo;
                    this.show = true;
                }, 100)
                setTimeout(() => {
                    clearInterval(interval)
                    this.logo = ''
                    this.logo1 = ''
                    const randomIndex = Math.floor(Math.random() * filterTeam.length);
                    const selectedTeam = filterTeam.splice(randomIndex, 1)[0];
                    this.selectTeams.push(selectedTeam);
                    this.teams.emit(this.selectTeams);
                    this.show = false;
                    this.audio.pause();
                }, 5000)

            }
        }
    }

    /*animationLogo() {
        let filterTeam = this.teamService.filterTeam(2, this.selectLeague, this.selectRank);

        const interval = setInterval(() => {
            const randomIndex1 = Math.floor(Math.random() * filterTeam.length);
            const randomIndex2 = Math.floor(Math.random() * filterTeam.length);
            this.logo = filterTeam[randomIndex1].logo;
            this.logo1 = filterTeam[randomIndex2].logo;
        },100)

        setTimeout(() => {
            clearInterval(interval)
            this.logo = '';
            this.logo1 = '';
        }, 5000)
    }*/
}
