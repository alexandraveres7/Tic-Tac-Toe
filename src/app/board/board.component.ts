import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Leaderboard} from '../leaderboard.model';
import {LeaderboardService} from '../services/leaderboard.service';
import {Subscription} from 'rxjs';
// import io from 'socket.io-client';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit , OnDestroy{

  squares: any[];
  xIsNext: boolean;
  flag: boolean;
  winner: string;
  name1: string;
  gamePlayers: Leaderboard;
  subscription: Subscription;
  // private socket: any;

  @ViewChild('bord') bord;
  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit() {
   // this.socket = io('http://localhost:3000');
    this.newGame();
    this.subscription = this.leaderboardService.getPlayers().subscribe(value => {
      this.gamePlayers = value;
      console.log(value);
    });
    console.log(this.gamePlayers);
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.flag = false;
    // this.socket.on('player', this.player);
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
        this.squares.splice(idx, 1, this.player);
        this.xIsNext = !this.xIsNext;
      }

    this.winner = this.calculateWinner();
    if (this.winner) {
      if (this.xIsNext) {
        this.leaderboardService.winnerIs(
          this.gamePlayers.id,
          this.gamePlayers.name1,
          this.gamePlayers.name2,
          this.gamePlayers.lname1,
          this.gamePlayers.lname2,
          'O'
          );
        console.log('winner is 0');
      } else {
        this.leaderboardService.winnerIs(
          this.gamePlayers.id,
          this.gamePlayers.name1,
          this.gamePlayers.name2,
          this.gamePlayers.lname1,
          this.gamePlayers.lname2,
          'X'
        );
        console.log('winner is x');
      }
    }

    console.log(this.bord);
    console.log(this.winner);

  }

  calculateWinner() {
    const lines = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
    ];

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < lines.length; i++) {
      const[a, b, c] = lines[i];
      if (this.squares[a] &&
        // tslint:disable-next-line:triple-equals
         this.squares[a] == this.squares[b] &&
        // tslint:disable-next-line:triple-equals
         this.squares[a] == this.squares[c]
        ) {
          return this.squares[a];
        }
    }

    return null;


  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
