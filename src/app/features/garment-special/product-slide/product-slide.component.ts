import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Precommand, Product, Stylist } from '../garment-special';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-slide-special',
  imports : [CommonModule, FormsModule],
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.css']
})
export class ProductSlideComponent {
  @Input() stylist!: Stylist;
  @Output() precommandChange = new EventEmitter<Precommand>(); // Événement pour notifier le parent
  precommand:Precommand={photos:[],name:''}; // Stocke les precommand.photos uploadées
  currentImageIndex: number = 0;
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  // ngOnInit() {
  // }

  saveGarmentName() {
    if (this.precommand.name.trim()) {
      console.log('Garment Name Saved:', this.precommand.name);
      // this.precommand.name = this.garmentName;
    } else {
      console.error('Garment name is empty!');
    }
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            this.precommand.photos.push(e.target.result as string);
            this.emitPrecommand();
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer?.files) {
      Array.from(event.dataTransfer.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && e.target.result) {
            this.precommand.photos.push(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.precommand.photos.length;
  }

  previousImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.precommand.photos.length) % this.precommand.photos.length;
  }
  private emitPrecommand(): void {
    this.precommandChange.emit(this.precommand);
  }
}
