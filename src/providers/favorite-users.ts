import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class FavoriteUsers {
  apiUrl = 'https://api.github.com';

  constructor(private storage: Storage) {}

  public load(): Promise<any> {
    //this.storage.remove('users');
    return this.storage.get('users');
  }

  public add(login: string, avatarUrl: string): Promise<any> {
    //this.storage.remove('users');

    return this.load().then((users) => {
      console.log(users);
      users = users ? users : []; 
      users.push({ login: login, avatar_url: avatarUrl });
      console.log(users);
      this.storage.set('users', users);
    })
  }

  public delete(login: string): Promise<any> {
    return this.load().then((users) => {
      console.log(users);
      console.log('usuwam');
      console.log(users.filter((user) => user.login !== login));
      this.storage.set('users', users.filter((user) => user.login !== login));
    });
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
