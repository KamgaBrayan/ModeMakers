import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product, Review, Stylist } from '../garment-special';

@Component({ 
  selector: 'app-product-slide',
  imports: [CommonModule],
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css']
}) 
export class ProductSlideComponent { 
  @Input() product!: Product;
  @Input() stylist!: Stylist;
  currentImageIndex: number = 0;
  @Input() rating: number = 0;
  
  ngOnInit(): void {
    console.log(this.rating)
  }
  
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.photos.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.product.photos.length) % this.product.photos.length;
  }
  
  getStarsArray(): number[] {
    return Array(Math.round(this.rating)).fill(0);
  }
} 