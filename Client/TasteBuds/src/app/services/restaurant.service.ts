import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiConfig} from "../api-config";
import {response} from "express";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  latAndLng :{lat:number,lng:number}={lat:0,lng:0};

  constructor(private http:HttpClient) { }

  getLocationService():Promise<any>{
    return new Promise<any>((resolve,reject)=>{
      navigator.geolocation.getCurrentPosition(resp=>{
        this.latAndLng = {lng:resp.coords.longitude,lat:resp.coords.latitude};
        localStorage.setItem('latAndLng', JSON.stringify(this.latAndLng));
        this.http.post<any>(apiConfig.getLocation, this.latAndLng)
          .subscribe((response)=>{
            if(response.success && response.data){
              localStorage.setItem('location', JSON.stringify(response.data));
              resolve(response.data);
            }else{
              reject('Unable to fetch location');
            }
          })
      })
    })
  }

  getAllRestaurants(data:any):Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      this.http.post<any>(apiConfig.getAllRestaurants, data)
        .subscribe((response)=>{
          if(response.success &&response.data){
            resolve(response);
          }else{
            reject(response);
          }
        })
    })
  }

  getRestaurantMenu(data:any):Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      this.http.post<any>(apiConfig.getRestaurantMenu, data)
        .subscribe((response)=>{
          if(response.success &&response.data){
            resolve(response);
          }else{
            reject(response);
          }
        })
    })
  }

  addItemTocart(data:any):Promise<any>{
    console.log('data', data);
    return new Promise<any>((resolve, reject)=>{
      this.http.post<any>(apiConfig.addToCart, data)
        .subscribe((response)=>{
          if(response.success &&response.data){
            resolve(response);
          }else{
            reject(response);
          }
        })
    })
  }

  fetchCart():Promise<any>{
    return new Promise<any>((resolve, reject)=>{
      this.http.get<any>(apiConfig.fetchCart)
        .subscribe((response)=>{
          if(response.success &&response.data){
            resolve(response);
          }else{
            reject(response);
          }
        })
    })
  }




}
