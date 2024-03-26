import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ForgotPasswordComponent} from "./components/forgot-password/forgot-password.component";
import {MyAccountComponent} from "./components/my-account/my-account.component";
import {AuthGuard} from "./guards/auth-guard";
import {HomeComponent} from "./components/home/home.component";
import {CartComponent} from "./components/cart/cart.component";
import {RestaurantDetailsComponent} from "./components/restaurant-details/restaurant-details.component";
import {MyAccountLeftNavComponent} from "./components/my-account-left-nav/my-account-left-nav.component";

const routes: Routes = [
  { path: 'login', component: HomeComponent},
  { path: 'signup', component: HomeComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path : 'my-account', component: MyAccountLeftNavComponent},
  { path:'cart', component: CartComponent},
  { path: 'restaurant/:id', component: RestaurantDetailsComponent},
  { path: '', component:HomeComponent},
  { path:'**',component:HomeComponent}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[]
})
export class AppRoutingModule { }
