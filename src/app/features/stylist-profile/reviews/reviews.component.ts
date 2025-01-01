import { Component, OnInit } from '@angular/core';
import { Review } from './reviews.model'; // Import the Review interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  reviews: Review[] = []; // Array to hold reviews

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    fetch('/datas/reviews.json') // Adjust the path as necessary
      .then(response => response.json())
      .then((data: Review[]) => {
        this.reviews = data; // Assign the fetched reviews to the component's array
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }
  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}