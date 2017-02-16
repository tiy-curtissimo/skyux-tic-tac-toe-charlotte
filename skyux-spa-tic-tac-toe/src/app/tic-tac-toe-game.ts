interface GameResult {
  firstPlayerWon: boolean
  secondPlayerWon: boolean
}

export class TicTacToeGame {
  board: number[] = [NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN, NaN];
  firstPlayer: boolean = true;
  gameOver: GameResult;
  title: string;

  constructor(titleOrState: any) {
    if (typeof titleOrState === 'string') {
      this.title = titleOrState;
    } else {
      this.board = titleOrState.board.map(b => b? b : NaN);
      this.firstPlayer = titleOrState.firstPlayer;
      this.gameOver = titleOrState.gameOver;
      this.title = titleOrState.title;
    }
  }

  get emptySquares(): number[] {
    return this.board
      .map((v, i) => isNaN(v)? i : -1)
      .filter(v => v >= 0);
  }

  moveAt(index: number): void {
    if (!this.gameOver && isNaN(this.board[index])) {
      if (this.firstPlayer) {
        this.board[index] = 3;
      } else {
        this.board[index] = 7;
      }
      this.checkBoardState();
      this.firstPlayer = !this.firstPlayer;
    }
  }

  private isWinningTriple(a, b, c): boolean {
    return (a + b + c) % 3 === 0 ||
           (a + b + c) % 7 === 0;
  }

  private checkBoardState() {
    let [a, b, c, d, e, f, g, h, i] = this.board;
    let winner = this.isWinningTriple(a, b, c) ||
                 this.isWinningTriple(d, e, f) ||
                 this.isWinningTriple(g, h, i) ||
                 this.isWinningTriple(a, d, g) ||
                 this.isWinningTriple(b, e, h) ||
                 this.isWinningTriple(c, f, i) ||
                 this.isWinningTriple(a, e, i) ||
                 this.isWinningTriple(c, e, g); 
    let cat = !isNaN(a + b + c + d + e + f + g + h + i);
    if (cat) {
      this.gameOver = {
        firstPlayerWon: false,
        secondPlayerWon: false
      }
    }
    if (winner) {
      this.gameOver = { 
        firstPlayerWon: this.firstPlayer,
        secondPlayerWon: !this.firstPlayer
      };
    }
  }
}
