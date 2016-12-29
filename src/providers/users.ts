import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

import { User } from './../models/user';

/*
  Generated class for the Users provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Users {
  apiUrl = 'https://api.github.com';

  constructor(public http: Http) {
    console.log('Hello Users Provider');
  }

  load(): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/users`)
      .map(res => <User[]>res.json());
  }

  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.apiUrl}/users/${login}`)
      .map(res => <User>(res.json()))
  }
}
