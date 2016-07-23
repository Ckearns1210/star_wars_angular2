import { Component, ChangeDetectionStrategy, OnInit, trigger, state, style, transition, animate, EventEmitter} from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service';
import { CharacterComponent } from '../characters/characters.component'

@Component({
  selector: 'character-detail',
  providers: [
    CharacterData, CharacterComponent
  ],
  inputs: ['results'],
  styleUrls: [ './character-detail.style.css' ],
  templateUrl: './character-detail.template.html',
  animations: [
  trigger('appStateObject', [
    state('characters',style({ opacity: 0, transform: 'translateX(-100vw)' display: 'none'})),
    state('movies', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('characters => movies', [
      animate('0.2s ease-in')
    ]),
    transition('movies => characters', [
      animate('0.3s ease-in')
    ]),
  ]),
]
})

export class CharacterDetailComponent implements OnInit {
results: any
private appStateObject = { character_chosen: '', state: 'characters'}
currentCharacterName: string


 constructor(public appState: AppState, private char: CharacterComponent) {
 }
 ngOnInit() {
   this.appState.getStateChangeEvent().subscribe((event) => {
     this.currentCharacterName = event.character_chosen
      this.appStateObject = event
    })
 }

 submitState(state) {
   //submit to state storage
   this.appState.set(state)
 }

 changeState() {
   this.appState.set({character_chosen: '', state: 'characters'})
 }


}
