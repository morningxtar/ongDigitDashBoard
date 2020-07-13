import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UserModel} from "../models/user.model";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.onConnexion(this.registerForm.value);
  }

  onConnexion(data: UserModel) {
    this.authService.getAdmin(data.email, data.password, 'admin')
      .subscribe(value => {
          // @ts-ignore
          if (value._embedded.users.length > 0) {
            // @ts-ignore
            localStorage.setItem('email', value._embedded.users[0].email);
            this.authService.changeIsAuth(localStorage.getItem('email'));
            console.log(this.authService.isAuth);
          }
          //
        },
        error => {
          console.log(error);
        });
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

}
