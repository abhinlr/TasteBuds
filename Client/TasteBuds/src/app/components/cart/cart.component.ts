import { Component,OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  constructor(private restaurantService:RestaurantService) {
  }

  cartItems!:any;

  ngOnInit() {
    this.fetchCart();
  }

  fetchCart(){
    this.restaurantService.fetchCart()
      .then((response)=>{
        if(response.success && response.data){
          this.cartItems = response.data.items;
        }
      })
  }

  decrementQuantity(item:any){
    if(item.quantity>1){
      item.quantity--;
    }
  }

  incrementQuantity(item:any){
    item.quantity++;
  }

  deleteItem(item:any){

  }

}
