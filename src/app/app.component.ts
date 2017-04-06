import { Component, ViewChild } from '@angular/core';
import { Events, Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';

import { SearchUsersPageComponent } from '../pages/search-users/search-users';
import { FavouriteUsersPageComponent } from '../pages/favourite-users/favourite-users';
import { FavouriteUsers } from '../providers/favourite-users';
import { Page } from '../models/page';

@Component({
  templateUrl: 'app.html'
})
export class MyAppComponent {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SearchUsersPageComponent;
  pages: Page[];
  
  private networkDisconnected: boolean = false;
  
  constructor(
    public platform: Platform,
    public menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    private favouriteUsers: FavouriteUsers,
    private events: Events,
    private alertCtrl: AlertController,
  ) {
    this.initializeApp();
    
    this.pages = [
      { title: 'Search Users', component: SearchUsersPageComponent, icon: 'search' },
      { title: 'Favourite Users', component: FavouriteUsersPageComponent, icon: 'bookmark' }
    ];

    this.events.subscribe('favourite-users:refresh', () => {
      this.favoriteUserCountRefresh();
    });

    this.network.onDisconnect().subscribe(() => {
      this.showNetworkAlert();
      this.networkDisconnected = true;
    });

    this.network.onConnect().subscribe(() => {
      this.networkDisconnected = false;
    });
  }

  favoriteUserCountRefresh() {
    this.favouriteUsers.count().subscribe(
      (count) => {
        this.pages[1].count = count;
      }
    );
  }

  showNetworkAlert() {
    let networkAlert = this.alertCtrl.create({
      title: 'No Internet Connection',
      message: 'Please check your internet connection.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (this.networkDisconnected) {
              this.showNetworkAlert();
            }
          }
        },
       ]
    });
    networkAlert.present();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.styleDefault();
      this.favoriteUserCountRefresh();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
