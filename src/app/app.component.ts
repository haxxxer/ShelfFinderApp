import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { AuthProvider } from '../providers/auth/auth';
import { SecondQuestionPage } from '../pages/second-question/second-question';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SecondQuestionPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private authProvider: AuthProvider) {
    // const user = this.authProvider.loadTokenAndUser()[0];
    // if(!user) this.rootPage = SigninPage ;
    // else this.rootPage = TabsPage;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
