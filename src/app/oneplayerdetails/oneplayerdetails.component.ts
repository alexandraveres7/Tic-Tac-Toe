import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {LeaderboardService} from '../services/leaderboard.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-oneplayerdetails',
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
      name2: 'A',
      lname1: f.value.lname1,
      lname2: 'I'}
    );
    this.router.navigate(['/playboard']);
  }

}
