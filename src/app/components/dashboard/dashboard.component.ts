import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username: string;
  private user_id: string;

  constructor(private user: UserService, private route: ActivatedRoute, private router: Router) {
    this.username = user.getUserName();
  }

  ngOnInit() {
    this.user_id = this.route.snapshot.params.user_id;
  }

  goToUsers() {
    this.router.navigate(['user']);
  }

}
