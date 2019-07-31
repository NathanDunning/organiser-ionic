import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const confirm = form.value.confirm;

    console.log(name, email, password, confirm);
  }
}
