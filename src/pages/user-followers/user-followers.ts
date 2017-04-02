import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Follower } from '../../models/follower';
import { Users } from '../../providers/users';

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
    private users: Users,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
  ) {
    this.login = navParams.data;
  }

  ionViewDidLoad() {
    this.loadFollowers();
  }

  public loadFollowers() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      this.users.followers(this.login).finally(
        () => {
          loading.dismiss();
        }
      ).subscribe(
        (followers) => {
          this.followers = followers;
        },
        (error) => {
          this.toastCtrl.create({
            message: 'API response error.',
            duration: 3000,
            position: 'bottom'
          }).present();
        }
      );
    });
  }

  public loadMore(infiniteScroll) {
    this.users.followers(this.login, this.page + 1).finally(
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
