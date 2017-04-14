import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Following } from '../../models/following';
import { UsersProvider } from '../../providers/users';
import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'page-user-following',
  templateUrl: 'user-following.html'
})
export class UserFollowingPageComponent {
  public following: Following[];
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
    this.loadFollowing();
  }

  public loadFollowing() {
    this.loadingProvider.show();

    this.usersProvider.following(this.login).finally(
      () => {
        this.loadingProvider.hide();
      }
    ).subscribe(
      (following) => {
        this.following = following;
      },
      (error) => {
        this.toastProvider.error('API response error.');
      }
    );
  }

  public loadMore(infiniteScroll) {
    this.usersProvider.following(this.login, this.page + 1).finally(
      () => {
        infiniteScroll.complete();
      }
    ).subscribe(
      (following) => {
        following.forEach((follow) => {
          this.following.push(follow);
        })
        
        this.page += 1;
      }
    )
  }
}
