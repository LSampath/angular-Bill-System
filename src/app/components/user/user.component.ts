import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  my: UserService;

  constructor(private router: Router, private user: UserService) {
    this.my = user;
  }

  ngOnInit() {
  }

  logInAs(username) {
    this.router.navigate(['login/' + username]);
  }

  goToProfile() {
    this.router.navigate(['user/' + this.my.getUserName()]);
  }

}
