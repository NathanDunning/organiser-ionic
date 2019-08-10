import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  constructor(
    private registerService: RegisterService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const confirm = form.value.confirm;

    console.log(username, email, password, confirm);
    if (password !== confirm) {
      // TODO: Throw an error or create a popup
    }

    this.registerService.signup(username, email, password);

    // this.router.navigateByUrl('/login');

    // TODO: Can redirect to other page to welcome users to login
    // Or can bring a popup, what to do on error?
  }
}
