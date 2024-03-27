import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {AuthGuard} from "./guards/auth-guard";
import {HomeComponent} from "./components/home/home.component";
import {CartComponent} from "./components/cart/cart.component";
import {RestaurantDetailsComponent} from "./components/restaurant-details/restaurant-details.component";
import {MyAccountLeftNavComponent} from "./components/my-account-left-nav/my-account-left-nav.component";
import {CheckoutComponent} from "./components/checkout/checkout.component";

const routes: Routes = [
  { path: 'login', component: HomeComponent},
  { path: 'signup', component: HomeComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'profile', component: MyAccountLeftNavComponent},
  { path: 'cart', component: CartComponent},
  { path: 'restaurant/:id', component: RestaurantDetailsComponent},
  { path: 'orders', component:MyAccountLeftNavComponent},
  { path: 'favourites', component:MyAccountLeftNavComponent},
  { path: 'address', component:MyAccountLeftNavComponent},
  { path: 'preferences', component:MyAccountLeftNavComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: '', component:HomeComponent},
  { path:'**',component:HomeComponent}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
