import { NgModule } from '@angular/core';
import { TicTacToeGameDataService } from './game-data.service';
// Specify entry components, module-level providers, etc. here.
@NgModule({
  imports: [], // NOT SKYUX2!
  exports: [], // NOT SKYUX2!
  providers: [ TicTacToeGameDataService ],
  entryComponents: []
})
export class AppExtrasModule { }
