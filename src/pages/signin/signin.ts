import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';


@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  singupPage: any = SignupPage
  constructor(
    public navCtrl: NavController,
    private authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
    public alertCtrl: AlertController
  ) {}

  onSigninUser(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    const load = this.loadingCtrl.create({
      content: 'Signin you in...',
      dismissOnPageChange: true
    });
    load.present();
    this.authProvider.signinUser(email, password).subscribe(res => {

      if (!res.success) {
        load.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error!',
          subTitle: res.msg,
          buttons: ['OK']
        });
        return alert.present();

      }
      this.authProvider.storeUserDate(res.token, res.user);
      this.navCtrl.setRoot(TabsPage);
    }, err => {
      console.log(err)
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
