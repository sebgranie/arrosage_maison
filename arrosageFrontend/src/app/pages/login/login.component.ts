import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage;
  interval;
  signInForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.errorMessage = "";
    this.signInForm = this.formBuilder.group({
      user: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ]))
    });
  }

  public signIn() {
    this.authService.login(this.signInForm.value.user + '.family@douze.com', this.signInForm.value.password).then(
      () => {
        setTimeout(() => { this.router.navigate(['feed']) }, 1000);
      }, (error) => {
        console.log(error);
        this.errorMessage = 'Wrong credentials, please try again'
      });
  }

}
