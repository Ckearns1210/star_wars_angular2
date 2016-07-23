import { Component, ChangeDetectionStrategy, EventEmitter, trigger, state, style, transition, animate  } from '@angular/core';
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
  outputs: ['results', 'clearResults'],
  pipes: [],
  styleUrls: ['./characters.style.css', './spinner.css'],
  templateUrl: './characters.template.html',
  animations: [
    trigger('appStateObject', [
      state('characters',style({ opacity: 1, transform: 'translateX(0)' })),
      state('movies', style({ opacity: 0, transform: 'translateX(-100vw)', display: 'none' })),
      transition('characters => movies', [
        animate('0.2s ease-in')
      ])
    ]),
    trigger('enter', [
      state('characters', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('0.2s ease-in')
      ]),
      transition('* => void', [
        animate('0.2s 10 ease-out', style({
          opacity: 0,
          transform: 'translateX(100vw)'
        }))
      ])
    ])
  ]
})

export class CharacterComponent {
  //loading boolean
  private loading: boolean = false;
  //Emit results from API call
  private results: EventEmitter<any> = new EventEmitter<any>();
//clear search results
  private clearResults: EventEmitter<any> = new EventEmitter<any>();
  //Initial Character Load Data
  private data: any
  //set empty characterArray of type Character(from character model)
  private characterArray: Array<Character> = []
  // Set our initial value
  private appStateObject = { character_chosen: '', state: 'enter' }

  constructor(public appState: AppState, public character: CharacterData, private apiService: ApiService) { }

  ngOnInit(): void {
    this.data = this.character.getData().subscribe(data => {
      //subscribe to observable returned from http call in service, map over return and create iterable array of characters from character model to use in template for intial data
      const dataArray = data.characters
      dataArray.forEach((object) =>
        this.characterArray.push(new Character(object.name, object.url))
      )
    });
    // subscribe to changes in appState
    this.appState.getStateChangeEvent().subscribe((event) => {
      this.appStateObject = event
      console.log('New App State Is', this.appState.state);
    })
    this.submitState({ state: 'characters' })
  }

  checkCharacter(character) {
    if (this.appState.get().character_chosen === character.name) {
      return true
    }
    else return false;

  }
  submitState(state) {
    //submit to state storage
    this.appState.set(state)
  }

  getApiData(character) {
    this.clearResults.emit('event')
    //turn on loading
    this.loading = true;
    //call api
    this.apiService.search(character)
      .subscribe((results) => {

        this.results.next(results)
      },
      (err: any) => {
        // on error
        console.log(err);
      },
      () => { // on completion
        //set state to movies
        this.submitState({ state: 'movies' })
        //turn off loading
        this.loading = false;
      }
      );
  }

  logState(character) {
    //submit state to state storage
    this.submitState({ character_chosen: character.name });
    // call api
    this.getApiData(character)
    //change character name

  }



  initialDataReceived() {
    if (this.characterArray === []) {
      return false
    }
    else return true
  }


}
