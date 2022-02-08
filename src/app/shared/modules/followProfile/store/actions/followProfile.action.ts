import { ProfileInterface } from './../../../../types/profile.interface';
import { ArticleInterface } from '../../../../types/article.interface';
import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const followProfileAction = createAction(
  ActionTypes.FOLLOW_PROFILE,
  props<{ isFollowing: boolean; username: string }>()
);

export const followProfileSuccessAction = createAction(
  ActionTypes.FOLLOW_PROFILE_SUCCESS,
  props<{ profile: ProfileInterface }>()
);

export const followProfileFailureAction = createAction(
  ActionTypes.FOLLOW_PROFILE_FAILURE
);
