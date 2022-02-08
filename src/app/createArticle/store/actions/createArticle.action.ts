import { BackendErrorsInterface } from './../../../shared/types/backendErrors.interface';
import { ArticleInterface } from './../../../shared/types/article.interface';
import { ArticleInputInterface } from 'src/app/shared/types/articleInput.interface';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const createArticleAction = createAction(
  ActionTypes.CREATE_ARTICLE,
  props<{ articleInput: ArticleInputInterface }>()
);

export const createArticleSuccessAction = createAction(
  ActionTypes.CREATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const createArticleFailureAction = createAction(
  ActionTypes.CREATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
