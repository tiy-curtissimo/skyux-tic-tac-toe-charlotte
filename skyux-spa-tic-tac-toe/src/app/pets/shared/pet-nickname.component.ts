import { Component, Input } from '@angular/core';

@Component({
  selector: 'pet-nickname',
  template: `<h2>Nickname: {{ nick }} {{ id }}</h2>`
})
export class PetNicknameComponent {
  @Input()
  nick: string

  @Input()
  id: string
}
