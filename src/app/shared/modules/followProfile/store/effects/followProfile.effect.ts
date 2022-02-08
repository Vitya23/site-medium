import { ProfileInterface } from './../../../../types/profile.interface';
import { FollowProfileService } from './../../services/followProfile.service';
import {
  followProfileAction,
  followProfileSuccessAction,
  followProfileFailureAction,
} from './../actions/followProfile.action';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import { of } from 'rxjs';

@Injectable()
export class FollowProfileEffect {
  followProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(followProfileAction),
      switchMap(({ isFollowing, username }) => {
        console.log(isFollowing);
        const profile$ = isFollowing
          ? this.followProfileService.followProfile(username)
          : this.followProfileService.unFollowProfile(username);

        return profile$.pipe(
          map((profile: ProfileInterface) => {
            return followProfileSuccessAction({ profile });
          }),
          catchError(() => {
            return of(followProfileFailureAction());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private followProfileService: FollowProfileService
  ) {}
}
