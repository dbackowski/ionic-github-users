import { Component } from '@angular/core';
import { Events, NavController, ToastController, LoadingController } from 'ionic-angular';

import { FavouriteUsersProvider } from '../../providers/favourite-users';
import { UserDetailsPageComponent } from '../user-details/user-details';
import { FavouriteUser } from '../../models/favourite-user';
import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'page-favourite-users',
  templateUrl: 'favourite-users.html'
})
export class FavouriteUsersPageComponent {
  public users: FavouriteUser[];

  constructor(
    public navCtrl: NavController, 
    private favouriteUsersProvider: FavouriteUsersProvider, 
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private events: Events,
  ) {
    this.events.subscribe('favourite-users:refresh', () => {
      this.fetchFavouriteUsers();
    });
  }

  public ionViewDidLoad() {
    this.loadfavouriteUsers();
  }

  public goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPageComponent, {login});
  }

  private loadfavouriteUsers() {
    this.loadingProvider.show().then(() => {
      this.fetchFavouriteUsers(this.loadingProvider);
    });
  }

  private fetchFavouriteUsers(loading = null) {
    this.favouriteUsersProvider.load().finally(
      () => {
        loading && loading.hide();
      }
    ).subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        this.toastProvider.error('Error occured.');
      }
    );
  }
}
