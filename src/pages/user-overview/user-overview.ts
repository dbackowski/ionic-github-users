import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Rx'

import { User } from '../../models/user';
import { FavouriteUsersProvider } from "../../providers/favourite-users";
import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'sg-page-user-overview',
  templateUrl: 'user-overview.html'
})
export class UserOverviewPageComponent {
  public user: User;
  public inFavourites: boolean = false;
  private login: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private favouriteUsersProvider: FavouriteUsersProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
    private events: Events,
  ) {
    this.user = this.navParams.data.user;
    this.inFavourites = this.navParams.data.inFavourites;
  }

  public addToFavourites(login: string, avatarUrl: string) {
    this.favouriteUsersProvider.add(login, avatarUrl).subscribe(() => {
      this.inFavourites = true;
      this.publishFavouriteUsersRefreshEvent();
      this.toastProvider.info('User added to favourites.');
    });
  }

  public removeFromFavourites(login: string) {
    this.favouriteUsersProvider.delete(login).subscribe(() => {
      this.inFavourites = false;
      this.publishFavouriteUsersRefreshEvent();
      this.toastProvider.info('User removed from favourites.');
    });
  }

  private publishFavouriteUsersRefreshEvent() {
    this.events.publish('favourite-users:refresh');
  }
}
