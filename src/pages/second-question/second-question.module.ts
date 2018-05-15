import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecondQuestionPage } from './second-question';

@NgModule({
  declarations: [
    SecondQuestionPage,
  ],
  imports: [
    IonicPageModule.forChild(SecondQuestionPage),
  ],
})
export class SecondQuestionPageModule {}
