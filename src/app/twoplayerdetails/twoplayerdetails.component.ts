import { Component, OnInit } from '@angular/core';
import {Leaderboard} from '../leaderboard.model';
import {LeaderboardService} from '../services/leaderboard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-twoplayerdetails',
  templateUrl: './twoplayerdetails.component.html',
  styleUrls: ['./twoplayerdetails.component.scss']
})
export class TwoplayerdetailsComponent implements OnInit {

  ldboard: Leaderboard = {
    name1: '',
    lname1: '',
    name2: '',
    lname2: '',
  };

  constructor(private leaderboardService: LeaderboardService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.ldboard.name1 !== '' && this.ldboard.name2 !== '') {
      this.leaderboardService.addItem(this.ldboard);
      this.ldboard.name1 = '';
      this.ldboard.name2 = '';
      this.ldboard.lname1 = '';
      this.ldboard.lname2 = '';
      this.router.navigate(['/playboard']);
    }
  }

}
