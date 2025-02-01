import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { StylistUser } from '../../../shared/interfaces/stylistUser.interface';

@Component({ 
  selector: 'app-product-slide-command',
  imports: [CommonModule],
  templateUrl: './product-slide-command.component.html',
  styleUrls: ['./product-slide-command.component.css']
}) 
export class ProductSlideCommandComponent { 
  @Input() product!: Product;
  @Input() stylist!: StylistUser;
  currentImageIndex: number = 0;
  @Input() rating: number = 0;
  
  ngOnInit(): void {
    console.log(this.product.images)
  }
  
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
  }

  previousImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
  }
  
  getStarsArray(): number[] {
    return Array(Math.round(this.rating)).fill(0);
  }
} 