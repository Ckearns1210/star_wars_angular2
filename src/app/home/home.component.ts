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

    clearResults(boo) {
      this.results =[];
    }

    updateResults(result) {
      this.results.push(result)
    }
}
