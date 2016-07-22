import { Component, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service/character.service';
import { Observable } from 'rxjs'
import { ApiService } from '../api_service/api.service'

@Component({
  selector: 'characters',
  providers: [
    CharacterData, ApiService
  ],
  outputs: ['loadingEmit', 'results', 'resultsComplete', 'updateCharacter'],
  pipes: [ ],
  styleUrls: [ './characters.style.css', './spinner.css' ],
  templateUrl: './characters.template.html'
})
export class CharacterComponent {
  private loadingEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  private loading : boolean = false;
  private results: EventEmitter<any> = new EventEmitter<any>();
  private resultsComplete: EventEmitter<boolean> = new EventEmitter<boolean>();
  private updateCharacter: EventEmitter<any> = new EventEmitter<any>();
  private data: any
  //set empty characterArray of type Character(from character model)
  private characterArray: Array<Character> = []
  // Set our default values
  private localState = { character_chosen: '', displaying_movies: false };
  constructor(public appState: AppState, public character: CharacterData, private apiService: ApiService) {

  }

  ngOnInit(): void {
    //subscribe to observable returned from http call in service, map over return and create iterable array of characters from character model to use in template for intial data
    this.data = this.character.getData().subscribe(data =>
      {
        const dataArray= data.characters
        dataArray.forEach((object)=>
          this.characterArray.push(new Character(object.name, object.url))
        )
      });
  }

  checkCharacter(character) {
    if (  this.appState.get().character_chosen === character.name) {
      return true
    }
    else return false;

  }
  submitState(state) {
    this.appState.set(state)
    console.log('app state is: ', this.appState.get())
  }

  getApiData(character) {
    //emit loading event
    this.loadingEmit.next(true);
    this.loading = true;
    this.apiService.search(character)
    .subscribe((results) => { // on sucesss
          console.log(results)
          this.results.next(results)
        },
        (err: any) => {
          // on error
          console.log(err);
        },
        () => { // on completion
          this.resultsComplete.next(true)
          this.loading = false;
          this.loadingEmit.next(false)
        }
      );
  }

  logState(character) {
    this.localState.character_chosen = character.name; this.localState.displaying_movies = false;
    this.submitState(this.localState);
    this.getApiData(character)
    this.updateCharacter.next(character.name)
    console.log('localState is: ', this.localState)
    }



  initialDataReceived() {
    if (this.characterArray === []) {
      return false
    }
    else return true
  }
}
