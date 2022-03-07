import { createAction, props } from '@ngrx/store';
import { GetCommentsResponseInterface } from '../../types/getCommentsResponse.interface';
import { ActionTypes } from '../actionTypes';

export const getCommentsAction = createAction(
  ActionTypes.GET_COMMENTS,
  props<{ slug: string }>()
);
export const getCommentsSuccessAction = createAction(
  ActionTypes.GET_COMMENTS_SUCCESS,
  props<{ comments: GetCommentsResponseInterface }>()
);
export const getCommentsFailureAction = createAction(
  ActionTypes.GET_COMMENTS_FAILURE
);
