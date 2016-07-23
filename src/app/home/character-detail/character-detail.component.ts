import { Component, ChangeDetectionStrategy, OnInit, trigger, state, style, transition, animate } from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service';
import { CharacterComponent } from '../characters/characters.component'

@Component({
  selector: 'character-detail',
  providers: [
    CharacterData, CharacterComponent
  ],
  inputs: ['loadingEmit', 'results', 'resultsComplete', 'cardState'],
  styleUrls: [ './character-detail.style.css' ],
  templateUrl: './character-detail.template.html',
  animations: [
   trigger('appStateObject', [
     state('characters', style({
       display: 'none',
     })),
     state('movies',   style({
       display: 'block'
     })),
     transition('void => active', animate('500ms ease-in')),
     transition('active => inactive', animate('100ms ease-out'))
   ])
 ]
})

export class CharacterDetailComponent implements OnInit {
   results: any
private appStateObject = { character_chosen: '', state: 'characters'}
currentCharacterName: string


 constructor(public appState: AppState, private char: CharacterComponent) {
   this.currentCharacterName = this.appStateObject.character_chosen
 }
 ngOnInit() {
   this.appState.getStateChangeEvent().subscribe((event) => {
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
