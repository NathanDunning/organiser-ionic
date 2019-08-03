import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Parse } from 'parse';
import { LoginService } from '../login/login.service';

Parse.serverURL = 'https://parseapi.back4app.com'; //  Server URL
Parse.initialize(
  `${environment.ParseServerApplicationID}`, // Application ID
  `${environment.ParseServerJSKey}` // Javascript key
);

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private loginService: LoginService, private router: Router) {}

  signup(username: string, email: string, password: string) {
    const user = new Parse.User();
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    // TODO: Change page based on response
    user
      .signUp()
      .then(user => {
        this.loginService.setUser(
          user.id,
          user.get('username'),
          user.get('email'),
          user.get('sessionToken')
        );

        // Route user to home page
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        document.getElementById('errorMessage').innerHTML =
          'Account already exists';
      });
  }
}
