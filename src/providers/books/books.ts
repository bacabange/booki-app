import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

@Injectable()
export class BooksProvider {

  constructor(public api: Api,) {}

  /**
   * Send GET request to get book list of user
   */
  getUserBookList(page) {
    let request = this.api.get('user/books', {
      page: page
    }).share();

    request.subscribe((res) => {
    }, err => {
      console.error('ERROR', err);
    });

    return request;
  }

  storeBook(book: any) {
    let seq = this.api.post('books', book).share();

    seq.subscribe((res: any) => {
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
