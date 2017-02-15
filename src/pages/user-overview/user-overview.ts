import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Rx'

import { User } from '../../models/user';
import { FavouriteUsers } from "../../providers/favourite-users";

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
    private favouriteUsers: FavouriteUsers,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private events: Events,
  ) {
    this.user = this.navParams.data.user;
    this.inFavourites = this.navParams.data.inFavourites;
  }

  public addToFavourites(login: string, avatarUrl: string) {
    this.favouriteUsers.add(login, avatarUrl).subscribe(() => {
      this.inFavourites = true;
      this.publishFavouriteUsersRefreshEvent();
      
      this.toastCtrl.create({
          message: 'User added to favourites.',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  public removeFromFavourites(login: string) {
    this.favouriteUsers.delete(login).subscribe(() => {
      this.inFavourites = false;
      this.publishFavouriteUsersRefreshEvent();

      this.toastCtrl.create({
          message: 'User removed from favourites.',
          duration: 3000,
          position: 'bottom'
        }).present();
    });
  }

  private publishFavouriteUsersRefreshEvent() {
    this.events.publish('favourite-users:refresh');
  }
}
