import { GetCommentsResponseInterface } from './../../types/getCommentsResponse.interface';
import { CommentsInterface } from './../../../../types/comments.interface';
import { CommentsService } from './../../services/comments.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { of } from 'rxjs';
import {
  createCommentsAction,
  createCommentsFailureAction,
  createCommentsSuccessAction,
} from '../actions/createComments.action';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { getCommentsAction } from '../actions/getComments.action';

@Injectable()
export class createCommentsEffect {
  createComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCommentsAction),
      switchMap(({ slug, body }) => {
        console.log(body);
        return this.commentsService.createComments(slug, body).pipe(
          map((comments: any) => {
            return createCommentsSuccessAction({ comments, slug });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createCommentsFailureAction({
                errors: errorResponse.error.errors,
              })
            );
          })
        );
      })
    )
  );

  newData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(createCommentsSuccessAction),
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
