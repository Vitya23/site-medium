import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsFeedComponent } from './components/tagsFeed/tagsFeed.component';
import { RouterModule } from '@angular/router';
import { BannerModule } from '../shared/modules/banner/banner.module';
import { FeedModule } from '../shared/modules/feed/feed.module';
import { FeedTogglerModule } from '../shared/modules/feedToggler/feedToggler.module';
import { PopularTagsModule } from '../shared/modules/popularTags/popularTags.module';

const routes = [
  {
    path: 'tags/:slug',
    component: TagsFeedComponent,
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
  declarations: [TagsFeedComponent],
})
export class TagsFeedModule {}
