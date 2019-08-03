import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

Parse.serverURL = 'https://parseapi.back4app.com';  // Server URL
Parse.initialize(
  'KgMzLrsdyIpg5Rr6sY8z9jUPfwGnC4CzAKHCHC1Y', // Application ID
  'ntuM4LNbBmfWh53KzXazDIm01DSztR6KCOVqhiGD' // Javascript key
)

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        }
      })
    );
  }

  constructor() { }

  login(username: string, password: string) {
    // Authenticate here
    // Pass the username and password to logIn function
    Parse.User.logIn(username, password).then((user) => {
      // Do stuff after successful login
      if (typeof document !== 'undefined') document.write(`Logged in user: ${JSON.stringify(user)}`);
      console.log('Logged in user', user);
    }).catch(error => {
      if (typeof document !== 'undefined') document.write(`Error while logging in user: ${JSON.stringify(error)}`);
      console.error('Error while logging in user', error);
    });

    //this._isAuthenticated = true;
    console.log('auth service login called');
  }

  logout() {
    // Remove authentication here
    this._isAuthenticated = false;
  }
}
