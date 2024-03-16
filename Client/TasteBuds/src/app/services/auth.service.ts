import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  {apiConfig} from "../api-config";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  signUp(signUpData:any){
    return this.http.post<any>(apiConfig.signUp, { data : signUpData});
  }

  login(loginData:any){
    return this.http.post<any>(apiConfig.login, { data : loginData});
  }
}
