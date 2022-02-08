import { BackendErrorMessagesModule } from './../shared/modules/backendErrorMessages/backendErrorMessages.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './components/settings/settings.component';
import { settingsReducer } from './store/reducers';

const routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', settingsReducer),
    BackendErrorMessagesModule,
  ],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
