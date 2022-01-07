import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headerComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [headerComponent],
  exports: [headerComponent],
})
export class TopBarModule {}
