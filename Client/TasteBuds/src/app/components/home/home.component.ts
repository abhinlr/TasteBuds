import {Component, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit{

  constructor(private route:ActivatedRoute) {}

  ngAfterViewInit(): void {
  }

}
