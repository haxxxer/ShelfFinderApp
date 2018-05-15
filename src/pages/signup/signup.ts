import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { SigninPage } from '../signin/signin';
import { NgForm } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  onSignupUser(form: NgForm) {
    const name  = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const load = this.loadingCtrl.create({
      content: 'Signin you up...',
      dismissOnPageChange: true
    });
    load.present();
    this.authProvider.signupUser(name, email, password).subscribe(res => {

      if (!res.success) {
        load.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: res.msg,
          buttons: ['OK']
        });
        return alert.present();

      }
      this.navCtrl.setRoot(SigninPage);
    }, err => {
      load.dismiss();
      let alert = this.alertCtrl.create({
        title: 'Error!',
        subTitle: err.error.msg,
        buttons: ['OK']
      });
      alert.present();
    });

  }

}
