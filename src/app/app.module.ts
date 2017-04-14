import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { HttpModule } from '@angular/http';

import { MyAppComponent } from './app.component';
import { SearchUsersPageComponent } from '../pages/search-users/search-users';
import { FavouriteUsersPageComponent } from '../pages/favourite-users/favourite-users';
import { UserDetailsPageComponent } from '../pages/user-details/user-details';
import { UsersProvider } from '../providers/users';
import { FavouriteUsersProvider } from '../providers/favourite-users';
import { UserFollowersPageComponent } from '../pages/user-followers/user-followers';
import { UserFollowingPageComponent } from '../pages/user-following/user-following';
import { UserReposPageComponent } from '../pages/user-repos/user-repos';
import { UserOverviewPageComponent } from '../pages/user-overview/user-overview';
import { FormatDate } from '../pipes/format-date';
import { LoadingProvider } from '../providers/loading';
import { ToastProvider } from '../providers/toast';

@NgModule({
  declarations: [
    MyAppComponent,
    SearchUsersPageComponent,
    FavouriteUsersPageComponent,
    UserDetailsPageComponent,
    UserFollowersPageComponent,
    UserFollowingPageComponent,
    UserReposPageComponent,
    UserOverviewPageComponent,
    FormatDate,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyAppComponent),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyAppComponent,
    SearchUsersPageComponent,
    FavouriteUsersPageComponent,
    UserDetailsPageComponent,
    UserFollowersPageComponent,
    UserFollowingPageComponent,
    UserReposPageComponent,
    UserOverviewPageComponent,
  ],
  providers: [
    UsersProvider, 
    FavouriteUsersProvider, 
    SplashScreen, 
    StatusBar, 
    Network, 
    LoadingProvider, 
    ToastProvider
  ]
})
export class AppModule {}
