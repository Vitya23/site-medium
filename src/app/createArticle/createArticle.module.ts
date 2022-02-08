import { createArticleReducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { CreateArticleEffect } from './store/effects/createArticle.effect';
import { EffectsModule } from '@ngrx/effects';
import { CreateArticleService } from './services/createArticle.service';
import { ArticleFormModule } from './../shared/modules/articleForm/articleForm.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateArticleComponent } from './components/createArticle/createArticle.component';

const routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', createArticleReducer),
  ],
  providers: [CreateArticleService],
  declarations: [CreateArticleComponent],
})
export class CreateArticleModule {}
