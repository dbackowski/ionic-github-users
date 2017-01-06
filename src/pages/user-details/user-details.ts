import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../models/user';
import { Users } from '../../providers/users';
import { FavoriteUsers } from "../../providers/favorite-users";

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  login: string;
  user: User;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    private Users: Users,
    private favoriteUsers: FavoriteUsers,
    private toastCtrl: ToastController,
  ) {
    this.login = navParams.get('login');

    Users.loadDetails(this.login).subscribe(user => {
      this.user = user;
      console.log(user)
    })
  }

  ionViewDidLoad() {
    console.log('Hello UserDetailsPage Page');
  }

  public addToFavorites(login: string) {
    this.favoriteUsers.add(login).then(() => {
      this.toastCtrl.create({
          message: 'User added to favorites.',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

}
