import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoryComponent } from './components/category/category.component';
import {NgOptimizedImage} from "@angular/common";
import {AuthInterceptor} from "./interceptor/auth-interceptor";
import { TbRatingComponent } from './common/tb-rating/tb-rating.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { MyAccountLeftNavComponent } from './components/my-account-left-nav/my-account-left-nav.component';
import { AddressesComponent } from './components/my-account/addresses/addresses.component';
import { PreferencesComponent } from './components/my-account/preferences/preferences.component';
import { OrdersComponent} from "./components/my-account/orders/orders.component";
import { OrderDetailsComponent } from './components/my-account/orders/order-details/order-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BannerComponent,
    LoginComponent,
    SignupComponent,
    MyAccountComponent,
    ForgotPasswordComponent,
    CartComponent,
    CategoryComponent,
    TbRatingComponent,
    OrdersComponent,
    FavouritesComponent,
    RestaurantComponent,
    RestaurantDetailsComponent,
    MyAccountLeftNavComponent,
    AddressesComponent,
    PreferencesComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
