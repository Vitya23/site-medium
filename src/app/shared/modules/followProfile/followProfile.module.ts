import { FollowProfileEffect } from './store/effects/followProfile.effect';
import { FollowProfileService } from './services/followProfile.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowProfileComponent } from './components/followProfile/followProfile.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([FollowProfileEffect])],
  declarations: [FollowProfileComponent],
  exports: [FollowProfileComponent],
  providers: [FollowProfileService],
})
export class FollowProfileModule {}
