import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Follower } from '../../models/follower';
import { UsersProvider } from '../../providers/users';
import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'page-user-followers',
  templateUrl: 'user-followers.html'
})
export class UserFollowersPageComponent {
  public followers: Follower[];
  private login: string;
  private page: number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
  ) {
    this.login = navParams.data;
  }

  ionViewDidLoad() {
    this.loadFollowers();
  }

  public loadFollowers() {
    this.loadingProvider.show();

    this.usersProvider.followers(this.login).finally(
      () => {
        this.loadingProvider.hide();
      }
    ).subscribe(
      (followers) => {
        this.followers = followers;
      },
      (error) => {
        this.toastProvider.error('API response error.');
      }
    );
  }

  public loadMore(infiniteScroll) {
    this.usersProvider.followers(this.login, this.page + 1).finally(
      () => {
        infiniteScroll.complete();
      }
    ).subscribe(
      (followers) => {
        followers.forEach((follower) => {
          this.followers.push(follower);
        })
        
        this.page += 1;
      }
    )
  }
}
