import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Parse } from 'parse';
import { User } from './user.model';
import { BehaviorSubject, from } from 'rxjs';
import { Plugins } from '@capacitor/core';
import { map, tap } from 'rxjs/operators';

Parse.serverURL = 'https://parseapi.back4app.com'; // Server URL
Parse.initialize(
  'KgMzLrsdyIpg5Rr6sY8z9jUPfwGnC4CzAKHCHC1Y', // Application ID
  'ntuM4LNbBmfWh53KzXazDIm01DSztR6KCOVqhiGD' // Javascript key
);

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private router: Router) {}

  private _user = new BehaviorSubject<User>(null);

  /**
   * Function to auto login user if data is locally stored on device.
   */
  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      map(data => {
        // Check if data is valid or present in local storage
        if (!data || !data.value) {
          return null;
        }

        // Otherwise convert the string into an object
        const parseData = JSON.parse(data.value) as {
          token: string;
          username: string;
          email: string;
          userId: string;
        };

        // Create the user with the stored data
        const user = new User(
          parseData.userId,
          parseData.username,
          parseData.email,
          parseData.token
        );

        return user;
      }),
      // Check if user is set, if so then emit this user
      tap(user => {
        console.log(user);
        if (user) {
          this._user.next(user);
        }
      }),
      // Return this observable chain as a boolean
      map(user => {
        return !!user;
      })
    );
  }

  /**
   * Logs the user into the app.
   * @param username User's username
   * @param password User's password
   */
  login(username: string, password: string) {
    // Authenticate here
    // Pass the username and password to login function
    Parse.User.logIn(username, password)
      .then(user => {
        // Do after successful login
        // Set user
        this.setUser(
          user.id,
          user.get('username'),
          user.get('email'),
          user.get('sessionToken')
        );

        // Route user to home page
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        // Do after unsuccessfull login
        document.getElementById('invalidCred').innerHTML =
          'Invalid username or password';
      });
  }

  /**
   * Logging out function.
   */
  logout() {
    // Remove authentication
    this._user.next(null);

    // TODO: Clear from local storage
  }

  /**
   * Method called when user selected "Forgot Password".
   */
  resetPassword() {
    console.log('reset called');
    // TODO: Reset
    // Parse.User.requestPasswordReset("test@example.com").then(function() {
    //   console.log("Password reset request was sent successfully");
    // }).catch(function(error) {
    //   console.log("The login failed with error: " + error.code + " " + error.message);
    // });
  }

  /**
   * Method for setting user (register).
   * @param id User id
   * @param username User username
   * @param email User email
   * @param token user auth token
   */
  setUser(id: string, username: string, email: string, token: string) {
    // Set the user
    this._user.next(new User(id, username, email, token));

    // Store the auth data
    this.storeAuthData(id, username, email, token);
  }

  /**
   * This method stores the user's auth data into the device storage
   * @param userId Id of the user
   * @param username Username of user
   * @param email Email of user
   * @param token Session Token of user
   */
  private storeAuthData(
    userId: string,
    username: string,
    email: string,
    token: string
  ) {
    // Convert user authentication data into a string
    const data = JSON.stringify({
      userId: userId,
      username: username,
      email: email,
      token: token
    });

    // Set to storage via capacitor plugin
    Plugins.Storage.set({ key: 'authData', value: data });
  }

  /**
   * Getter for state of whether user is authenticated or not.
   */
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

  /**
   * Getter for the user Id.
   */
  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        }
      })
    );
  }
}
