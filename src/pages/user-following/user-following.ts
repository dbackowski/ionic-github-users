import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Following } from '../../models/following';
import { Users } from '../../providers/users';

@Component({
  selector: 'sg-page-user-following',
  templateUrl: 'user-following.html'
})
export class UserFollowingPageComponent {
  public following: Following[];
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
    this.loadFollowing();
  }

  public loadFollowing() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      this.users.following(this.login).finally(
        () => {
          loading.dismiss();
        }
      ).subscribe(
        (following) => {
          this.following = following;
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
