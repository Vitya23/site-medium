import { getCurrentUserEffect } from './store/effects/getCurrentUser.effect';
import { LoginComponent } from './components/login/login.component';
import { loginEffect } from './store/effects/login.effect';
import { PersistanceService } from './../shared/services/persistance.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/reducers';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { RegisterEffect } from './store/effects/register.effect';
import { BackendErrorMessagesModule } from '../shared/modules/backendErrorMessages/backendErrorMessages.module';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    BackendErrorMessagesModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([
      RegisterEffect,
      loginEffect,
      getCurrentUserEffect,
    ]),
  ],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
