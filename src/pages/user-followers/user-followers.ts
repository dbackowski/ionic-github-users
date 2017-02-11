import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Follower } from '../../models/follower';
import { Users } from '../../providers/users';

@Component({
  selector: 'sg-page-user-followers',
  templateUrl: 'user-followers.html'
})
export class UserFollowersPageComponent {
  public followers: Follower[];
  private login: string;

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
}
