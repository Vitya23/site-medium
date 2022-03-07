import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
export const deleteCommentsAction = createAction(
  ActionTypes.DELETE_COMMENTS,
  props<{ slug: string; id: number }>()
);
export const deleteCommentsSuccessAction = createAction(
  ActionTypes.DELETE_COMMENTS_SUCCESS,
  props<{ slug: string }>()
);
export const deleteCommentsFailureAction = createAction(
  ActionTypes.DELETE_COMMENTS_FAILURE
);
