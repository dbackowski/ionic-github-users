import { Component } from '@angular/core';
import { Events, NavController, ToastController, LoadingController } from 'ionic-angular';

import { FavouriteUsers } from "../../providers/favourite-users";
import { UserDetailsPageComponent } from '../user-details/user-details';
import { FavouriteUser } from "../../models/favourite-user";

@Component({
  selector: 'sg-page-favourite-users',
  templateUrl: 'favourite-users.html'
})
export class FavouriteUsersPageComponent {
  public users: FavouriteUser[];

  constructor(
    public navCtrl: NavController, 
    private favouriteUsers: FavouriteUsers, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
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
    let loading = this.loadingCtrl.create({
      content: 'Please wait ...'
    });

    loading.present().then(() => {
      this.fetchFavouriteUsers(loading);
    });
  }

  private fetchFavouriteUsers(loading = null) {
    this.favouriteUsers.load().finally(
      () => {
        loading && loading.dismiss();
      }
    ).subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        this.toastCtrl.create({
          message: 'Error occured.',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }
}
