import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the BeaconProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BeaconProvider {

  url: string;
  headers: HttpHeaders
  constructor(public http: HttpClient) {
    this.url = 'https://safe-harbor-12670.herokuapp.com/beacons'
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
  }


  getShelfInfo(beaconId: string) {
    return this.http.get<any>(`${this.url}/${beaconId}`, {headers: this.headers});
  }

}
