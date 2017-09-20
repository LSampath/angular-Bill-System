import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userlist: User[];

  constructor() {
    this.userlist = [
      {id: 'U001', name: 'Lahiru Sampath Vithanage', email: 'lsampath21@gmail.com'},
      {id: 'U023', name: 'Ashan Madushanka Kooragoda', email: 'ashan.madu@gmail.com'}
      ];
  }

  ngOnInit() {
  }

  goToUserDetail(event) {

  }

}
