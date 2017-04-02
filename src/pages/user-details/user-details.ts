import { Component } from '@angular/core';
import { Events, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Rx'

import { UserFollowersPageComponent } from '../user-followers/user-followers';
import { UserFollowingPageComponent } from '../user-following/user-following';
import { UserReposPageComponent } from '../user-repos/user-repos';
import { UserOverviewPageComponent } from '../user-overview/user-overview';
import { UserGistsPageComponent } from '../user-gists/user-gists';
import { FavouriteUsers } from "../../providers/favourite-users";
import { Users } from '../../providers/users';
import { User } from '../../models/user';

@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPageComponent {
  login: string;
  user: User;
  inFavourites: boolean = false;

  tab1Root: any = UserOverviewPageComponent;
  tab2Root: any = UserFollowersPageComponent;
  tab3Root: any = UserFollowingPageComponent;
  tab4Root: any = UserReposPageComponent;
  tab5Root: any = UserGistsPageComponent;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private events: Events,
    private favouriteUsers: FavouriteUsers,
    private users: Users,
  ) {
    this.login = this.navParams.get('login');
  }

  ionViewDidLoad() {
    this.loadUser();
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
