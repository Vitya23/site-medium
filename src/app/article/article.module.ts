import { CommentsModule } from './../shared/modules/comments/comments.module';
import { deleteArticleEffect } from './store/effects/deleteArticle.effect';
import { ArticleService as SharedArticleService } from './../shared/services/article.service';
import { TagListModule } from './../shared/modules/tag-list/tag-list.module';
import { ArticleService } from './services/article.service';
import { LoadingModule } from './../shared/modules/loading/loading.module';
import { ErrorMessageModule } from './../shared/modules/errorMessage/errorMessage.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './components/article/article.component';
import { getArticleEffect } from './store/effects/getArticle.effect';
import { articleReducer } from './store/reducers';

const routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([getArticleEffect, deleteArticleEffect]),
    StoreModule.forFeature('article', articleReducer),
    ErrorMessageModule,
    TagListModule,
    LoadingModule,
    CommentsModule,
  ],
  providers: [SharedArticleService, ArticleService],
  declarations: [ArticleComponent],
})
export class ArticleModule {}
