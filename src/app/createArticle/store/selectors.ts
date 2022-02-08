import { CreateArticleStateInterface } from './../types/createArticleState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const createArticleFeatureSelector =
  createFeatureSelector<CreateArticleStateInterface>('createArticle');

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.isSubmitting
);
export const validationErrorSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors
);
