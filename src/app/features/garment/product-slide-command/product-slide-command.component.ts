import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../../shared/models/product_.interface';
import { Stylist } from '../../../shared/models/stylist.interface';

@Component({ 
  selector: 'app-product-slide-command',
  imports: [CommonModule],
  templateUrl: './product-slide-command.component.html',
  styleUrls: ['./product-slide-command.component.css']
}) 
export class ProductSlideCommandComponent { 
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