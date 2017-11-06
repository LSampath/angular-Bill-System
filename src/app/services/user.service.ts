import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  private currentUser: User;

  constructor(private http: Http, private router: Router) {
    this.currentUser = new User(null, null, null, false);
  }

  getCurrentUser() {
    return this.currentUser;
  }
  setCurrentUser(user) {
    this.currentUser = user;
  }

  queryUser(username, password) {
    // this.http.post('http://localhost/back_End/controllers/user.php/', {'username': username, 'password': password})
    //   .map(res => res.json())
    //   .subscribe(
    //     function(users) {
    //       this.currentUser = users[0];
    //       this.currentUser.isUserLoggedIn = true;
    //       action(true, null);
    //     },
    //     function(error) {
    //       action(false, error);
    //     });
    return this.http.post('http://localhost/back_End/controllers/user.php/',
      {'type': 'get_user', 'username': username, 'password': password})
      .map(res => res.json());
  }

  queryUsers() {
    return this.http.post('http://localhost/back_End/controllers/user.php/',
      {'type': 'get_*_users'})
      .map(res => res.json());
  }

  queryUsername(usernameInfo) {
    return this.http.post('http://localhost/back_End/controllers/user.php/', usernameInfo)
      .map(res => res.json());
  }

}
