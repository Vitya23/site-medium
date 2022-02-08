import { LoadingModule } from './../shared/modules/loading/loading.module';
import { editArticleReducer } from './store/reducers';
import { StoreModule } from '@ngrx/store';
import { UpdateArticleEffect } from './store/effects/updateArticle.effect';
import { GetArticleEffect } from './store/effects/getArticle.effect';
import { EffectsModule } from '@ngrx/effects';
import { ArticleFormModule } from './../shared/modules/articleForm/articleForm.module';
import { ArticleService as SharedArticleService } from './../shared/services/article.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/editArticle/editArticle.component';
import { EditArticleService } from './services/editArticle.service';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    LoadingModule,
    EffectsModule.forFeature([GetArticleEffect, UpdateArticleEffect]),
    StoreModule.forFeature('editArticle', editArticleReducer),
  ],
  declarations: [EditArticleComponent],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
