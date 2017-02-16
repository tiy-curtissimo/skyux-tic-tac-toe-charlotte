import { Injectable } from '@angular/core';

export class Game {}

@Injectable()
export class TicTacToeDataService {
  getGames(): Promise<Game[]> {
    return Promise.resolve([new Game()]);
  }
}
