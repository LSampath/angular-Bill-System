import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.cookieService.get('CUR_U_ID') === '') {
      this.router.navigate(['/']);
    }
    return true;
  }
}
