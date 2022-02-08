import { AddToFavoritesEffect } from './store/effects/addToFavorites.effect';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddToFavoritesComponent } from './components/add-to-favorites/add-to-favorites.component';
import { AddToFavoritesService } from './services/addToFavorites.service';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([AddToFavoritesEffect])],
  declarations: [AddToFavoritesComponent],
  providers: [AddToFavoritesService],
  exports: [AddToFavoritesComponent],
})
export class AddToFavoritesModule {}
