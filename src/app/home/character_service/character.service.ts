import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class CharacterData {

  constructor(public http: Http) {

  }

  getData() {
    return this.http.get('/assets/data.json')
    .map(res => res.json());
  }

}
