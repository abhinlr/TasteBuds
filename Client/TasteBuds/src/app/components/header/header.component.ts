import {Component, OnDestroy, HostListener} from '@angular/core';
import {Router} from "@angular/router";
import {OnInit} from "@angular/core";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {RestaurantService} from "../../services/restaurant.service";
import {SiteService} from "../../services/site.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy{
  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription=new Subscription();

  constructor(private router: Router,
              private authService: AuthService,
              private restaurantService:RestaurantService,
              private siteService:SiteService,
              private location: Location) {}


  loginPopup: boolean = false;
  signUpPopup: boolean = false;
  userObject:{}={};
  locationData:any=null;
  latAndLong:any = null;
  isSticky:boolean=false;
  ngOnInit() {
    this.loginPopup = this.location.path() === '/login';
    this.signUpPopup = this.router.url !== '/login';
    this.signUpPopup = this.location.path() === '/signup';
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        if(this.userIsAuthenticated){
          this.closePopup();
          this.userObject =this.authService.getUserObject();
        }
      });
    this.getLocation();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }

  openLoginPopup(){
    this.loginPopup = true;
  }
  closePopup(){
    this.loginPopup = false;
    this.signUpPopup = false;
  }

  openSignUpPopup(){
    this.signUpPopup = true;
  }

  logout(){
    this.authService.logout();
  }

  getLocation(){
    let locationObj:any = localStorage.getItem('location');
    if(locationObj){
      locationObj = JSON.parse(locationObj);
      this.locationData = {place:locationObj.features[0].properties.county,state:locationObj.features[0].properties.state_code};
    }else {
      this.restaurantService.getLocationService()
        .then(resp=>{
          this.locationData = {place:resp.features[0].properties.county,state:resp.features[0].properties.state_code};
        })
    }
  }
}
