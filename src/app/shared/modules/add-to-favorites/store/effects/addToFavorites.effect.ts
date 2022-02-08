import { addToFavoritesFailureAction } from './../actions/addToFavorites.action';
import { ArticleInterface } from './../../../../types/article.interface';
import {
  addToFavoritesAction,
  addToFavoritesSuccessAction,
} from '../actions/addToFavorites.action';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { AddToFavoritesService } from '../../services/addToFavorites.service';

@Injectable()
export class AddToFavoritesEffect {
  addToFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToFavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoriteService.removeFromFavorites(slug)
          : this.addToFavoriteService.addToFavorites(slug);

        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesSuccessAction({ article });
          }),
          catchError(() => {
            return of(addToFavoritesFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private addToFavoriteService: AddToFavoritesService
  ) {}
}
