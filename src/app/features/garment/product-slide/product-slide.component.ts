import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, Stylist } from '../garment.model';

@Component({ 
  selector: 'app-product-slide',
  imports: [CommonModule],
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css']
}) 
export class ProductSlideComponent { 
  @Input() product!: Product;
  @Input() stylist!: Stylist;
  @Input() images: string[] = [];
  @Input() currentImageIndex: number = 0;
  
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }
  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
} 