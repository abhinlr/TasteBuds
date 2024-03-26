import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService} from "../../services/restaurant.service";
import { SiteService} from "../../services/site.service";

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit{
  constructor(private restaurantService:RestaurantService,
              private route: ActivatedRoute,
              private siteService:SiteService) {
  }

  restaurantDetails!:any;
  recommendedItems!:any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getRestautantMenu(id);
    });
  }

  getRestautantMenu(restaurantId:number){
    this.siteService.loading.next(true);
    let data = {restaurantId:restaurantId};
    this.restaurantService.getRestaurantMenu(data)
      .then(response=>{
        this.restaurantDetails = response.data.data.cards[0]?.card?.card.info;
        const recommendedCards = [
          response.data.data.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards,
          response.data.data.cards[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards,
          response.data.data.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards
        ];
        this.recommendedItems = recommendedCards.find(cards => !!cards);

        console.log(this.recommendedItems);
        this.siteService.loading.next(false);
      })
  }

  addToCart(product:any){
    product.quantity = 1;
    this.restaurantService.addItemTocart(product)
      .then(response => {
        console.log(response);
      }).catch(error=>{
      console.log(error);
    })
  }
  roundRatingValue(value: number){
    return Math.round(value * 2) / 2;
  }

  slicePrice(price:any){
    return parseFloat(price.toString().slice(0, -2));
  }


}
