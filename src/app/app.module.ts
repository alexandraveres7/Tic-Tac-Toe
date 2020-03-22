import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { BoardComponent } from './board/board.component';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// environment
import { environment } from '../environments/environment';

import { LeaderboardService } from './services/leaderboard.service';
import {AngularFirestore} from '@angular/fire/firestore';
import { NavbarComponent } from './navbar/navbar.component';
import { AddLeaderBoardComponent } from './add-leader-board/add-leader-board.component';
import {FormsModule} from '@angular/forms';
import { StartComponent } from './start/start.component';
import { GamemodeComponent } from './gamemode/gamemode.component';


const appRoutes: Routes = [
  {path: 'playboard', component: BoardComponent},
  {path: 'leaderboard', component: LeaderboardsComponent},
  {path: 'start', component: StartComponent},
  {path: 'mode', component: GamemodeComponent}

];


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    LeaderboardsComponent,
    NavbarComponent,
    AddLeaderBoardComponent,
    StartComponent,
    GamemodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular'),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbLayoutModule,
    NbEvaIconsModule,
    RouterModule.forRoot(appRoutes),
    NbButtonModule,
    FormsModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
