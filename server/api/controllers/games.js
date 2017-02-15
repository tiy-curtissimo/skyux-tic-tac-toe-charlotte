'use strict';

class Game {
  constructor(id, humanPlayerFirst) {
    this.id = id;
    this.startedOn = new Date();
    this.humanPlayerFirst = humanPlayerFirst;
    this.board = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ];
  }

  move(rowIndex, columnIndex, isHumanPlayer) {
    let space = this.board[rowIndex][columnIndex];
    if (this.completed || space !== 0) {
      return false;
    }

    if (this.humanPlayerFirst && isHumanPlayer) {
      this.board[rowIndex][columnIndex] = 1;
    } else if (!this.humanPlayerFirst && !isHumanPlayer) {
      this.board[rowIndex][columnIndex] = 1;
    } else {
      this.board[rowIndex][columnIndex] = 2;
    }
    this.testForCompletion();
    return true;
  }

  testForCompletion() {
    let winner = this.winner;
    if (winner) {
      this.completed = { winnerIndex: winner };
    }
    if (this.emptySpaceCount === 0) {
      this.completed = { winnerIndex: 0 };
    }
  }

  get winner() {
    let board = this.board;
    for (let i = 0; i < 3; i += 1) {
      let [a, b, c] = board[i];
      if (a !== 0 && a === b && a === c) {
        return a;
      }
      [a, b, c] = this.column(i);
      if (a !== 0 && a === b && a === c) {
        return a;
      }
    }
    let [a, b, c] = this.diagonalRight;
    if (a !== 0 && a === b && a === c) {
      return a;
    }
    [a, b, c] = this.diagonalLeft;
    if (a !== 0 && a === b && a === c) {
      return a;
    }
    return null;
  }

  get diagonalRight() {
    return [
      this.board[0][0],
      this.board[1][1],
      this.board[2][2]
    ];
  }

  get diagonalLeft() {
    return [
      this.board[0][2],
      this.board[1][1],
      this.board[2][0]
    ];
  }

  column(i) {
    return [
      this.board[0][i],
      this.board[1][i],
      this.board[2][i]
    ];
  }

  get emptySpaceCount() {
    let board = this.board;
    let colAcc = (acc, val) => (val === 0)? acc + 1 : acc;
    let rowAcc = (acc, val) => val.reduce(colAcc, 0) + acc;
    return board.reduce(rowAcc, 0);
  }
}

class GamesController {
  constructor() {
    this.games = [];
  }

  list(req, res) {
    res.json({ games: this.games });
  }

  create(req, res) {
    let max = this.games.reduce((acc, val) => (val.id > acc) ? val.id : acc, 0);
    let humanPlayerFirst = req.swagger.params.gameRequest.value.humanPlayerFirst;
    let game = new Game(max + 1, humanPlayerFirst);
    this.games.push(game);

    if (!humanPlayerFirst) {
      this.makeMove(game);
    }

    res.status(201);
    res.json(game);
  }

  details(req, res) {
    let id = req.swagger.params.id.value;
    let game = this.games.find(game => game.id === id);
    if (game) {
      return res.json(game);
    }
    res.status(404).json({ message: 'Not Found' });
  }

  update(req, res) {
    let id = req.swagger.params.id.value;
    let {rowIndex, columnIndex} = req.swagger.params.move.value;
    let game = this.games.find(game => game.id === id);

    if (game) {
      if (game.move(rowIndex, columnIndex, true)) {
        this.makeMove(game);
        return res.status(200).json(game);
      }
      return res.status(409).json({ message: 'Move not allowed' });
    }
    res.status(404).json({ message: 'Not Found' });
  }

  remove(req, res) {
    let id = req.swagger.params.id.value;
    let index = this.games.findIndex(game => game.id === id);
    if (index > 0) {
      this.games.splice(index, 1);
    }
    res.type('json').end();
  }

  makeMove(game) {
    if (game.completed) {
      return;
    }

    let board = game.board;
    let index = Math.floor(Math.random() * game.emptySpaceCount);
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (board[i][j] === 0) {
          index -= 1;
        }
        if (index === -1) {
          game.move(i, j, false);
        }
      }
    }
  }
}

let controller = new GamesController();
module.exports = {
  list: controller.list.bind(controller),
  create: controller.create.bind(controller),
  details: controller.details.bind(controller),
  update: controller.update.bind(controller),
  remove: controller.remove.bind(controller)
};
