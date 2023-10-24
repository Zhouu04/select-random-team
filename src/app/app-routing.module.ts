import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';
import {HomeComponent} from "./home/home.component";
import {PlayerComponent} from "./player/player.component";
import {StandingComponent} from "./standing/standing.component";
import {SheduleComponent} from "./shedule/shedule.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: 'team-list', component: TeamListComponent},
  {path: 'random-team', component: TeamComponent},
  {path: 'player', component: PlayerComponent},
  {path: 'standing', component: StandingComponent},
  {path: 'schedule', component: SheduleComponent},
  {path:'home', component:HomeComponent},
  {path: 'login', component: LoginComponent},

  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
