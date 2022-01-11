import { LoadingModule } from './../loading/loading.module';
import { ErrorMessageModule } from './../errorMessage/errorMessage.module';
import { RouterModule } from '@angular/router';
import { FeedService } from './services/feed.service';
import { StoreModule } from '@ngrx/store';
import { getFeedEffect } from './store/effects/getFeed.effect';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { feedReducer } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([getFeedEffect]),
    StoreModule.forFeature('feed', feedReducer),
    RouterModule,
    ErrorMessageModule,
    LoadingModule,
  ],
  declarations: [FeedComponent],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
