import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const user = this.auth.currentUser;

    if (!user) {
      return this.router.createUrlTree(['/']);
    }

    switch (user.role) {
      case 'ADMIN':
      case 'FARMER':
        return this.router.createUrlTree(['/management']);
      case 'USER':
        return this.router.createUrlTree(['/app']);
      default:
        return this.router.createUrlTree(['/']);
    }
  }
}
