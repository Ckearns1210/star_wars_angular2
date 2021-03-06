import {
  beforeEachProviders,
  inject,
  it
} from '@angular/core/testing';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { CharacterData } from './character.service';

describe('CharacterData', () => {
  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    {
      provide: Http,
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    },
    CharacterData
  ]);


  it('should have http', inject([ CharacterData ], (character) => {
    expect(!!character.http).toEqual(true);
  }));

  it('should get data from the server', inject([ CharacterData ], (character) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    character.getData();
    expect(console.log).toHaveBeenCalled();
    expect(character.getData()).toEqual({
      "characters": [{
        "name": "Luke Skywalker",
        "url": "https://swapi.co/api/people/1/"
      }, {
        "name": "Darth Vader",
        "url": "https://swapi.co/api/people/4/"
      }, {
        "name": "Obi-wan Kenobi",
        "url": "https://swapi.co/api/people/10/"
      }, {
        "name": "R2-D2",
        "url": "https://swapi.co/api/people/2/"
      }]
    }
);
  }));

});
