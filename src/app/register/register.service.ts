import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const Parse = require('parse');

Parse.serverURL = 'https://parseapi.back4app.com'; //  Server URL
Parse.initialize(
  `${environment.ParseServerApplicationID}`, // Application ID
  `${environment.ParseServerJSKey}`, // Javascript key
);

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  signup(username: String, email: String, password: String) {
    const user = new Parse.User()
    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

    // TODO: Change page based on response
    user.signUp().then((user) => {
      if (typeof document !== 'undefined') document.write(`User signed up: ${JSON.stringify(user)}`);
      console.log('User signed up', user);
    }).catch(error => {
      if (typeof document !== 'undefined') document.write(`Error while signing up user: ${JSON.stringify(error)}`);
      console.error('Error while signing up user', error);
    });
    

  }
}
