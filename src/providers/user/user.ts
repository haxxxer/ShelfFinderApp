  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';

  /*
    Generated class for the UserProvider provider.

    See https://angular.io/guide/dependency-injection for more info on providers
    and Angular DI.
  */
  @Injectable()
  export class UserProvider {

    url: string;
    headers: HttpHeaders
    constructor(public http: HttpClient) {
      this.url = 'https://safe-harbor-12670.herokuapp.com/users'
      this.headers = new HttpHeaders();
      this.headers.set('Content-Type', 'application/json');
    }


    updateUserInfo(id, upd) {
      return this.http.patch<any>(`${this.url}/${id}`, upd, {headers: this.headers});

    }
    getUsersFavoriteTopics(id: string) {
      return this.http.get<any>(`${this.url}/${id}/findTopics`, {headers: this.headers});
    }



  }
