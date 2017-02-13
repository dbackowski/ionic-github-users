import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';

@Component({
  selector: 'sg-page-user-overview',
  templateUrl: 'user-overview.html'
})
export class UserOverviewPageComponent {
  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log(this.navParams.data);
    this.user = this.navParams.data;
    console.log(this.user);
  }
}
