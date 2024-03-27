import { Component,OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";
import {response} from "express";
import {SiteService} from "../../services/site.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private restaurantService:RestaurantService,
              private siteService:SiteService) {
  }

  cartItems!:any;
  cartTotal:number = 0;

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart(){
    this.siteService.loading.next(true);
    this.restaurantService.fetchCart()
      .then((response)=>{
        if(response.success && response.data){
          this.siteService.loading.next(false);
          this.cartItems = response.data.items;
          this.cartTotal = response.data.total;
        }
      })
  }

  decrementQuantity(item:any){
    if(item.quantity>1){
      item.quantity--;
      this.updateQty(item._id,item.quantity);
    }
  }

  incrementQuantity(item:any){
    item.quantity++;
    this.updateQty(item._id,item.quantity);
  }

  updateQty(id:string,qty:number){
    this.restaurantService.updateItemQty(id,qty)
      .then((response)=>{
        if(response.success && response.data){
          this.cartItems = response.data.cart.items;
          this.cartTotal = response.data.total;
        }
      })
  }

  deleteItem(itemId:string){
    this.siteService.loading.next(true);
    this.restaurantService.deleteItemFromCart(itemId)
      .then((response)=>{
        if(response.success && response.data){
          this.siteService.loading.next(false);
          this.cartItems = response.data.cart.items;
          this.cartTotal = response.data.total;
        }
      })
  }
}
