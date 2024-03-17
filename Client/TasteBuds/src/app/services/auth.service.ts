import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  {apiConfig} from "../api-config";
import {BehaviorSubject, map, Subject} from "rxjs";
import {response} from "express";
import {Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | undefined;
  private userObject = new BehaviorSubject<any>(null);
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  constructor(private http: HttpClient,
              private router:Router) { }

  setUserObject(user: any) {
    this.userObject.next(user);
  }

  getUserObject() {
    return this.userObject.asObservable();
  }

  getToken(){
    return this.token;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  authUser(){
    const authData = this.fetchAuthData();
    if(authData){
      this.token = authData.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      this.setUserObject(authData.user);
    }
  }
  signUp(signUpData:any){
    return this.http.post<any>(apiConfig.signUp, { data : signUpData});
  }
  sendOtpEmail(email:any){
    return this.http.post<any>(apiConfig.sendEmail,{email:email});
  }

  verifyEmail(otp:number,email:string){
    return this.http.post<any>(apiConfig.verifyEmail,{otp:otp,email:email});
  }

  getAuthStatus(){
    return this.isAuthenticated;
  }

  login(loginData:any){
    this.http.post<any>(apiConfig.login, { data : loginData})
      .pipe(
        map(response=>{
          if (response.success && response.data && response.data.user) {
            const userWithoutPassword = { ...response.data.user };
            delete userWithoutPassword.password; // Remove the password field
            return { ...response, data: { ...response.data, user: userWithoutPassword } };
          } else {
            return response;
          }
        })
      )
      .subscribe(response=>{
        if(response.success && response.data){
          this.token = response.data.token;
          if(this.token){
            this.authStatusListener.next(true);
            this.isAuthenticated = true;
            this.setUserObject(response.data.user);
            this.setAuthData(this.token,this.userObject);
            this.router.navigate(['/']);
          }
        }
      })
  }
  logout(){
    this.token = undefined;
    this.authStatusListener.next(false);
    this.isAuthenticated = false;
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthData(token:string,user:any){
    localStorage.setItem('token',token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  private clearAuthData(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private fetchAuthData(){
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    if(!token || !userString){
      return;
    }
    const user: {} = userString ? JSON.parse(userString) : null;
    return { token, user };
  }
}
