import { Router } from '@angular/router';
import { PersistanceService } from './../../../shared/services/persistance.service';
import { tap } from 'rxjs/operators';
import { logoutAction } from './../actions/sync.action';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

@Injectable()
export class LogoutEffect {
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutAction),
        tap(() => {
          this.persistanceService.set('accessToken', '');
          this.router.navigateByUrl('/');
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private persistanceService: PersistanceService,
    private router: Router
  ) {}
}
