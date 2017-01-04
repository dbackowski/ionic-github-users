import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController, 
    private Users: Users, 
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('Hello UsersPage Page');
  }

  goToDetails(login: string) {
    this.navCtrl.push(UserDetailsPage, {login});
  }

  search(searchEvent) {
    let term = searchEvent.target.value

    if (term.trim().length >= 2) {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loading.present();

      this.Users.searchUsers(term).subscribe(
        users => {
          this.users = users
          loading.dismiss();
        },
        error => {
          this.toastCtrl.create({
            message: 'API response error.',
            duration: 3000,
            position: 'bottom'
          }).present();

          loading.dismiss();
        }
      );
    }
  }
}
