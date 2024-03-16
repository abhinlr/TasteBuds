import { Component } from '@angular/core';
import { Router } from "@angular/router";
import {AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: { email: string, password: string } = { email: '', password: '' };

  constructor(private router: Router,
              private authService:AuthService) { }

  login() {
    this.authService.login(this.loginData);
  }

}
