import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { Follower } from '../models/follower';
import { Following } from '../models/following';
import { Repo } from '../models/repo';
import { Gist } from '../models/gist';

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
      .map(res => <User>(res.json()));
  }

  searchUsers(searchParam: string): Observable<User[]> {
    return this.http.get(`${this.apiUrl}/search/users?q=${searchParam}`) 
      .map(res => <User[]>(res.json().items));
  }

  followers(login: string): Observable<Follower[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/followers`) 
      .map(res => <Follower[]>(res.json()));
  }

  following(login: string): Observable<Following[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/following`) 
      .map(res => <Following[]>(res.json()));
  }

  repos(login: string): Observable<Repo[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/repos`) 
      .map(res => <Repo[]>(res.json()));
  }

  gists(login: string): Observable<Gist[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/gists`)
      .map(res => <Gist[]>(res.json()));
  }
}
