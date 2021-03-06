import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { UserProvider } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private formSignin: FormGroup

  account: { email: string, password: string };

  // Our translated text strings
  private loginErrorString: string;
  private loginLoading: string;

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.translateService.get('LOADING').subscribe((value) => {
      this.loginLoading = value;
    });

    this.formSignin = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    let loader = this.loadingCtrl.create({
      content: this.loginLoading,
      spinner: 'dots'
    });
    loader.present();

    this.account = this.formSignin.value;
    this.userProvider.login(this.account).subscribe((resp) => {
      loader.dismiss();
      this.navCtrl.setRoot(MainPage);
    }, (err) => {
      loader.dismiss();

      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
