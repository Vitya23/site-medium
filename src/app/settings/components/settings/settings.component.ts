import { CurrentUserInputInterface } from './../../../shared/types/currentUserInput.interface';
import { updateCurrentUserAction } from './../../../auth/store/actions/updateCurrentUser.action';
import { filter } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { CurrentUserInterface } from './../../../shared/types/currentUser.interface';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from '../../store/selectors';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  currentUser: CurrentUserInterface;
  currentUserSub: Subscription;

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  form: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
  }

  initializeValues() {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector)); // ВСЁ ИСПРАВИТЬ НА BACKEND ERRORS!
  }

  initializeListeners() {
    this.currentUserSub = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }
  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      username: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }
  logout(): void {
    this.store.dispatch(logoutAction());
  }
}
