import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  userService: UserService;
  message: string;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) {
    this.userService = user;
    this.message = 'Welcome Back';
  }

  onSubmit(username, password) {
    // implement the user type part of the page
    // if (this.user.logIn(username, password, )) {
    //   this.router.navigate(['invoice']);
    // }else {
    //   // cannot login
    // }
    // this.user.logIn(username, password, function(loggedIn, error){
    //   if (loggedIn) {
    //     this.router.navigate(['invoice']);
    //   }else {
    //     console.log(error);
    //     // this is for implementation details . afterwards remove error variable and use proper message to the user
    //   }
    // });
    this.user.queryUser(username, password).subscribe(
      users => {
        const user = this.userService.getCurrentUser();
        user.setUserDetail(users[0].username, users[0].password, users[0].name, true);
        console.log(this.userService.getCurrentUser());
        this.router.navigate(['invoice']);
      },
      error => {
        console.log(error);
        this.message = 'Try Again !';
      }
    );
  }

  ngOnInit() {

  }

}
