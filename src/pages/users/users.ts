import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { User } from './../../models/user';
import { Users } from './../../providers/users';
import { UserDetailsPage } from './../user-details/user-details';

/*
  Generated class for the Users page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-users',
  templateUrl: 'users.html'
})
export class UsersPage {
  users: User[]

  constructor(public navCtrl: NavController, private Users: Users) {}

  ionViewDidLoad() {
    console.log('Hello UsersPage Page');
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent) {
    let term = searchEvent.target.value

    if (term.trim().length >= 2) {
      this.Users.searchUsers(term).subscribe(users => {
        this.users = users
      });
    }
  }
}
