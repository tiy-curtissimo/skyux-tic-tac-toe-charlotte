import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicTacToeGameDataService } from './game-data.service';
import { TicTacToeGame } from './tic-tac-toe-game';

@Component({
  selector: 'tic-tac-toe-game-lobby',
  templateUrl: './tic-tac-toe-game-lobby.component.html',
  styleUrls: ['./tic-tac-toe-game-lobby.component.scss']
})
export class TicTacToeGameLobbyComponent implements OnDestroy, OnInit {
  games: TicTacToeGame[] = [];
  selectedGame: TicTacToeGame;
  title: string;

  constructor(private service: TicTacToeGameDataService) {}

  saveAll() {
    this.service.saveAll();
  }

  ngOnDestroy() {
    this.service.saveAll();
  }

  ngOnInit() {
    this.games = this.service.getAllGames();
  }

  deleteGame(game: TicTacToeGame) {
    this.service.removeGame(game);
    if (this.selectedGame === game) {
      this.selectedGame = null;
    }
  }

  createGame(title: string) {
    let game = this.service.createGame(title);
    this.selectedGame = game;
    this.title = '';
  }

  selectGame(game: TicTacToeGame) {
    this.selectedGame = game;
  }
}
