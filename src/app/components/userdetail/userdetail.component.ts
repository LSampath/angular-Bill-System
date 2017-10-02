import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  originalDetails: User;
  editable: boolean;
  my: UserService;

  constructor(private route: ActivatedRoute, private user: UserService) {
    this.editable = false;
    this.my = user;
  }

  ngOnInit() {
  }

}
