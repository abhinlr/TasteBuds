import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {SiteService} from "../../services/site.service";

@Component({
  selector: 'app-my-account-left-nav',
  templateUrl: './my-account-left-nav.component.html',
  styleUrls: ['./my-account-left-nav.component.scss']
})
export class MyAccountLeftNavComponent implements OnInit{

  constructor(private authService:AuthService,
              private siteService:SiteService) {
  }

  userObject!:any;

  leftNav: { [key: string]: boolean } = {
    profile: false,
    orders: false,
    favourites:false,
    addresses:false,
    preferences: false
  };

  ngOnInit() {
      this.userObject = this.authService.getUserObject();
      this.leftNav['profile'] = true;
  }

  changeTab(tab:string){
    this.siteService.loading.next(true);
    for (const key in this.leftNav) {
      if (Object.prototype.hasOwnProperty.call(this.leftNav, key)) {
        this.leftNav[key] = false;
      }
    }
    this.leftNav[tab] = true;
    this.siteService.loading.next(false);
  }

}
