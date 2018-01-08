import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from './../../models/user';
import { UsersProvider } from './../../providers/users';
import { UserDetailsPageComponent } from './../user-details/user-details';
import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'page-users',
  templateUrl: 'search-users.html'
})
export class SearchUsersPageComponent {
  users: User[]

  constructor(
    public navCtrl: NavController, 
    private usersProvider: UsersProvider, 
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
  ) {}

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPageComponent, {login});
  }

  search(searchEvent) {
    let term = searchEvent.target.value

    if (term.trim().length >= 2) {
      this.loadingProvider.show();

      this.usersProvider.searchUsers(term).finally(
        () => {
          this.loadingProvider.hide();
        }
      ).subscribe(
        result => {
          this.users = result.items;
        },
        error => {
          this.toastProvider.error('API response error.');
        }
      );
    }
  }
}
