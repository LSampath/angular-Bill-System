import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  curUser: User;
  users: object[];

  constructor(private router: Router, private userService: UserService) {
    this.curUser = new User();
    this.curUser.u_id = this.userService.u_id;
    this.userService.getUser().subscribe(
      (result) => {
        this.curUser.email = result.email;
        this.curUser.username = result.username;
        this.curUser.fullname = result.fullname ;
      }, (error) => {
        console.log(error);
      }
    );
    this.userService.getAllUsers().subscribe(
      (result) => {
        this.users = result;
      }, (error) => {
        console.log(error);
      }
    ); // subscribe
  }

  ngOnInit() {
  }

  userDetails(navi) {
    if (navi === 'new_user') {
      this.router.navigate(['user/new_user']);
    }else {
      this.router.navigate(['user/' + this.userService.u_id]);
    }
  }


}
