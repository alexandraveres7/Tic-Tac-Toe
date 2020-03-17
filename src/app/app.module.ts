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
import {AngularFirestore} from "@angular/fire/firestore";


const appRoutes: Routes = [
  {path: 'playboard', component: BoardComponent},
  {path: 'leaderboard', component: LeaderboardsComponent}
];


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    BoardComponent,
    LeaderboardsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'angular'),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'cosmic' }),
    NbLayoutModule,
    NbEvaIconsModule,
    RouterModule.forRoot(appRoutes),
    NbButtonModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
