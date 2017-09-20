import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {

  constructor(private router: Router, private user: UserService) { }

  loginUser(username, password) {
    if (username === 'admin' && password === 'LS') {
      this.user.setUserLoggedIn(username);
      this.router.navigate(['dashboard']);
    }
  }

  ngOnInit() {
  }

}
