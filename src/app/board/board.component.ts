import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  squares: any[];
  xIsNext: boolean;
  flag: boolean;
  winner: string;
  // winner2: string;

  @ViewChild('bord') bord;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
    this.flag = false;
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

}
