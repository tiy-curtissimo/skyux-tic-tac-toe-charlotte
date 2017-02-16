import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import { TicTacToeComponent } from './tic-tac-toe.component';
import { TicTacToeGame } from './tic-tac-toe-game';

describe('TicTacToeComponent', () => {

  let comp:    TicTacToeComponent;
  let fixture: ComponentFixture<TicTacToeComponent>;
  let game:    TicTacToeGame;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TicTacToeComponent ]
    });

    fixture = TestBed.createComponent(TicTacToeComponent);

    comp = fixture.componentInstance;
    game = new TicTacToeGame('Test Game');
  });

  it ('should render the title of the game', () => {
    comp.game = game;
    let el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    expect(el.querySelector('.tic-tac-toe-board-title').innerHTML)
      .toBe('Test Game');
  });

  it ('should correctly render the board with Xs and Os', () => {
    game.board = [NaN, 3, 3, 7, NaN, 7, 3, NaN, 7];
    comp.game = game;
    let el = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();

    let squares = fixture.debugElement.queryAll(By.css('.tic-tac-toe-square'));
    expect(squares.length).toBe(game.board.length);
    expect(squares[0].nativeElement.innerHTML).toContain('&nbsp;');
    expect(squares[1].nativeElement.innerHTML).toContain('X');
    expect(squares[2].nativeElement.innerHTML).toContain('X');
    expect(squares[3].nativeElement.innerHTML).toContain('O');
    expect(squares[4].nativeElement.innerHTML).toContain('&nbsp;');
    expect(squares[5].nativeElement.innerHTML).toContain('O');
    expect(squares[6].nativeElement.innerHTML).toContain('X');
    expect(squares[7].nativeElement.innerHTML).toContain('&nbsp;');
    expect(squares[8].nativeElement.innerHTML).toContain('O');
  });
});
