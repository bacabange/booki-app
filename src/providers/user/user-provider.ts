import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class UserProvider {
  _user: any;

  constructor(
    public api: Api,
    public storage: Storage
  ) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('login', accountInfo).share();

    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our facebook information
   */
  loginSocial(accountInfo: any) {
    let seq = this.api.post('login/facebook', accountInfo).share();

    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('register', accountInfo).share();

    seq.subscribe((res: any) => {
      this._loggedIn(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    return this.storage.clear().then(() => {
      console.log('User logout, Bye');
    });
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.data;
    this.storage.set('token', resp.meta.token).then(() => {
      console.log('User Loged');
    });
    localStorage.setItem('token', resp.meta.token);
  }
}
