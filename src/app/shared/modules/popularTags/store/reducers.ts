import {
  getPopularTagsAction,
  getPopularTagsSuccessAction,
  getPopularTagsFailureAction,
} from './actions/getPopularTags.action';

import { createReducer, on } from '@ngrx/store';

import { routerNavigationAction } from '@ngrx/router-store';
import { PopularTagsStateInterface } from '../types/popularTagsState.interface';

const initialState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

export const popularTagsReducer = createReducer(
  initialState,
  on(
    getPopularTagsAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: true,
    })
  ),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags,
    })
  ),
  on(
    getPopularTagsFailureAction,
    (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
    })
  )
);
