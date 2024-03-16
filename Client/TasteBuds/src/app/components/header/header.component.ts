import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{
  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription=new Subscription();

  constructor(private router: Router, private authService: AuthService) {}

  loginPopup: boolean = false;
  signUpPopup: boolean = false;
  userObject:{}={};

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if(this.userIsAuthenticated){
          this.closeLoginPopup();
          this.userObject =this.authService.getUserObject();
          console.log('this.userObject', this.userObject)
        }
      });
    this.authService.authUser();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
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

  logout(){
    this.authService.logout();
  }

}
