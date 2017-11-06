import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (! this.user.getCurrentUser().isUserLoggedIn) {
      this.router.navigate(['/']);
    }
    return this.user.getCurrentUser().isUserLoggedIn;
  }
}
