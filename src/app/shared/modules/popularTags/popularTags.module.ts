import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { popularTagsReducer } from './store/reducers';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularTagsComponent } from './components/popularTags/popularTags.component';
import { PopularTagsService } from './services/popularTags.service';
import { getPopularTagsEffect } from './store/effects/getPopularTags.effect';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../loading/loading.module';
import { ErrorMessageModule } from '../errorMessage/errorMessage.module';

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature('popularTags', popularTagsReducer),
    EffectsModule.forFeature([getPopularTagsEffect]),
    RouterModule,
    LoadingModule,
    ErrorMessageModule,
  ],
  declarations: [PopularTagsComponent],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
