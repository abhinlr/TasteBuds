import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {SiteService} from "./services/site.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'TasteBuds';
  loading:boolean= false;

  constructor(private authService:AuthService,
              private siteService:SiteService) {
  }

  ngOnInit() {
    this.loading = true;
    this.siteService.loading.subscribe(data => {
      setTimeout(() => {
        this.loading = data;
      });
    });
    this.siteService.loading.next(true);
    this.authService.authUser();
    this.loading = false;
    this.siteService.loading.subscribe(data => {
      setTimeout(() => {
        this.loading = data;
      });
    });
  }
}
