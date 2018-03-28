import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {isUndefined} from 'util';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  user_name: string;

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) {

  }

  onSubmit(username, password) {
    if (username === '') {
      document.forms[0].elements['username'].focus();
    }else if (password === '') {
      document.forms[0].elements['password'].focus();
    }else {
      this.userService.userLogin({username: username, password: password}).subscribe(
        (result) => {
          if (result.reply === 'NO_SUCH_USER') {
            alert('no such user found');
          }else {
            this.cookieService.set('CUR_U_ID', result.reply);
            this.router.navigate(['invoice']);
          }
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnInit() {}

}
