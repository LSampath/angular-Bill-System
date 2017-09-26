import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  user: User;
  originalDetails: User;
  editable: boolean;

  constructor(private route: ActivatedRoute) {
    this.editable = false;
  }

  ngOnInit() {
    var user_id = this.route.snapshot.params.id;
    this.user = {id: 'U023', name: 'Ashan Madushanka Kooragoda', email: 'ashan.madu@gmail.com'};
    this.originalDetails = this.user;
  }

  enableEdit() {
    this.editable = ! this.editable;
  }

  saveDetail(username, email) {
    this.user.name = username;
    this.user.email = email;
    alert('User details are changed.');
  }

  resetDetail() {
    this.user = this.originalDetails;
    alert('User details are changed to default');
  }
}
