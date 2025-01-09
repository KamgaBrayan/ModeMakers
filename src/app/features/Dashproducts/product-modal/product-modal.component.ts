import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';
import { Material } from '../../../shared/models/material.model';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-modal.component.html',
  styles: [`
    .hidden {
      display: none;
    }
    .modal-overlay {
      position: fixed;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 50;
    }
    .modal-container {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      width: 91.666667%;
      max-width: 56rem;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid #e5e7eb;
    }
    .close-btn {
      color: #6b7280;
      transition: color 150ms;
    }
    .close-btn:hover {
      color: #374151;
    }
    .modal-content {
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    @media (min-width: 768px) {
      .modal-content {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    .image-section {
      position: relative;
    }
    .current-image {
      position: relative;
      border-radius: 0.5rem;
      overflow: hidden;
    }
    .product-image {
      width: 100%;
      aspect-ratio: 1;
      object-fit: cover;
    }
    .image-overlay {
      position: absolute;
      inset: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 150ms;
    }
    .image-overlay:hover {
      opacity: 1;
    }
    .upload-btn {
      background-color: white;
      color: #1f2937;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 150ms;
    }
    .upload-btn:hover {
      background-color: #f3f4f6;
    }
    .upload-btn input {
      display: none;
    }
    .form-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .form-row {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .form-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
    }
    .form-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
    }
    .form-input:focus {
      outline: none;
      border-color: #8b5cf6;
      box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
    }
    textarea.form-input {
      resize: none;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }
    .checkbox-label input {
      width: 1rem;
      height: 1rem;
    }
    .rating-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .stars {
      display: flex;
      font-size: 1.25rem;
    }
    .stars span {
      cursor: pointer;
      color: #d1d5db;
    }
    .stars span.filled {
      color: #fbbf24;
    }
    .rating-value {
      font-size: 0.875rem;
      color: #6b7280;
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      padding: 1.5rem;
      border-top: 1px solid #e5e7eb;
    }
    .cancel-btn {
      padding: 0.5rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      color: #4b5563;
      transition: background-color 150ms;
    }
    .cancel-btn:hover {
      background-color: #f9fafb;
    }
    .save-btn {
      padding: 0.5rem 1rem;
      background-color: #8b5cf6;
      color: white;
      border-radius: 0.5rem;
      transition: background-color 150ms;
    }
    .save-btn:hover {
      background-color: #7c3aed;
    }
    .materials-list {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .material-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .remove-material-btn {
      color: #ef4444;
      transition: color 150ms;
    }
    .remove-material-btn:hover {
      color: #dc2626;
    }
    .add-material-btn {
      color: #10b981;
      transition: color 150ms;
    }
    .add-material-btn:hover {
      color: #059669;
    }
  `]
})
export class ProductModalComponent implements OnInit {
  @Input() product!: Product;
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<Product>();

  selectedDeliveryType: string = 'standard';
  currentPrice: number = 0;
  currentDays: number = 0;
  materials: string[] = [];

  ngOnInit() {
    if (this.product) {
      this.updateDeliveryPrice(this.selectedDeliveryType);
      this.materials = this.product.materials.map((m: any) => m.name);
    }
  }

  updateDeliveryPrice(type: string) {
    if (this.product?.delivery) {
      const delivery = this.product.delivery.find((d: any) => d.type === type);
      if (delivery) {
        this.currentPrice = delivery.price;
        this.currentDays = delivery.day;
      }
    }
  }

  onDeliveryTypeChange(type: string) {
    this.selectedDeliveryType = type;
    this.updateDeliveryPrice(type);
  }

  validatePrice(value: number | string) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    this.product.price = value < 0 ? 0 : value;
  }

  validatePricePerMeter(value: number | string) {
    if (typeof value === 'string') {
      value = parseFloat(value);
    }
    this.product.pricePerMeter = value < 0 ? 0 : value;
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.product.images = [e.target.result as string];
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal.emit();
    }
  }

  onSave(): void {
    this.saveProduct.emit(this.product);
  }

  addMaterial(): void {
    this.product.materials.push({
      id: Math.floor(Math.random() * 1000),
      type: '',
      name: '',
      image: '',
      pricePerMeter: 0
    });
  }

  removeMaterial(index: number): void {
    this.product.materials.splice(index, 1);
  }
}
