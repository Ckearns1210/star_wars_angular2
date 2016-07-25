import { Component, ChangeDetectionStrategy, OnInit, trigger, state, style, transition, animate, EventEmitter} from '@angular/core';
import { Character } from '../../models/character-models'
import { AppState } from '../../app.service';
import { CharacterData } from '../character_service';
import { CharacterComponent } from '../characters/characters.component';
import {ROUTER_DIRECTIVES, Router} from "@angular/router";


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
    state('characters', style({ opacity: 0, transform: 'translateX(200vw)', position: 'absolute', top: 0, right: 0 })),
    state('movies', style({ opacity: 1, transform: 'translateX(0)' })),
    transition('characters => movies', [
      animate('0.4s ease-in')
    ]),
    transition('movies => characters', [
      animate('0.4s ease-out')
    ]),
    transition('* => characters', [
      style({
        opacity: 0,
        transform: 'translateX(200vw)'
      }),
      animate('0.4s ease-out')
    ]),
  ])
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
      //autoscroll workaround for mobile, API may change on this
      if (this.appStateObject.state === 'movies') {
          window.scrollTo(0, 0);
      }

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
