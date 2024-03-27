import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {response} from "express";
import {filter} from "rxjs";
import {take} from "rxjs/operators";
import {SiteService} from "../../../services/site.service";


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  constructor(private authService:AuthService,
              private siteService:SiteService) {
    this.authService.getUserObject()
      .pipe(
        filter(user => user !== null),
        take(1)
      ).subscribe(user => {
      this.userAddress = user.address;
    });
  }

  addressData: {
    firstLine:string,
    street: string,
    city: string,
    state: string,
    postalCode: any,
    country: string
  } = {
    firstLine:'',
    street: '',
    city: '',
    state: '',
    postalCode: null,
    country: ''
  }
  userAddress!:any;

  ngOnInit() {

  }

  saveAddress() {
    this.siteService.loading.next(true);
    this.authService.saveAddress(this.addressData)
      .subscribe((response)=>{
        if(response.success){
          this.userAddress = response.data.address;
          this.siteService.loading.next(false);
        }
      })
  }
}
