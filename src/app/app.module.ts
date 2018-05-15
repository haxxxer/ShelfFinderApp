import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { SettingsPage } from '../pages/settings/settings';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Observable } from 'rxjs/Observable';
import { BLE } from '@ionic-native/ble';
import { TabsPage } from '../pages/tabs/tabs';

import {
  IMqttMessage,
  MqttModule,
  MqttService,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { AuthProvider } from '../providers/auth/auth';
import { UserProvider } from '../providers/user/user';
import { BookProvider } from '../providers/book/book';
import { SigninPage } from '../pages/signin/signin';
import { HttpClientModule } from '@angular/common/http';
import { SignupPage } from '../pages/signup/signup';
import { ShelfbooksPage } from '../pages/shelfbooks/shelfbooks';
import { BeaconsPage } from '../pages/beacons/beacons';
import { BeaconProvider } from '../providers/beacon/beacon';
import { SecondQuestionPage } from '../pages/second-question/second-question';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'broker.mqttdashboard.com',
  port: 8000,
  path: '/mqtt'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    ProfilePage,
    SettingsPage,
    SigninPage,
    SignupPage,
    ShelfbooksPage,
    BeaconsPage,
    SecondQuestionPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    }),
    IonicModule.forRoot(MyApp),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    ProfilePage,
    SettingsPage,
    SigninPage,
    SignupPage,
    ShelfbooksPage,
    BeaconsPage,
    SecondQuestionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BLE,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    UserProvider,
    BookProvider,
    BeaconProvider
  ]
})
export class AppModule {}
