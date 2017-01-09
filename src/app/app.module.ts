import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { SearchUsersPage } from '../pages/search-users/search-users';
import { FavoriteUsersPage } from '../pages/favorite-users/favorite-users';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { Users } from '../providers/users';
import { FavoriteUsers } from "../providers/favorite-users";

@NgModule({
  declarations: [
    MyApp,
    SearchUsersPage,
    FavoriteUsersPage,
    UserDetailsPage  
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchUsersPage,
    FavoriteUsersPage,
    UserDetailsPage  
  ],
  providers: [Users, FavoriteUsers, Storage]
})
export class AppModule {}
