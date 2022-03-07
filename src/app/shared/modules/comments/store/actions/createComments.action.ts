import { createAction, props } from '@ngrx/store';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { ActionTypes } from '../actionTypes';
import { CommentsInterface } from './../../../../types/comments.interface';
export const createCommentsAction = createAction(
  ActionTypes.CREATE_COMMENTS,
  props<{ slug: string; body: string }>()
);
export const createCommentsSuccessAction = createAction(
  ActionTypes.CREATE_COMMENTS_SUCCESS,
  props<{ comments: any; slug: string }>()
);
export const createCommentsFailureAction = createAction(
  ActionTypes.CREATE_COMMENTS_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
