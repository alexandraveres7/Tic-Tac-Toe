import { Component, OnInit } from '@angular/core';
import {Leaderboard} from '../leaderboard.model';
import {LeaderboardService} from '../services/leaderboard.service';

@Component({
  selector: 'app-twoplayerdetails',
  templateUrl: './twoplayerdetails.component.html',
  styleUrls: ['./twoplayerdetails.component.scss']
})
export class TwoplayerdetailsComponent implements OnInit {

  ldboard: Leaderboard = {
    name1: '',
    lname1: ''
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
