import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrls: ['./loginform.component.css']
})
export class LoginformComponent implements OnInit {
  user_name: string;

  constructor(private router: Router, private user: UserService, private route: ActivatedRoute) { }

  onSubmit(username, password) {
    if (username === 'admin' && password === 'LS') {
      this.user.setUserLoggedIn(username);
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    if (! isUndefined(this.route.snapshot.params.username)) {
      this.user_name = this.route.snapshot.params.username;
    }
  }

}
