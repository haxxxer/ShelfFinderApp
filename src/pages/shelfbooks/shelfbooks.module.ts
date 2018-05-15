import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShelfbooksPage } from './shelfbooks';

@NgModule({
  declarations: [
    ShelfbooksPage,
  ],
  imports: [
    IonicPageModule.forChild(ShelfbooksPage),
  ],
})
export class ShelfbooksPageModule {}
