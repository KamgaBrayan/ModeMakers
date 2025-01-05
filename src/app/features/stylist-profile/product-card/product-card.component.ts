import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from './product-card.model';
import { RouterModule } from '@angular/router';
import { Review } from '../reviews/reviews.model';

@Component({
  selector: 'app-product-card',
  imports:[CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product; // Accept product data as input
  rating: number = 0;
  reviews: Review[] = [];
  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews() {
    let reviews_data : Review[];
    fetch('/datas/reviews.json') // Adjust the path as necessary
      .then(response => response.json())
      .then((data: Review[]) => {
        reviews_data = data;
        for (let review of reviews_data){
          if(review.product.product_id === this.product.id){
            this.reviews.push(review); // Add the review to the array=
          }
        }
        this.rating = this.reviews.reduce((acc, review) => acc + review.product.product_note, 0) / this.reviews.length;
         // Assign the fetched reviews to the component's array
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }
  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}