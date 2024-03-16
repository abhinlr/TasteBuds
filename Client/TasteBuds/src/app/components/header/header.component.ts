import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {OnInit} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private router: Router) {
  }
  loginPopup: boolean = false;
  signUpPopup:boolean= false;

  ngOnInit() {

  }

  openLoginPopup(){
    this.loginPopup = true;
  }
  closeLoginPopup(){
    this.loginPopup = false;
  }

  openSignUpPopup(){
    this.signUpPopup = true;
  }
  closeSignUpPopup(){
    this.signUpPopup = false;
  }

}
