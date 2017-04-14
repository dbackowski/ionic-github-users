import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Rx'

import { UserFollowersPageComponent } from '../user-followers/user-followers';
import { UserFollowingPageComponent } from '../user-following/user-following';
import { UserReposPageComponent } from '../user-repos/user-repos';
import { UserOverviewPageComponent } from '../user-overview/user-overview';
import { FavouriteUsersProvider } from '../../providers/favourite-users';
import { UsersProvider } from '../../providers/users';
import { User } from '../../models/user';
import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

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

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    private events: Events,
    private favouriteUsersProvider: FavouriteUsersProvider,
    private usersProvider: UsersProvider, 
    private loadingProvider: LoadingProvider,
  ) {
    this.login = this.navParams.get('login');
  }

  ionViewDidLoad() {
    this.loadUser();
  }

  private loadUser() {
    this.loadingProvider.show();

    let toLoad = [
      this.usersProvider.loadDetails(this.login), 
      this.favouriteUsersProvider.load()
    ];

    Observable.forkJoin(toLoad).finally(
      () => {
        this.loadingProvider.hide();
      }
    ).subscribe(
      (resources) => {
        this.user = resources[0];

        if (resources[1]) {
          this.inFavourites = resources[1].find((user) => user.login == this.login);
        }
      }
    );
  }
}
