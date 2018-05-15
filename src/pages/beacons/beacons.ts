import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the BeaconsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beacons',
  templateUrl: 'beacons.html',
})
export class BeaconsPage {
  id;
  constructor(private platform: Platform, private ble: BLE, private userProvider: UserProvider, private navCtrl: NavController) {}

  ionViewWillEnter() {
   // this.id = JSON.parse(localStorage.getItem("user"))._id || null;
        this.platform.ready().then(() => {
          console.log("platform is ready")

          this.ble.startScanWithOptions([], {reportDuplicates: false}).subscribe((devices) => {
            if(devices.name == "estimote") {
              console.log('search scan')
              console.log(JSON.stringify(devices));
            }

          });


        });
      }




}
