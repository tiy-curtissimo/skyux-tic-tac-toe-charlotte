import { Injectable } from '@angular/core';
import { TicTacToeGame } from './tic-tac-toe-game';

@Injectable()
export class TicTacToeGameDataService {
  games: TicTacToeGame[];

  constructor() {
    let json = localStorage.getItem("ttt-games") || "[]";
    this.games = JSON.parse(json)
      .map(gameState => new TicTacToeGame(gameState));
  }

  createGame(title: string): TicTacToeGame {
    let game = new TicTacToeGame(title);
    this.games.push(game);
    return game;
  }

  getAllGames(): TicTacToeGame[] {
    return this.games;
  }

  removeGame(game: TicTacToeGame): void {
    let index = this.games
      .findIndex(g => g === game);
    this.games.splice(index, 1);
  }

  saveAll(): void {
    let json = JSON.stringify(this.games);
    localStorage.setItem('ttt-games', json);
  }
}