import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from './team/team.component';
import { TeamListComponent } from './team-list/team-list.component';

const routes: Routes = [
  {path: 'team-list', component: TeamListComponent},
  {path: 'random-team', component: TeamComponent},
  {path: '', redirectTo: 'random-team', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }