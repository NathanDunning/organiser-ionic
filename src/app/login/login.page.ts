import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  constructor(private loginService: LoginService) {}


  ngOnInit() {}

  onSubmit(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.loginService.login(username, password);
  }
}
