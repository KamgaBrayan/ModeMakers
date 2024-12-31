import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Product {
  id: number;
  name: string;
  gender: string;
  age: string;
  price: number;
  rating: number;
  photos: string[];
}

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