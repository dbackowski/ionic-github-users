import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { Users } from './../../providers/users';

/*
  Generated class for the UserDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html'
})
export class UserDetailsPage {
  login: string;
  user: User;

  constructor(public navCtrl: NavController, private navParams: NavParams, private Users: Users) {
    this.login = navParams.get('login');

    Users.loadDetails(this.login).subscribe(user => {
      this.user = user;
      console.log(user)
    })
  }

  ionViewDidLoad() {
    console.log('Hello UserDetailsPage Page');
  }

}
