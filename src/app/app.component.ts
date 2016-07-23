/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { GithubComponent } from './github/github.component'

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    String('../assets/css/app.scss'), ('../assets/css/normalize.css')
  ],
  template: `
    <md-content>
      <md-toolbar color="warn">
          <img [src]="starWarsLogo" width="12%" style="max-height: 85%;">
          <span class="fill"></span>
      </md-toolbar>
      <md-progress-bar mode="indeterminate" color="primary" *ngIf="loading"></md-progress-bar>
      <main>
        <router-outlet></router-outlet>
      </main>
      <github></github>
    </md-content>
  `,
  directives: [GithubComponent]
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
