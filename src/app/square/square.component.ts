import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-square',
  template: `
   <button nbButton *ngIf="!value" [disabled]="!!playGame">{{ value }} </button>
   <button id="myX" nbButton hero status="success" *ngIf="value == 'X'" [disabled]="!!playGame">{{ value }} </button>
   <button id="myY" nbButton hero status="info" *ngIf="value == 'O'" [disabled]="!!playGame">{{ value }}</button>
  `,
  styles: [
    'button { width: 100%; height: 100%; font-size: 5em !important; }',
    '#myX {background-color: green;}'
  ]
})
export class SquareComponent{

  @Input() value: 'X' | 'O';
  @Input() playGame: boolean;
  @Input() pos: number;
  @Input() winState: Array<number>;

  f() {
    return this.winState.includes(this.pos);
  }

}

