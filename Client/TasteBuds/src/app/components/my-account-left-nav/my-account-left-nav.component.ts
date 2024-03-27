import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {SiteService} from "../../services/site.service";
import {filter} from "rxjs";
import {take} from "rxjs/operators";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-my-account-left-nav',
  templateUrl: './my-account-left-nav.component.html',
  styleUrls: ['./my-account-left-nav.component.scss']
})
export class MyAccountLeftNavComponent implements OnInit {

  constructor(private authService: AuthService,
              private siteService: SiteService,
              private route: ActivatedRoute,
              private router: Router) {
    this.authService.getUserObject()
      .pipe(
      filter(user => user !== null),
      take(1)
    ).subscribe(user => {
      this.userObject = user;
    });
  }

  userObject!: any;
  currentRoute!: string;

  leftNav: { [key: string]: boolean } = {
    profile: false,
    orders: false,
    favourites: false,
    address: false,
    preferences: false
  };

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.currentRoute = segments.join('/');
    });
    this.leftNav[this.currentRoute] = true;
    this.siteService.loading.next(false);
  }

  changeTab(tab: string) {
    this.siteService.loading.next(true);
    for (const key in this.leftNav) {
      if (Object.prototype.hasOwnProperty.call(this.leftNav, key)) {
        this.leftNav[key] = false;
      }
    }
    this.router.navigate([tab]);
  }

}
