import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service';

@Component({
  selector: 'character-detail',
  providers: [
    CharacterData
  ],
  pipes: [ ],
  styleUrls: [ './character-detail.style.css' ],
  templateUrl: './character-detail.template.html'
})
export class CharacterDetailComponent {
}
