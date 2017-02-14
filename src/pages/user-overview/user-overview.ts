import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Rx'

import { User } from '../../models/user';
import { FavouriteUsers } from "../../providers/favourite-users";
import { Users } from '../../providers/users';

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
    private users: Users,
  ) {}

  ionViewDidLoad() {
    this.login = this.navParams.data;
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
      let toLoad = [this.users.loadDetails(this.login), this.favouriteUsers.load()];

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
