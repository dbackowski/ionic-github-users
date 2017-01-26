import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { FavoriteUsers } from "../../providers/favorite-users";
import { UserDetailsPageComponent } from '../user-details/user-details';
import { FavoriteUser } from "../../models/favorite-user";

@Component({
  selector: 'sg-page-favorite-users',
  templateUrl: 'favorite-users.html'
})
export class FavoriteUsersPageComponent {
  public users: FavoriteUser[];

  constructor(
    public navCtrl: NavController, 
    private favoriteUsers: FavoriteUsers, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  ionViewDidEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      this.favoriteUsers.load().finally(
        () => {
          loading.dismiss();
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
    });
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPageComponent, {login});
  }
}
