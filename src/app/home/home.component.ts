import { Component } from '@angular/core';
import { CharacterComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component'



//Dumb Parent Component
@Component({
  selector: 'home',
  directives: [CharacterComponent, CharacterDetailComponent],
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html'
})
export class Home {
   currentCharacterName: string
   results: any

    updateCharacter(name: string) {
      this.currentCharacterName = name
    }

    updateResults(result) {
      this.results = result
      console.log(this.results)
    }
}
