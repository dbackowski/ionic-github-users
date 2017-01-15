import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { SearchUsersPageComponent } from '../pages/search-users/search-users';
import { FavoriteUsersPageComponent } from '../pages/favorite-users/favorite-users';

@Component({
  templateUrl: 'app.html'
})
export class MyAppComponent {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = SearchUsersPageComponent;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Search Users', component: SearchUsersPageComponent, icon: 'search' },
      { title: 'Favorite Users', component: FavoriteUsersPageComponent, icon: 'bookmark' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}
