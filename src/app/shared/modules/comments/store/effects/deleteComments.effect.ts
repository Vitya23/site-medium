import { CommentsService } from './../../services/comments.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';

import {
  deleteCommentsAction,
  deleteCommentsFailureAction,
  deleteCommentsSuccessAction,
} from '../actions/deleteComments.action';
import { Store } from '@ngrx/store';
import { getCommentsAction } from '../actions/getComments.action';

@Injectable()
export class deleteCommentsEffect {
  deleteComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCommentsAction),
      switchMap(({ slug, id }) => {
        return this.commentsService.deleteComments(slug, id).pipe(
          map(() => {
            return deleteCommentsSuccessAction({ slug: slug });
          }),
          catchError(() => {
            return of(deleteCommentsFailureAction());
          })
        );
      })
    )
  );

  newData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteCommentsSuccessAction),
        tap(({ slug }) => {
          this.store.dispatch(getCommentsAction({ slug: slug }));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService,
    private store: Store
  ) {}
}
