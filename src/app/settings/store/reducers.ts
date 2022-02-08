import { SettingsStateInterface } from './../types/settingsState.interface';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from './../../auth/store/actions/updateCurrentUser.action';
import { createReducer, on } from '@ngrx/store';
const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

export const settingsReducer = createReducer(
  initialState,
  on(
    updateCurrentUserAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: true,
    })
  ),
  on(
    updateCurrentUserSuccessAction,
    (state): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
    })
  ),
  on(
    updateCurrentUserFailureAction,
    (state, action): SettingsStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    })
  )
);
