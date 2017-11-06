import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import * as $ from 'jquery';
import {User} from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: any[];
  userService: UserService;

  constructor(private router: Router, private user: UserService) {
    this.user.queryUsers().subscribe(
      users => {
        this.users = users;
        console.log(users);
      },
      error => {
        console.log(error);
      }
    );
    $('#' + this.user.getCurrentUser().username + '_user').addClass('active');
  }

  ngOnInit() {
    $('.active').removeClass('active');
    $('#userTab').addClass('active');

    console.log('#' + this.user.getCurrentUser().username + '_user');
  }

  goToProfile(name) {
    this.router.navigate(['user/' + name]);
  }

}
