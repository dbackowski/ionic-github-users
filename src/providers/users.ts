import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

import { User } from '../models/user';

@Injectable()
export class Users {
  apiUrl = 'https://api.github.com';

  constructor(public http: Http) {}

  load(): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/users`)
      .map(res => <User[]>res.json());
  }

  loadDetails(login: string): Observable<User> {
    return this.http.get(`${this.apiUrl}/users/${login}`)
      .map(res => <User>(res.json()))
  }

  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/search/users?q=${searchParam}`) 
      .map(res => <User[]>(res.json().items))
  }
}
