import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from './product-card.model';

@Component({
  selector: 'app-product-card',
  imports:[CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product; // Accept product data as input
  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}