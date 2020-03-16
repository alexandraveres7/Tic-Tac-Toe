import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaderboardsComponent } from './leaderboards/leaderboards.component';
import { BoardComponent } from './board/board.component';


const routes: Routes = [
  {path: 'playboard', component: BoardComponent},
  {path: 'leaderboard', component: LeaderboardsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
