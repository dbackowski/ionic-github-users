import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyAppComponent } from './app.component';
import { SearchUsersPageComponent } from '../pages/search-users/search-users';
import { FavoriteUsersPageComponent } from '../pages/favorite-users/favorite-users';
import { UserDetailsPageComponent } from '../pages/user-details/user-details';
import { Users } from '../providers/users';
import { FavoriteUsers } from '../providers/favorite-users';

@NgModule({
  declarations: [
    MyAppComponent,
    SearchUsersPageComponent,
    FavoriteUsersPageComponent,
    UserDetailsPageComponent  
  ],
  imports: [
    IonicModule.forRoot(MyAppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyAppComponent,
    SearchUsersPageComponent,
    FavoriteUsersPageComponent,
    UserDetailsPageComponent  
  ],
  providers: [Users, FavoriteUsers, Storage]
})
export class AppModule {}
