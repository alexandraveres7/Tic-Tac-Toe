import {Component, OnInit} from '@angular/core';
import {Leaderboard} from '../leaderboard.model';
import {LeaderboardService} from '../services/leaderboard.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-twoplayerdetails',
  templateUrl: './oneplayerdetails.component.html',
  styleUrls: ['./oneplayerdetails.component.scss']
})
export class OneplayerdetailsComponent implements OnInit {

  constructor(private leaderboardService: LeaderboardService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    console.log(f.valid);
    this.leaderboardService.addItem({
      name1: f.value.fname1,
      name2: 'AI',
      lname1: f.value.lname1,
      lname2: 'Minimax'}
      );
    this.router.navigate(['/playboardAI']);
  }
}
