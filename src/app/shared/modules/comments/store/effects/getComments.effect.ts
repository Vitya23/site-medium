import { CommentsService } from './../../services/comments.service';
import {
  getCommentsAction,
  getCommentsSuccessAction,
  getCommentsFailureAction,
} from './../actions/getComments.action';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';
import { GetCommentsResponseInterface } from '../../types/getCommentsResponse.interface';

@Injectable()
export class getCommentsEffect {
  getComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCommentsAction),
      switchMap(({ slug }) => {
        return this.commentsService.getComments(slug).pipe(
          map((comments: GetCommentsResponseInterface) => {
            return getCommentsSuccessAction({ comments });
          }),
          catchError(() => {
            return of(getCommentsFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private commentsService: CommentsService
  ) {}
}
