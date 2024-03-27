import { Component,OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit{
  constructor(private authService:AuthService) {
    this.authService.getUserObject().subscribe(value => this.userObject = value);
  }
  userObject!:any;

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }
}
