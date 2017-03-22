import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Repo } from '../../models/repo';
import { Users } from '../../providers/users';

@Component({
  selector: 'sg-page-user-repos',
  templateUrl: 'user-repos.html'
})
export class UserReposPageComponent {
  public repos: Repo[];
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
    this.loadRepos();
  }

  public loadRepos() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present().then(() => {
      this.users.repos(this.login).finally(
        () => {
          loading.dismiss();
        }
      ).subscribe(
        (repos) => {
          this.repos = repos;
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
    this.users.repos(this.login, this.page + 1).finally(
      () => {
        infiniteScroll.complete();
      }
    ).subscribe(
      (repos) => {
        repos.forEach((repo) => {
          this.repos.push(repo);
        })
        
        this.page += 1;
      }
    )
  }
}
