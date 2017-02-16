import { Component, Input } from '@angular/core';

@Component({
  selector: 'my-pet',
  template: `<div>My id is : {{ petId }}</div><h1>Nickname: <pet-nickname nick="none selected"></pet-nickname></h1>`
})
export class PetComponent {
  @Input()
  petId: string
}
