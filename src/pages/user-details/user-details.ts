import { Component } from '@angular/core';
import { Events, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { UserFollowersPageComponent } from '../user-followers/user-followers';
import { UserFollowingPageComponent } from '../user-following/user-following';
import { UserReposPageComponent } from '../user-repos/user-repos';
import { UserOverviewPageComponent } from '../user-overview/user-overview';

@Component({
  selector: 'sg-page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPageComponent {
  login: string;
  user: string;
  tab1Root: any = UserOverviewPageComponent;
  tab2Root: any = UserFollowersPageComponent;
  tab3Root: any = UserFollowingPageComponent;
  tab4Root: any = UserReposPageComponent;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private events: Events,
  ) {}

  ionViewDidLoad() {
    this.login = this.navParams.get('login');
  }
}
