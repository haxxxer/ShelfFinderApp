import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  user;
  token: string;
  url: string;
  headers: HttpHeaders
  constructor(private http: HttpClient) {
    this.url = 'https://safe-harbor-12670.herokuapp.com'
    this.headers = new HttpHeaders();
    this.headers.set('Content-Type', 'application/json');
  }

  signinUser(email: string , password: string) {
    return this.http.post<any>(`${this.url}/login`, {email, password}, {headers: this.headers, });
  }

  signupUser(name: string, email: string , password: string) {
    return this.http.post<any>(`${this.url}/register`, {name, email, password}, {headers: this.headers, });
  }

  storeUserDate(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }



  loadTokenAndUser() {
    this.token = localStorage.getItem('token') || null;
    this.user = JSON.parse(localStorage.getItem('user')) || null;
    return [this.user, this.token];
  }

  logoutUser = () => {
    this.token = null;
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  isAuthenticated() {
    return this.token != null;
  }

}
