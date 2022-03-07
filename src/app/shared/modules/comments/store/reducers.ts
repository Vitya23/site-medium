import { CreateCommentsStateInterface } from './../types/createCommentsState.interface';
import {
  getCommentsAction,
  getCommentsSuccessAction,
  getCommentsFailureAction,
} from './actions/getComments.action';

import { createReducer, on } from '@ngrx/store';

import { routerNavigationAction } from '@ngrx/router-store';
import { CommentsStateInterface } from '../types/commentsState.interface';
import {
  createCommentsAction,
  createCommentsFailureAction,
  createCommentsSuccessAction,
} from './actions/createComments.action';
import {
  deleteCommentsAction,
  deleteCommentsFailureAction,
  deleteCommentsSuccessAction,
} from './actions/deleteComments.action';

const initialState: CommentsStateInterface = {
  isSubmitting: false,
  isLoading: false,
  error: null,
  data: null,
  validationErrors: null,
  comment: null,
};

export const commentsReducer = createReducer(
  initialState,
  on(
    getCommentsAction,
    (state): CommentsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getCommentsSuccessAction,
    (state, action): CommentsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.comments,
    })
  ),
  on(
    getCommentsFailureAction,
    (state): CommentsStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),

  on(
    createCommentsAction,
    (state): CommentsStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    createCommentsSuccessAction,
    (state): CommentsStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    createCommentsFailureAction,
    (state, action): CommentsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),

  on(
    deleteCommentsAction,
    (state): CommentsStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    deleteCommentsSuccessAction,
    (state): CommentsStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    deleteCommentsFailureAction,
    (state, action): CommentsStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),

  on(routerNavigationAction, (): CommentsStateInterface => initialState)
);
