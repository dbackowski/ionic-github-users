import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../models/user';
import { Users } from '../../providers/users';
import { FavoriteUsers } from "../../providers/favorite-users";

@Component({
  selector: 'sg-page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPageComponent {
  login: string;
  user: User;
  inFavorites: boolean = false;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    private Users: Users,
    private favoriteUsers: FavoriteUsers,
    private toastCtrl: ToastController,
  ) {
    this.login = navParams.get('login');
  }

  ionViewDidLoad() {
    this.Users.loadDetails(this.login).subscribe(user => {
      this.user = user;
    });

    this.favoriteUsers.load().subscribe((users) => {
      if (users) {
        this.inFavorites = users.filter((user) => user.login == this.login).length > 0;
      }
    });
  }

  public addToFavorites(login: string, avatarUrl: string) {
    this.favoriteUsers.add(login, avatarUrl).subscribe(() => {
      this.inFavorites = true;

      this.toastCtrl.create({
          message: 'User added to favorites.',
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  public removeFromFavorites(login: string) {
    this.favoriteUsers.delete(login).subscribe(() => {
      this.inFavorites = false;
      
      this.toastCtrl.create({
          message: 'User removed from favorites.',
          duration: 3000,
          position: 'bottom'
        }).present();
    });
  }
}
