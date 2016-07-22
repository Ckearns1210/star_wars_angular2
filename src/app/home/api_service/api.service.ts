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
     return this.http.get(character.url)
     //flatten out results of first results stream and extract the films
      .flatMap((response: Response) => response.json().films)
      //flatten out the second request,
      .flatMap((film: string) => this.http.get(film),
               (_, resp) => resp.json().title)
  }



    searchMovies(arr){
      Observable.forkJoin(
        arr.forEach((film) => {
           return this.http.get(film).map((res:Response) => {
            res.json()
          })
        })
      ).subscribe((results)=> {
        console.log(results)
      })

    }
      // .map((film) => {
      //   .flatMap((film) => {
      //     return that.http.get(film)
      //       .map((response: Response) => {
      //         response.json()
      //       })
      //   })
      // })
      // .flatMap((film) => {
      //   return that.http.get(film)
      //     .map((response: Response) => {
      //       response.json()
      //     })
      // })

}
