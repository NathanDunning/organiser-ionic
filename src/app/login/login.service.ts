import { Injectable } from '@angular/core';

const Parse = require('parse');
Parse.serverURL = 'https://parseapi.back4app.com';  // Server URL
Parse.initialize(
  'KgMzLrsdyIpg5Rr6sY8z9jUPfwGnC4CzAKHCHC1Y', // Application ID
  'ntuM4LNbBmfWh53KzXazDIm01DSztR6KCOVqhiGD' // Javascript key
)

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private _isAuthenticated = false;

  get userIsAuthenticated() {
    return this._isAuthenticated;
  }

  constructor() { }

  login() {
    // Authenticate here
    this._isAuthenticated = true;
    console.log('auth service login called');
  }

  logout() {
    // Remove authentication here
    this._isAuthenticated = false;
  }
}
