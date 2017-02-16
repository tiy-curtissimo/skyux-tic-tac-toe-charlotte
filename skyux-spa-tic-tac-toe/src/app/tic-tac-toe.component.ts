import { Component, Input } from '@angular/core';
import { TicTacToeGame } from './tic-tac-toe-game';

@Component({
  selector: 'tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.scss']
})
export class TicTacToeComponent {
  @Input()
  game: TicTacToeGame;

  onClick(squareIndex: number): void {
    this.game.moveAt(squareIndex);
    let emptySquares = this.game.emptySquares;
    this.game.moveAt(emptySquares[Math.floor((emptySquares.length + 1) / 2)]);
  }
}
