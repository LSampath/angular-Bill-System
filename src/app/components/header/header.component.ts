import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {CookieService} from 'ngx-cookie-service';
import {isUndefined} from 'util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;

  constructor(public userService: UserService, private cookieService: CookieService, private router: Router) {
    userService.getUser().subscribe(
      (result) => {
        if (result.reply === 'NO_SUCH_USER') {
          this.cookieService.delete('CUR_U_ID');
          router.navigate(['login']);
        }else {
          this.username = result.username;
        }
      }, (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  loadMenu(tabName) {
    this.router.navigate([tabName]);
    $('.' + 'active').removeClass('active');
    $('#' + tabName + '_tab').addClass('active');
  }

}
