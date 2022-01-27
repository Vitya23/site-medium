import { PopularTagsStateInterface } from './../types/popularTagsState.interface';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const popularTagsFeatureSelector =
  createFeatureSelector<PopularTagsStateInterface>('popularTags');

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.isLoading
);
export const errorSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
);
export const popularTagsSelector = createSelector(
  popularTagsFeatureSelector,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
);
