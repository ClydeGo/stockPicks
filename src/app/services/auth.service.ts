import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User;

  constructor(public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    // console.log('here');
    // const token = localStorage.getItem('token');
    // console.log(token, 'hey im a token');
    // // Check whether the token is expired and return
    // // true or false
    // return !this.jwtHelper.isTokenExpired(token);

    return this.user != undefined;
  }

  public setUser(user: User) {
    this.user = user;
  }
}
