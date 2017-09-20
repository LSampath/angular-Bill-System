import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private isUserLoggedIn: boolean;
  private username: string;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(username) {
    this.isUserLoggedIn = true;
    this.username = username;
  }

  getUserLoggedIn() {
    return this.isUserLoggedIn;
  }

  getUserName() {
    return this.username;
  }

}
