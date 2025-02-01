import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Review } from '../../interfaces/review.interface';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent{
  @Input() reviews: Review[] = [];

  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
} 