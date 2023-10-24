import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {TeamComponent} from './team/team.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FooterComponent} from './footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {TagComponent} from './tag/tag.component';
import {TeamListComponent} from './team-list/team-list.component';
import {HomeComponent} from './home/home.component';
import {PlayerComponent} from './player/player.component';
import {SheduleComponent} from './shedule/shedule.component';
import {SelectTeamComponent} from './select-team/select-team.component';
import {StandingComponent} from './standing/standing.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NavbarComponent} from './navbar/navbar.component';
import {LoginComponent} from './login/login.component';
import {Navbar1Component} from './navbar1/navbar1.component';
import {Sidebar1Component} from './sidebar1/sidebar1.component';
import { SeasonComponent } from './season/season.component';

@NgModule({
    declarations: [
        AppComponent,
        TeamComponent,
        FooterComponent,
        TagComponent,
        TeamListComponent,
        HomeComponent,
        PlayerComponent,
        SheduleComponent,
        SelectTeamComponent,
        StandingComponent,
        SidebarComponent,
        NavbarComponent,
        LoginComponent,
        Navbar1Component,
        Sidebar1Component,
        SeasonComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
