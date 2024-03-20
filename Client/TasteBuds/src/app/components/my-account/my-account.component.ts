import { Component,OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit{
  constructor(private authService:AuthService) {
  }
  userObject!:any;

  ngOnInit() {
    this.userObject =this.authService.getUserObject();
    this.userObject = this.userObject.source._value._value
    console.log('this.userObject', this.userObject);
  }
}
