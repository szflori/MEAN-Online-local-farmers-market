// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.auth
        .checkSession()
        .then((user) => {
          if (user) {
            observer.next(true);
          } else {
            this.router.navigate(['/login']);
            observer.next(false);
          }
          observer.complete();
        })
        .catch(() => {
          this.router.navigate(['/login']);
          observer.next(false);
          observer.complete();
        });
    });
  }
}
