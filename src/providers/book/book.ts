

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BookProvider {

  url: string;
  headers: HttpHeaders
  constructor(public http: HttpClient) {
    this.url = 'https://safe-harbor-12670.herokuapp.com/books'
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
  }


  getShelfBooks(beaconID: string) {
    return this.http.get<any>(`${this.url}/${beaconID}`, {headers: this.headers});
  }



}
