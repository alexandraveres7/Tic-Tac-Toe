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

import {AngularFirestore} from '@angular/fire/firestore';
import {FormsModule} from '@angular/forms';
import { StartComponent } from './start/start.component';
import { GamemodeComponent } from './gamemode/gamemode.component';
import { TwoplayerdetailsComponent } from './twoplayerdetails/twoplayerdetails.component';
import { OneplayerdetailsComponent } from './oneplayerdetails/oneplayerdetails.component';
import {AIboardComponent} from './AIboard/AIboard.component';


const appRoutes: Routes = [
  {path: '', component: StartComponent},
  {path: 'playboard', component: BoardComponent},
  {path: 'leaderboard', component: LeaderboardsComponent},
  {path: 'gamemode', component: GamemodeComponent},
  {path: 'twoplayerdetails', component: TwoplayerdetailsComponent},
  {path: 'oneplayerdetails', component: OneplayerdetailsComponent},
  {path: 'playboardAI', component: AIboardComponent}
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    LeaderboardsComponent,
    StartComponent,
    GamemodeComponent,
    TwoplayerdetailsComponent,
    OneplayerdetailsComponent,
    AIboardComponent
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
