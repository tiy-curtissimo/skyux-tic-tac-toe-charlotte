import { TicTacToeGame } from './tic-tac-toe-game';

describe ('Tic Tac Toe Game', () => {
  it ('sets the title for a string argument in the constructor', () => {
    let title = 'My New Game';

    let game = new TicTacToeGame(title);

    expect(game.title).toBe(title);
    expect(game.firstPlayer).toBe(true);
    expect(game.gameOver).toBeUndefined();
    expect(game.board.length).toBe(9);
  });

  it ('rehydrates state for an object argument in the constructor', () => {
    let state = {
      board: [1],
      firstPlayer: false,
      gameOver: {},
      title: 'My Other New Game'
    };

    let game = new TicTacToeGame(state);

    expect(game.title).toBe(state.title);
    expect(game.firstPlayer).toBe(state.firstPlayer);
    expect(game.gameOver).toBe(state.gameOver);
    expect(game.board.length).toBe(1);
    expect(game.board[0]).toBe(1);
  });

  it ('returns all indices as empty squares for a new game', () => {
    let game = new TicTacToeGame('A Game Unlike Any Other');

    let emptySquares: number[] = game.emptySquares;

    expect(emptySquares.length).toBe(9);
    for (let i = 0; i < 9; i += 1) {
      expect(emptySquares).toContain(i);
    }
  });
});
