import { Component } from '@angular/core';
import { Events, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx'

import { User } from '../../models/user';
import { Users } from '../../providers/users';
import { FavouriteUsers } from "../../providers/favourite-users";

@Component({
  selector: 'sg-page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPageComponent {
  login: string;
  user: User;
  inFavourites: boolean = false;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    private Users: Users,
    private favouriteUsers: FavouriteUsers,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private events: Events,
  ) {
    this.login = navParams.get('login');
  }

  ionViewDidLoad() {
    this.loadUser();
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

  private loadUser() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      let toLoad = [this.Users.loadDetails(this.login), this.favouriteUsers.load()];

      Observable.forkJoin(toLoad).finally(
        () => {
          loading.dismiss();
        }
      ).subscribe(
        (resources) => {
          this.user = resources[0];

          if (resources[1]) {
            this.inFavourites = resources[1].find((user) => user.login == this.login);
          }
        }
      );
    });
  }
}
