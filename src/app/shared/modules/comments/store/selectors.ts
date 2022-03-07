import { CreateCommentsStateInterface } from './../types/createCommentsState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommentsStateInterface } from '../types/commentsState.interface';

export const commentsFeatureSelector =
  createFeatureSelector<CommentsStateInterface>('comments');

export const isLoadingSelector = createSelector(
  commentsFeatureSelector,
  (GetCommentsState: CommentsStateInterface) => GetCommentsState.isLoading
);
export const errorSelector = createSelector(
  commentsFeatureSelector,
  (GetCommentsState: CommentsStateInterface) => GetCommentsState.error
);
export const commentsSelector = createSelector(
  commentsFeatureSelector,
  (GetCommentsState: CommentsStateInterface) => GetCommentsState.data
);

export const commentSelector = createSelector(
  commentsFeatureSelector,
  (GetCommentsState: CommentsStateInterface) => GetCommentsState.comment
);

export const isSubmittingSelector = createSelector(
  commentsFeatureSelector,
  (CreateCommentsState: CommentsStateInterface) =>
    CreateCommentsState.isSubmitting
);

export const validationErrorSelector = createSelector(
  commentsFeatureSelector,
  (createArticleState: CommentsStateInterface) =>
    createArticleState.validationErrors
);
