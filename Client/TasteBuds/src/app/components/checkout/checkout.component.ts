import { Component, OnInit } from '@angular/core';
import {SiteService} from "../../services/site.service";
import {filter} from "rxjs";
import {take} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";
import {RestaurantService} from "../../services/restaurant.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  constructor(private siteService:SiteService,
              private authService:AuthService,
              private restaurantService: RestaurantService) {
    this.authService.getUserObject()
      .pipe(
        filter(user => user !== null),
        take(1)
      ).subscribe(user => {
      this.userAddress = user.address;
      this.setDefaultAddress();
    });
  }

  userAddress!:any;
  defaultAddress!:any;
  cartItems!:any;
  totalAmount!:any;
  shippingAddress:{firstLine:string,
    street:string,
    city:string,
    state:string,
    postalCode:string}={
    firstLine:'',
    street:'',
    city:'',
    state:'',
    postalCode:''
  };

  ngOnInit() {
    this.siteService.loading.next(false);
    this.getCartItems();
  }

  setDefaultAddress(){
    this.userAddress.forEach((address:any)=>{
      if(address.default){
        this.defaultAddress = address
      }
    })
    console.log(this.defaultAddress);
  }

  setShippingAddress(){
    this.shippingAddress = { ...this.defaultAddress };
  }

  getCartItems(){
    this.restaurantService.fetchCart()
      .then((response)=>{
        if(response.success && response.data){
          this.siteService.loading.next(false);
          this.cartItems = response.data.items;
          this.totalAmount = response.data.total;
        }
      })
  }

  proceedToPay() {
    this.authService.proceedToPay(this.totalAmount).subscribe(resp => {
      let paymentPage = resp.data.url;
      window.open(paymentPage, '_blank');
    });
  }

}
