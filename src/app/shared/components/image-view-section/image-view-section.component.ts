import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-image-view-section',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './image-view-section.component.html',
  styleUrl: './image-view-section.component.css'
})
export class ImageViewSectionComponent {
  images: string[] = [
    '/assets/images/dress.jpg',
    '/assets/images/dress1.jpg',
    '/assets/images/dress.jpg',
    '/assets/images/dress.jpg'
  ];
  
  currentImageIndex: number = 0;

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  previousImage(): void {
    this.currentImageIndex = this.currentImageIndex === 0 
      ? this.images.length - 1 
      : this.currentImageIndex - 1;
  }

  nextImage(): void {
    this.currentImageIndex = this.currentImageIndex === this.images.length - 1 
      ? 0 
      : this.currentImageIndex + 1;
  }

}
