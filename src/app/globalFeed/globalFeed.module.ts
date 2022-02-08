import { BannerModule } from './../shared/modules/banner/banner.module';
import { FeedModule } from './../shared/modules/feed/feed.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFeedComponent } from './components/globalFeed/globalFeed.component';
import { PopularTagsModule } from '../shared/modules/popularTags/popularTags.module';
import { FeedTogglerModule } from '../shared/modules/feedToggler/feedToggler.module';

const routes = [
  {
    path: '',
    component: GlobalFeedComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule,
  ],
  declarations: [GlobalFeedComponent],
})
export class GlobalFeedModule {}
