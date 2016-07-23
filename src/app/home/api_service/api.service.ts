import {Component, Injectable, OnInit, ElementRef, EventEmitter, Inject} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { MovieResult } from '../../models/movie-result'
import 'rxjs/Rx'


@Injectable()
export class ApiService {
  constructor(public http: Http) {
  }

  search(character): Observable<any> {
    let queryUrl: string = character.url;
    return this.http.get(character.url)
      //flatten out results of first results stream and extract the films, flatMap performs map, but instead of returning an observable, it subscribes to each observable returning the data.
      .flatMap((response: Response) => response.json().films)
      //flatten out the second request, this request takes the film we extracted and and does a new request for that film, and adds it to the stream as json when it is done
      .flatMap((film: string) => this.http.get(film),
      (_, resp) => resp.json())
      ////Typescript's object destructuring syntax, takes just the title and release_date from each object coming out of flatMap stream and creates new object
      .map(({title, release_date}) => ({ title, release_date }))
  }
}
