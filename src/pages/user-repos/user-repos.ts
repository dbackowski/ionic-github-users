import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Repo } from '../../models/repo';
import { UsersProvider } from '../../providers/users';
import { LoadingProvider } from '../../providers/loading';
import { ToastProvider } from '../../providers/toast';

@Component({
  selector: 'page-user-repos',
  templateUrl: 'user-repos.html'
})
export class UserReposPageComponent {
  public repos: Repo[];
  private login: string;
  private page: number = 1;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private usersProvider: UsersProvider,
    private loadingProvider: LoadingProvider,
    private toastProvider: ToastProvider,
  ) {
    this.login = navParams.data;
  }

  ionViewDidLoad() {
    this.loadRepos();
  }

  public loadRepos() {
    this.loadingProvider.show();

    this.usersProvider.repos(this.login).finally(
      () => {
        this.loadingProvider.hide();
      }
    ).subscribe(
      (repos) => {
        this.repos = repos;
      },
      (error) => {
        this.toastProvider.error('API response error.');
      }
    );
  }

  public loadMore(infiniteScroll) {
    this.usersProvider.repos(this.login, this.page + 1).finally(
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
