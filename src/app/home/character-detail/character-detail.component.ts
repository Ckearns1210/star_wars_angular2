import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service';

@Component({
  selector: 'character-detail',
  providers: [
    CharacterData
  ],
  inputs: ['loadingEmit', 'results', 'resultsComplete', 'currentCharacterName'],
  styleUrls: [ './character-detail.style.css' ],
  templateUrl: './character-detail.template.html'
})
export class CharacterDetailComponent {
   results: any
   currentCharacterName: string
 constructor(public appState: AppState) {

 }


}
