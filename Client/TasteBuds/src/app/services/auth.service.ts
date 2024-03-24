import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiConfig} from "../api-config";
import {BehaviorSubject, map, Subject} from "rxjs";
import {response} from "express";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userObject = new BehaviorSubject<any>(null);
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http: HttpClient,
              private router: Router) {
  }

  setUserObject(user: any) {
    this.userObject.next(user);
  }

  getUserObject() {
    return this.userObject.asObservable();
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  authUser() {
    this.fetchAuthData().subscribe(response => {
      if (response && response.user) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.setUserObject(response.user);
      }
    }, error => {
      console.log(error)
    });
  }

  signUp(signUpData: any) {
    return this.http.post<any>(apiConfig.signUp, {data: signUpData});
  }

  sendOtpEmail(email: any) {
    return this.http.post<any>(apiConfig.sendEmail, {email: email});
  }

  verifyEmail(otp: number, email: string) {
    return this.http.post<any>(apiConfig.verifyEmail, {otp: otp, email: email});
  }

  getAuthStatus() {
    return this.isAuthenticated;
  }

  login(loginData: any) {
    this.http.post<any>(apiConfig.login, {email: loginData.email, password: loginData.password})
      .subscribe(response => {
        if (response.success && response.user) {
          this.authStatusListener.next(true);
          this.isAuthenticated = true;
          this.setUserObject(response.user);
          this.router.navigate(['/']);
        }
      })
  }

  logout() {
    this.http.get<any>(apiConfig.logout)
      .subscribe((response)=>{
        if(response.success){
          this.authStatusListener.next(false);
          this.isAuthenticated = false;
          this.router.navigate(['/']);
        }
      })
  }

  private fetchAuthData() {
    return this.http.get<any>(apiConfig.profile);
  }
}
