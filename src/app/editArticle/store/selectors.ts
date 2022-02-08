import { EditArticleStateInterface } from './../types/editArticleState.interface';

import { createFeatureSelector, createSelector } from '@ngrx/store';

export const editArticleFeatureSelector =
  createFeatureSelector<EditArticleStateInterface>('editArticle');

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting
);

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
);

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article
);

export const validationErrorSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.validationErrors
);
