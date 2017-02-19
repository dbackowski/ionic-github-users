import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyAppComponent } from './app.component';
import { SearchUsersPageComponent } from '../pages/search-users/search-users';
import { FavouriteUsersPageComponent } from '../pages/favourite-users/favourite-users';
import { UserDetailsPageComponent } from '../pages/user-details/user-details';
import { Users } from '../providers/users';
import { FavouriteUsers } from '../providers/favourite-users';
import { UserFollowersPageComponent } from '../pages/user-followers/user-followers';
import { UserFollowingPageComponent } from '../pages/user-following/user-following';
import { UserReposPageComponent } from '../pages/user-repos/user-repos';
import { UserOverviewPageComponent } from '../pages/user-overview/user-overview';
import { ScrollableTabs } from '../components/scrollable-tabs/scrollable-tabs';
import { FormatDate } from '../pipes/format-date';

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
    ScrollableTabs,
    FormatDate,
  ],
  imports: [
    IonicModule.forRoot(MyAppComponent)
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
  providers: [Users, FavouriteUsers, Storage]
})
export class AppModule {}
