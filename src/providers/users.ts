import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

import { User } from '../models/user';
import { Follower } from '../models/follower';
import { Following } from '../models/following';
import { Repo } from '../models/repo';
import { Gist } from '../models/gist';
import { SearchResult } from '../models/search-result';

@Injectable()
export class UsersProvider {
  apiUrl = 'https://api.github.com';

  constructor(public http: HttpClient) {}

  load(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  loadDetails(login: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${login}`);
  }

  searchUsers(searchParam: string): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${this.apiUrl}/search/users?q=${searchParam}`);
  }

  followers(login: string, page: number = 1): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.apiUrl}/users/${login}/followers?page=${page}`); 
  }

  following(login: string, page: number = 1): Observable<Following[]> {
    return this.http.get<Following[]>(`${this.apiUrl}/users/${login}/following?page=${page}`); 
  }

  repos(login: string, page: number = 1): Observable<Repo[]> {
    return this.http.get<Repo[]>(`${this.apiUrl}/users/${login}/repos?page=${page}`); 
  }

  gists(login: string, page: number = 1): Observable<Gist[]> {
    return this.http.get<Gist[]>(`${this.apiUrl}/users/${login}/gists?page=${page}`);
  }
}
