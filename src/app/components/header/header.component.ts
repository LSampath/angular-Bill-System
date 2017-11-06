import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;

  constructor(private user: UserService) {
    // this.username = user.getUserName();
    this.username = user.getCurrentUser().username;
  }

  ngOnInit() {
  }

}
