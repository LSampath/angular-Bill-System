import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {isUndefined} from 'util';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  message: string;
  saveMessage: string;
  isNewUser: boolean;
  isChangePassword: boolean;

  username: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    if (route.snapshot.params['id'] === 'new_user') {
      this.isNewUser = true;
      this.message = 'Add new user';
      this.isChangePassword = true;
    } else if (route.snapshot.params['id'] !== userService.u_id) {
      this.router.navigate(['user']);
    } else {
      this.isNewUser = false;
      this.message = 'My profile';
      this.isChangePassword = false;

      userService.getUser().subscribe(
        (result) => {
          $('#username').val(result.username);
          $('#fullname').val(result.fullname);
          $('#email').val(result.email);
          this.username = result.username;
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

  cancel() {
    this.router.navigate(['user']);
  }

  saveDetails() {
    console.log(this.validateDetails());
    if (this.validateDetails()) {

      if (this.isNewUser) {

        if ($('#new_password').val().toString().trim() === '') {
          $('#new_password').focus();
          this.saveMessage = 'Please provide a password for user account';
        } else {
          if ($('#conf_password').val().toString().trim() === '') {
            $('#conf_password').focus();
            this.saveMessage = 'Please provide a password for user account';
          } else {
            if ($('#conf_password').val().toString().trim() !== $('#new_password').val().toString().trim()) {
              $('#conf_password').focus();
              this.saveMessage = 'Passwords does not match each other';
            } else {
              const user = {
                username: $('#username').val().toString().trim(),
                fullname: $('#fullname').val().toString().trim(),
                email: $('#email').val().toString().trim(),
                password: $('#new_password').val().toString().trim()
              };
              this.userService.addUser(user).subscribe(
                (result) => {
                  if (result.reply === 'USERNAME_EXIST') {
                    $('#username').focus();
                    this.saveMessage = 'Username already used.';
                  } else {
                    this.router.navigate(['user']);
                  }
                }, (error) => {
                  console.log(error);
                }
              );
            }
          }
        }

      } else if (this.isChangePassword) {

        if ($('#cur_password').val().toString().trim() === '') {
          $('#cur_password').focus();
          this.saveMessage = 'Please verify your password.';
        } else {
          if ($('#new_password').val().toString().trim() === '') {
            $('#new_password').focus();
            this.saveMessage = 'Please provide a password for user account';
          } else {
            if ($('#conf_password').val().toString().trim() === '') {
              $('#conf_password').focus();
              this.saveMessage = 'Please provide a password for user account';
            } else {
              if ($('#conf_password').val().toString().trim() !== $('#new_password').val().toString().trim()) {
                $('#conf_password').focus();
                this.saveMessage = 'Passwords does not match each other';
              } else {
                const user = {
                  u_id: this.userService.u_id,
                  username: $('#username').val().toString().trim(),
                  oldusername: this.username,
                  fullname: $('#fullname').val().toString().trim(),
                  email: $('#email').val().toString().trim(),
                  password: $('#cur_password').val().toString().trim(),
                  newpassword: $('#new_password').val().toString().trim()
                };
                this.userService.updateUser(user).subscribe(
                  (result) => {
                    if (result.reply === 'USERNAME_EXIST') {
                      $('#username').focus();
                      this.saveMessage = 'Username already used.';
                    } else {
                      this.router.navigate(['user']);
                    }
                    console.log(result);
                  }, (error) => {
                    console.log(error);
                  }
                );
              }
            }
          }
        }

      } else {

        if ($('#cur_password').val().toString().trim() === '') {
          $('#cur_password').focus();
          this.saveMessage = 'Please verify your password.';
        } else {
          const user = {
            u_id: this.userService.u_id,
            username: $('#username').val().toString().trim(),
            oldusername: this.username,
            fullname: $('#fullname').val().toString().trim(),
            email: $('#email').val().toString().trim(),
            password: $('#cur_password').val().toString().trim()
          };
          this.userService.updateUser(user).subscribe(
            (result) => {
              if (result.reply === 'USERNAME_EXIST') {
                $('#username').focus();
                this.saveMessage = 'Username already used.';
              } else {
                this.router.navigate(['user']);
              }
              console.log(result);
            }, (error) => {
              console.log(error);
            }
          );
        }
      }
    }
  }

  validateDetails() {             // validate emails, usernames and names
    if ($('#username').val().toString().trim() === '') {
      $('#username').focus();
      this.saveMessage = 'Please provide username';
      return false;
    }else {
      if ($('#fullname').val().toString().trim() === '') {
        $('#fullname').focus();
        this.saveMessage = 'Please provide name of the user';
        return false;
      } else {
        if ($('#email').val().toString().trim() === '') {
          $('#email').focus();
          this.saveMessage = 'Please provide e-mail';
          return false;
        } else {
          this.saveMessage = '';
          return true;
        }
      }
    }
  }

  ngOnInit() {}
}
