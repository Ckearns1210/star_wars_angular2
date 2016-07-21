/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    String('./app.scss'),
  ],
  template: `
    <md-content>
      <md-toolbar color="warn">
          <img [src]="starWarsLogo" width="12%">
          <span class="fill"></span>
      </md-toolbar>
      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>
      <main>
        <router-outlet></router-outlet>
      </main>

      <pre class="app-state">this.appState.state = {{ appState.state | json }}</pre>

      <footer>
      </footer>
    </md-content>
  `
})
export class App {

  starWarsLogo = 'assets/img/star_wars_logo.png';
  loading = false;

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}
