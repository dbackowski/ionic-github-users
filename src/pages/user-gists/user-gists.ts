import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Gist } from '../../models/gist';
import { Users } from '../../providers/users';

@Component({
  selector: 'sg-page-user-gists',
  templateUrl: 'user-gists.html'
})
export class UserGistsPageComponent {
  public gists: Gist[];
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
    this.loadGists();
  }

  public loadGists() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      this.users.gists(this.login).finally(
        () => {
          loading.dismiss();
        }
      ).subscribe(
        (gists) => {
          this.gists = gists;
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
