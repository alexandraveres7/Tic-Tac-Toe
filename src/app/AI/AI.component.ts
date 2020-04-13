import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Leaderboard} from '../leaderboard.model';
import {LeaderboardService} from '../services/leaderboard.service';
import {Subscription} from 'rxjs';
import {max, min} from 'rxjs/operators';


@Component({
  selector: 'app-board',
  templateUrl: './AI.component.html',
  styleUrls: ['./AI.component.scss']
})
export class AIComponent implements OnInit , OnDestroy {

  squares: any[];
  xIsNext: boolean;
  flag: boolean;
  winner: string;
  AIBoard: any[][];
  name1: string;
  gamePlayers: Leaderboard;
  subscription: Subscription;

  @ViewChild('bord') bord;
  constructor(private leaderboardService: LeaderboardService) { }

  arrayToMatrix(arr) {

    const newArr = [];
    while (arr.length) { newArr.push(arr.slice(0, 3)); }

    return newArr;
  }

  matrixToArray(matrix) {

    let newArr = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < matrix.length; i++) {
      newArr = newArr.concat(matrix[i].slice());
    }

    return newArr;
  }

   bestMove() {
    // AI to make its turn
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (this.AIBoard[i][j] === '') {
          this.AIBoard[i][j] = this.player;
          let score = minimax(this.AIBoard, 0, false);
          this.AIBoard[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    this.AIBoard[move.i][move.j] = ai;
    currentPlayer = human;
  }

  let scores = {
    X: 10,
    O: -10,
    tie: 0
  };

   function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = ai;
            let score = minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == '') {
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

ngOnInit() {
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
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if (!this.squares[idx]) {
       this.squares.splice(idx, 1 , this.player);
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
