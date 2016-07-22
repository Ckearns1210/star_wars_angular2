import {Component, Injectable, OnInit, ElementRef, EventEmitter, Inject} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { MovieResult } from '../../models/movie-result'
import 'rxjs/Rx'


@Injectable()
export class ApiService {
  characterResults: any
  filmResults: any
  constructor(public http: Http) {
  }

  search(character): Observable<any> {
    let that = this
    let queryUrl: string = character.url;
    return this.http.get(queryUrl)
      .map((response: Response) => {
        this.characterResults = response.json().films
        return this.characterResults
      })
      .flatMap((film) => {
        return that.http.get(film[0])
        .map((response: Response) => {
          return response.json().title
        })
      })
    }
}
