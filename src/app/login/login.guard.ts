import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { take, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanLoad {
  constructor(private loginService: LoginService, private router: Router) {}

  /**
   * Guard that will prevent apps from loading if not authenticated.
   * @param route Routes guarded
   * @param segments Url paths
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if user is authenticated
    return this.loginService.userIsAuthenticated.pipe(
      take(1), // Take 1 -> takes the current observable at time called
      // If user is not authenticated, check to see if we can auto login
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          // Note: autologin observable chain returns a boolean
          return this.loginService.autoLogin();
        } else {
          // Return (false)
          return of(isAuthenticated);
        }
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          // Redirect back to
          this.router.navigateByUrl('/login');
        }
      })
    );
  }
}
