import { Component } from '@angular/core';
import { CharacterComponent } from './characters/characters.component';
import { CharacterDetailComponent } from './character-detail/character-detail.component'
import { ApiService } from './api_service/api.service'



//Dumb Parent Component
@Component({
  selector: 'home',
  directives: [CharacterComponent, CharacterDetailComponent],
  styleUrls: [ './home.style.css' ],
  templateUrl: './home.template.html',
  providers: [ApiService]
})
export class Home {
   currentCharacterName: string
   results: Array<any> = []
   cardState = {state: 'void'}

    updateCardState(state) {
      this.cardState = state
      console.log(this.cardState)
    }

    updateCharacter(name: string) {
      this.currentCharacterName = name
      //set results back to 0
      this.results =[];
    }

    updateResults(result) {
      this.results.push(result)
      console.log(this.results)
    }
}
