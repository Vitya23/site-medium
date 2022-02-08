import { ArticleInterface } from './../../../shared/types/article.interface';
import {
  getArticleAction,
  getArticleSuccessAction,
  getArticleFailureAction,
} from './../actions/getArticle.action';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { ArticleService as SharedArticlesService } from 'src/app/shared/services/article.service';

@Injectable()
export class getArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({ article });
          }),
          catchError(() => {
            return of(getArticleFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private articleService: SharedArticlesService
  ) {}
}
