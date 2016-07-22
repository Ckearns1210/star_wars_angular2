import { Component, ChangeDetectionStrategy, trigger, state, style, transition, animate } from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service';
import { CharacterComponent } from '../characters/characters.component'

@Component({
  selector: 'character-detail',
  providers: [
    CharacterData, CharacterComponent
  ],
  inputs: ['loadingEmit', 'results', 'resultsComplete', 'currentCharacterName', 'cardState'],
  styleUrls: [ './character-detail.style.css' ],
  templateUrl: './character-detail.template.html',
  animations: [
   trigger('cardState', [
     state('inactive', style({
       backgroundColor: '#eee',
       transform: 'scale(1)'
     })),
     state('active',   style({
       backgroundColor: '#cfd8dc',
       transform: 'scale(1.1)'
     })),
     state('void', style({
       display: 'none'
     })),
     transition('void => active', animate('500ms ease-in')),
     transition('active => inactive', animate('100ms ease-out'))
   ])
 ]
})
export class CharacterDetailComponent {
   results: any
   currentCharacterName: string
   cardState: any

 constructor(public appState: AppState, private char: CharacterComponent) {

 }


}
