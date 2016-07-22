import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service';

@Component({
  selector: 'characters',
  providers: [
    CharacterData
  ],
  pipes: [ ],
  styleUrls: [ './characters.style.css' ],
  templateUrl: './characters.template.html'
})
export class CharacterComponent {
  private data: any
  //set empty characterArray of type Character(from character model)
  private characterArray: Array<Character> = []
  // Set our default values
  private localState = { character_chosen: '', displaying_movies: false };
  constructor(public appState: AppState, public character: CharacterData) {

  }

  ngOnInit() {
    //subscribe to observable returned from http call in service, map over return and create iterable array of characters from character model to use in template
    this.data = this.character.getData().subscribe(data =>
      {
        const dataArray= data.characters
        dataArray.forEach((object)=>
          this.characterArray.push(new Character(object.name, object.url))
        )
      });
  }

  submitState(state) {
    this.appState.set(state)
    console.log('app state is: ', this.appState.get())
  }

  logState(character) {
    this.localState.character_chosen = character.name; this.localState.displaying_movies = false;
    this.submitState(this.localState);
    console.log('localState is: ', this.localState)
    }

  dataReceived() {
    if (this.characterArray === []) {
      return false
    }
    else return true
  }
}
