import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { SigninPage } from '../signin/signin';
import { UserProvider } from '../../providers/user/user';
import { BeaconsPage } from '../beacons/beacons';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  beaconsPage= BeaconsPage;
  user;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    private authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
   this.user = JSON.parse(localStorage.getItem('user'));
   console.log('user', this.user)
  }

  updateMyInfo(key: string) {
    let obj = {};
    let value: string
    let alert = this.alertCtrl.create({
      title: 'Change ' + key,
      buttons: [
        'Cancel'
      ]
    });
    alert.addInput({
      name: key,
      value: this.user[key],
      placeholder: key
    });
    alert.addButton({
      text: 'Ok',
      handler: (data: any) => {
       if (data[key] == '') return;
        this.userProvider.updateUserInfo(this.user._id, data).subscribe((res) => {
          if(res.success) {
            this.user = res.user;
            localStorage.setItem('user', JSON.stringify(res.user));
          }
        })
      }
    });

    alert.present();
  }

  logout() {
    this.authProvider.logoutUser();
    this.navCtrl.setRoot(SigninPage);
  }

}
