import { Component, ViewChild } from '@angular/core';
import { Events, Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

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

  constructor(
    public platform: Platform,
    public menu: MenuController,
    private favouriteUsers: FavouriteUsers,
    private events: Events,
  ) {
    this.initializeApp();
    
    this.pages = [
      { title: 'Search Users', component: SearchUsersPageComponent, icon: 'search' },
      { title: 'Favourite Users', component: FavouriteUsersPageComponent, icon: 'bookmark' }
    ];

    this.events.subscribe('favourite-users:refresh', () => {
      this.favoriteUserCountRefresh();
    });
  }

  favoriteUserCountRefresh() {
    this.favouriteUsers.count().subscribe(
      (count) => {
        this.pages[1].count = count;
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      Splashscreen.hide();
      StatusBar.styleDefault();
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
