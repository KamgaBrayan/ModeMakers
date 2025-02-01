import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../interfaces/product.interface';
import { Review } from '../../interfaces/review.interface';

@Component({
  selector: 'app-product-card',
  imports:[CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product; // Accept product data as input
  @Input() rating!: number;
  @Input() reviews!: Review[];
  ngOnInit(): void {
    // this.fetchReviews();
  }


  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}