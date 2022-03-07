import { deleteCommentsEffect } from './store/effects/deleteComments.effect';
import { CommentComponent } from './components/comment/comment.component';
import { createCommentsEffect } from './store/effects/createComments.effect';
import { getCommentsEffect } from './store/effects/getComments.effect';
import { commentsReducer } from './store/reducers';
import { CommentsService } from './services/comments.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import { feedReducer } from '../feed/store/reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('comments', commentsReducer),
    EffectsModule.forFeature([
      getCommentsEffect,
      createCommentsEffect,
      deleteCommentsEffect,
    ]),
    ReactiveFormsModule,
  ],
  declarations: [CommentsComponent, CommentComponent],
  providers: [CommentsService],
  exports: [CommentsComponent],
})
export class CommentsModule {}
