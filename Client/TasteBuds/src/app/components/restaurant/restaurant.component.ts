import { Component, OnInit } from '@angular/core';
import { RestaurantService} from "../../services/restaurant.service";
import { SiteService} from "../../services/site.service";
import {response} from "express";

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit{

  constructor(private restaurantService:RestaurantService,
              private siteService:SiteService) {
  }

  latAndLng!:any;
  bestRestaurants!:any;
  nearbyRestaurants!:any;

  ngOnInit() {
    this.latAndLng = localStorage.getItem('latAndLng');
    if(this.latAndLng){
      this.latAndLng = JSON.parse(this.latAndLng);
      this.getAllRestaurants();
    }
  }

  getAllRestaurants() {
    this.siteService.loading.next(true);
    this.restaurantService.getAllRestaurants(this.latAndLng)
      .then((response) => {
        if(response.success && response.data){
          this.bestRestaurants = response.data.data.cards[1].card.card.gridElements.infoWithStyle.restaurants;
          // this.nearbyRestaurants = response.data.data.cards[3].card.card.gridElements.infoWithStyle.restaurants;
          console.log('all restaurants', this.bestRestaurants);
          this.siteService.loading.next(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  moveCards(direction: string) {
    const cardContainer = document.querySelector('.card-container');
    const scrollAmount = 200;

    if (!cardContainer) return;

    const startScroll = cardContainer.scrollLeft;
    const targetScroll = direction === 'left' ? startScroll - scrollAmount : startScroll + scrollAmount;
    const duration = 300; // Duration of the scroll animation in milliseconds

    const startTime = performance.now();

    const animateScroll = (timestamp: number) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1); // Ensure progress is between 0 and 1
      const scrollPosition = startScroll + (targetScroll - startScroll) * progress;
      cardContainer.scrollLeft = scrollPosition;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  roundRatingValue(value: number){
    return Math.round(value * 2) / 2;
  }

}
