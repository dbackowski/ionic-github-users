import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoriteUsers {
  apiUrl = 'https://api.github.com';

  constructor(private storage: Storage) {}

  public load(): Promise<any> {
    return this.storage.get('users')
  }

  public add(login: string): Promise<any> {
    return this.storage.set('users', [login])
  }

  public delete() {

  }
/*
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
  */
}
