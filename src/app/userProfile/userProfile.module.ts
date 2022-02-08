import { FollowProfileModule } from './../shared/modules/followProfile/followProfile.module';
import { StoreModule } from '@ngrx/store';
import { GetUserProfileEffect } from './store/effects/getUserProfile.effect';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/userProfile/userProfile.component';
import { UserProfileService } from './services/userProfile.service';
import { userProfileReducer } from './store/reducers';
import { FeedModule } from '../shared/modules/feed/feed.module';

const routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent,
  },
  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', userProfileReducer),
    FeedModule,
    FollowProfileModule,
  ],
  declarations: [UserProfileComponent],
  providers: [UserProfileService],
})
export class UserProfileModule {}
