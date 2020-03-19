import { Component, OnInit } from '@angular/core';
import {LeaderboardService} from '../services/leaderboard.service';
import {Leaderboard} from '../leaderboard.model';

@Component({
  selector: 'app-add-leader-board',
  templateUrl: './add-leader-board.component.html',
  styleUrls: ['./add-leader-board.component.scss']
})
export class AddLeaderBoardComponent implements OnInit {

  ldboard: Leaderboard = {
    title: '',
    description: ''
  };

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.ldboard.title != '' && this.ldboard.description != '') {
      this.leaderboardService.addItem(this.ldboard);
      this.ldboard.title = '';
      this.ldboard.description = '';
    }
  }

}
