import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, NgForm} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  postdata(angForm1) {
    this.dataService.userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
          this.router.navigate([redirect]);
        },
        error => {
          alert('Usuario o clave incorrecta');
        });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
