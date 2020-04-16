import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Leaderboard} from '../leaderboard.model';
import {LeaderboardService} from '../services/leaderboard.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-board',
  templateUrl: './AIboard.component.html',
  styleUrls: ['./AIboard.component.scss']
})
export class AIboardComponent implements OnInit, OnDestroy {

  squares: any[];
  xIsNext: boolean;
  winner: string;
  gamePlayers: Leaderboard;
  subscription: Subscription;
  scores = {
    X: -10,
    O: 10,
    tie: 0
  };
  board: any[][];
  ai = 'O';
  human = 'X';
  @ViewChild('bord') bord;

  constructor(private leaderboardService: LeaderboardService) {
  }

  ngOnInit() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];
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
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.checkWinner();
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

    this.board = this.arrayToMatrix(this.squares);
    this.bestMove();
    this.squares = this.matrixToArray(this.board);

    this.winner = this.checkWinner();
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (this.squares[a] &&
        this.squares[a] == this.squares[b] &&
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

  arrayToMatrix(arr) {
    return [
      [arr[0], arr[1], arr[2]],
      [arr[3], arr[4], arr[5]],
      [arr[6], arr[7], arr[8]]
    ];
  }

  matrixToArray(matrix) {
    let newArr = [];
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
        if (this.board[i][j] == null) {
          this.board[i][j] = this.ai;
          let score = this.minimax(this.board, 0, false);
          this.board[i][j] = null;
          if (score > bestScore) {
            bestScore = score;
            move = { i, j };
          }
        }
      }
    }
    this.board[move.i][move.j] = this.ai;
    this.xIsNext = !this.xIsNext;
  }

  equals3(a, b, c) {
    return a == b && b == c && a != null;
  }

  checkWinner() {
    let winner = null;

    // horizontal
    for (let i = 0; i < 3; i++) {
      if (this.equals3(this.board[i][0], this.board[i][1], this.board[i][2])) {
        winner = this.board[i][0];
      }
    }

    // Vertical
    for (let i = 0; i < 3; i++) {
      if (this.equals3(this.board[0][i], this.board[1][i], this.board[2][i])) {
        winner = this.board[0][i];
      }
    }

    // Diagonal
    if (this.equals3(this.board[0][0], this.board[1][1], this.board[2][2])) {
      winner = this.board[0][0];
    }
    if (this.equals3(this.board[2][0], this.board[1][1], this.board[0][2])) {
      winner = this.board[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] == null) {
          openSpots++;
        }
      }
    }

    if (winner == null && openSpots == 0) {
      return 'tie';
    } else {
      return winner;
    }
  }


  minimax(board, depth, isMaximizing) {
    let result = this.checkWinner();
    if (result !== null) {
      return this.scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == null) {
            board[i][j] = this.ai;
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = null;
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          // Is the spot available?
          if (board[i][j] == null) {
            board[i][j] = this.human;
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = null;
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

}
