import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction,
} from './actions/editArticle.action';
import { EditArticleStateInterface } from './../types/editArticleState.interface';

import { createReducer, on } from '@ngrx/store';
import {
  getArticleAction,
  getArticleSuccessAction,
} from './actions/getArticle.action';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: EditArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null,
};

export const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  ),
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article,
    })
  ),
  on(
    getArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
    })
  ),
  on(routerNavigationAction, (): EditArticleStateInterface => initialState)
);
