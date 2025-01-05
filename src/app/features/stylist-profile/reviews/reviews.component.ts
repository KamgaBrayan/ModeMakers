import { Component, Input, OnInit } from '@angular/core';
import { Review } from './reviews.model'; // Import the Review interface
import { CommonModule } from '@angular/common';
import { Product } from '../stylist-profile.model';

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