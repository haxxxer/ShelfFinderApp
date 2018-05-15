import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { BLE } from '@ionic-native/ble';
import { UserProvider } from '../../providers/user/user';
import { ShelfbooksPage } from '../shelfbooks/shelfbooks';
import { BeaconProvider } from '../../providers/beacon/beacon';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  id: string;
  device;
  sportShelf = null;
  historyShelf = null;
  shelfs: any[] = [];
  shelfSubject = new Subject();
  counter = 0;
  index = 0;
  buttonProps = [{color: "primary", icon:"search", text: "Start Scanning"}, {color: "danger", icon:"search", text: "Stop Scan"}]
  constructor(
    private platform: Platform,
    private ble: BLE,
    private userProvider: UserProvider,
    private beaconProvider: BeaconProvider,
    private navCtrl: NavController) {}

  ionViewWillEnter() {
    this.shelfSubject.subscribe((shelf: {uuid; string}) => {
      if(this.shouldAddBeaconToShelf(shelf.uuid)) this.shelfs.push(shelf);
    })
    this.id = JSON.parse(localStorage.getItem("user"))._id;
    console.log("id", this.id);
  }


  scanBeacons() {
    this.counter++;
    this.index = this.counter%2
    this.shelfs = [];
    this.userProvider.getUsersFavoriteTopics(this.id).subscribe(
      (res) => {
        const favoriteTopics:any[] = res;
        console.log('topics', JSON.stringify(favoriteTopics));
        this.platform.ready().then(() => {
          console.log("platform is ready")

          this.ble.startScanWithOptions([], {reportDuplicates: false}).subscribe((peripheral) => {
            favoriteTopics.map((topic) => {
              if(topic == peripheral.id) {

                this.beaconProvider.getShelfInfo(peripheral.id).subscribe(
                  beacon => {
                  this.shelfSubject.next(beacon);
                  }, err => {
                    console.log('err', JSON.stringify(err))
                  }
                )
              }
            });


          });
        });
      }
    )
  }



  stopScanning() {
    this.counter++;
    this.index = this.counter%2;
    this.ble.stopScan();
  }
  private shouldAddBeaconToShelf(beaconId) {
   return  this.shelfs.map((shelf)=> {
      return shelf.uuid;
    }).indexOf(beaconId) == -1;

  }

  viewShelfBooks(id) {
    this.navCtrl.push(ShelfbooksPage, {id})
  }



}
