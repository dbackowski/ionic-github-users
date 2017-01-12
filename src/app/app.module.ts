import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyAppComponent } from './app.component';
import { SearchUsersPage } from '../pages/search-users/search-users';
import { FavoriteUsersPage } from '../pages/favorite-users/favorite-users';
import { UserDetailsPage } from '../pages/user-details/user-details';
import { Users } from '../providers/users';
import { FavoriteUsers } from '../providers/favorite-users';

@NgModule({
  declarations: [
    MyAppComponent,
    SearchUsersPage,
    FavoriteUsersPage,
    UserDetailsPage  
  ],
  imports: [
    IonicModule.forRoot(MyAppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyAppComponent,
    SearchUsersPage,
    FavoriteUsersPage,
    UserDetailsPage  
  ],
  providers: [Users, FavoriteUsers, Storage]
})
export class AppModule {}
