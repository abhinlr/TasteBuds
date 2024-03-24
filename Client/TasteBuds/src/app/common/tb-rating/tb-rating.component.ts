import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tb-rating',
  templateUrl: './tb-rating.component.html',
  styleUrls: ['./tb-rating.component.scss']
})
export class TbRatingComponent {
  @Input() ratingValue: number = 0;
}
