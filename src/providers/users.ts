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
export class UsersProvider {
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

  followers(login: string, page: number = 1): Observable<Follower[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/followers?page=${page}`) 
      .map(res => <Follower[]>(res.json()));
  }

  following(login: string, page: number = 1): Observable<Following[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/following?page=${page}`) 
      .map(res => <Following[]>(res.json()));
  }

  repos(login: string, page: number = 1): Observable<Repo[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/repos?page=${page}`) 
      .map(res => <Repo[]>(res.json()));
  }

  gists(login: string, page: number = 1): Observable<Gist[]> {
    return this.http.get(`${this.apiUrl}/users/${login}/gists?page=${page}`)
      .map(res => <Gist[]>(res.json()));
  }
}
