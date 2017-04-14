import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class FavouriteUsersProvider {
  constructor(private storage: Storage) {}

  public load(): Observable<any> {
    return Observable.fromPromise(this.storage.get('users').then((users) => users || []));
  }

  public add(login: string, avatarUrl: string): Observable<any> {
    return this.load().flatMap(
      (users) => {
        users = users ? users : [];
        users.push({ login, avatar_url: avatarUrl });
        return Observable.fromPromise(this.storage.set('users', users));
      }
    )
  }

  public delete(login: string): Observable<any> {
    return this.load().flatMap((users) => {
      return Observable.fromPromise(this.storage.set('users', users.filter((user) => user.login !== login)));
    });
  }

  public count(): Observable<any> {
    return this.load().map(
      (users) => {
        return users.length;
      }
    );
  }
}
