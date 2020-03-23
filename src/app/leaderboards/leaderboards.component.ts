import { Component, OnInit } from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';
import { Leaderboard } from '../leaderboard.model';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.scss'],
  providers: [LeaderboardService]
})
export class LeaderboardsComponent implements OnInit {

  ldboards: Leaderboard[];

  constructor(private ldboardsService: LeaderboardService) { }

  ngOnInit(): void {
    this.ldboardsService.getLeaderboards().subscribe(ldboards => {
      this.ldboards = ldboards;
    });
  }

  deleteItem(event, ldb) {
    this.ldboardsService.deleteItem(ldb);
  }

}
