import { Component } from '@angular/core';
import { ActionSheetController } from 'ionic-angular';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  id;
  method: string = 'topic';
  private subscription: Subscription;
  public message: string;
  constructor(public actionSheetCtrl: ActionSheetController, private _mqttService: MqttService) {
    this.id = JSON.parse(localStorage.getItem('user'))._id;
    console.log(this.id);
  }

  presentActionSheet1() {
    const component = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Topics you might be interested in: ',
      buttons: [
        {
          text: 'Sports',
          handler: () => {
            console.log('sports baba')
            component.publishTopic('topic', 'Sports');
          }
        },{
          text: 'History',
          handler: () => {
            component.publishTopic('topic', 'History');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  presentActionSheet2() {
    const component = this;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Library of Congress list:',
      buttons: [
        {
          text: 'ND1385-1388',
          handler: () => {

            component.publishTopic('loc', 'ND1385-1388');
          }
        },{
          text: 'D1-2027',
          handler: () => {
            component.publishTopic('loc', 'D1-2027');
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  publishTopic(method: string, value: string ) {

    this.subscription = this._mqttService.publish(`/users/${this.id}/favorite/${method}`, value ).subscribe((event)=> {
      // console.log('event', event);
      // console.log("published user's topic");
    })
  }


  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
