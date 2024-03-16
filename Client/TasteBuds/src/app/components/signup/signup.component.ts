import { Component } from '@angular/core';
import { AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authService:AuthService,
              private router:Router) {
  }

  signUpData:{fullName:String,email:String,password:String,confirmPassword:String}={fullName:'',email:'',password:'',confirmPassword:''};

  signup(){
    if(this.signUpData.password === this.signUpData.confirmPassword){
      this.authService.signUp(this.signUpData)
        .subscribe(response => {
          if(response.success && response.data){
            this.router.navigate(['/login']);
          }
        });
    }
  };

}
