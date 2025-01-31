import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../shared/models/product.model';

@Component({
  selector: 'app-add-product-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full modal-overlay flex items-center justify-center z-50" *ngIf="isVisible" (click)="onBackdropClick($event)">
      <div class="relative mx-auto p-6 border shadow-lg rounded-lg bg-white modal-container my-8 z-50">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-medium leading-6 text-gray-900">Add New Model</h3>
            <button
              (click)="onClose()"
              class="text-gray-500 hover:text-gray-700">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form (ngSubmit)="onSubmit()" #productForm="ngForm" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-6">
              <!-- Image Upload Section -->
              <div class="image-section">
                <div class="current-image">
                  <div *ngIf="!newProduct.images.length" class="upload-placeholder">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p class="mt-2 text-sm text-gray-600">Click to upload product image</p>
                  </div>
                  <div *ngIf="newProduct.images.length" class="flex flex-wrap gap-2 mb-2">
                    <div *ngFor="let image of newProduct.images" class="relative w-24 h-24">
                      <img [src]="image" class="w-full h-full object-cover rounded-lg">
                      <button
                        (click)="newProduct.images.splice(newProduct.images.indexOf(image), 1)"
                        class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >×</button>
                    </div>
                  </div>
                  <div class="image-overlay">
                    <label class="upload-btn">
                      <input type="file" (change)="onImageChange($event)" accept="image/*" class="hidden">
                      {{ newProduct.images.length ? 'Change Image' : 'Upload Image' }}
                    </label>
                  </div>
                </div>
              </div>

              <!-- Basic Information -->
              <div class="basic-info">
                <div class="form-group">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    [(ngModel)]="newProduct.name"
                    name="name"
                    required
                    class="form-input">
                </div>

                <div class="form-group">
                  <label class="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea
                    [(ngModel)]="newProduct.description"
                    name="description"
                    required
                    class="form-input h-24"></textarea>
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-6">
              <!-- Product Details -->
              <div class="product-details">
                <div class="form-row">
                  <div class="form-group">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Gender</label>
                    <select [(ngModel)]="newProduct.gender" name="gender" required class="form-input">
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="unisex">Unisex</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Age Range</label>
                    <select [(ngModel)]="newProduct.age" name="age" required class="form-input">
                      <option value="">Select age range</option>
                      <option value="child">Child</option>
                      <option value="teen">Teen</option>
                      <option value="adult">Adult</option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select [(ngModel)]="newProduct.category" name="category" required class="form-input">
                      <option value="">Select category</option>
                      <option value="casual">Casual</option>
                      <option value="formal">Formal</option>
                      <option value="sport">Sport</option>
                      <option value="traditional">Traditional</option>
                    </select>
                  </div>

                  <div class="form-group">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Color</label>
                    <input
                      type="text"
                      [(ngModel)]="newProduct.color"
                      name="color"
                      required
                      class="form-input">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Price (XAF)</label>
                    <div class="price-input-container">

                      <input
                        type="number"
                        [(ngModel)]="newProduct.price"
                        name="price"
                        required
                        class="form-input pl-8"
                        (ngModelChange)="validatePrice($event)">
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Price per Meter (XAF)</label>
                    <div class="price-input-container">

                      <input
                        type="number"
                        [(ngModel)]="newProduct.pricePerMeter"
                        name="pricePerMeter"
                        required
                        class="form-input pl-8">
                    </div>
                  </div>
                </div>

                <!-- Delivery Options -->
                <div class="delivery-options mt-6">
                  <h4 class="text-lg font-medium text-gray-700 mb-3">Delivery Options</h4>
                  <div class="space-y-4">
                    <!-- Standard Delivery -->
                    <div class="delivery-option p-4 border rounded-lg bg-white">
                      <h5 class="font-medium text-gray-700 mb-3">Standard Delivery</h5>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Days</label>
                          <input
                            type="number"
                            [(ngModel)]="standardDays"
                            name="standardDays"
                            placeholder="Number of days"
                            class="form-input"
                            (ngModelChange)="updateDuration()">
                        </div>
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Price (XAF)</label>
                          <div class="price-input-container">

                            <input
                              type="number"
                              [(ngModel)]="standardPrice"
                              name="standardPrice"
                              placeholder="Price"
                              class="form-input pl-8"
                              (ngModelChange)="updateDuration()">
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Fast Delivery -->
                    <div class="delivery-option p-4 border rounded-lg bg-white">
                      <h5 class="font-medium text-gray-700 mb-3">Advanced Delivery</h5>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Days</label>
                          <input
                            type="number"
                            [(ngModel)]="fastDays"
                            name="fastDays"
                            placeholder="Number of days"
                            class="form-input"
                            (ngModelChange)="updateDuration()">
                        </div>
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Price (XAF)</label>
                          <div class="price-input-container">

                            <input
                              type="number"
                              [(ngModel)]="fastPrice"
                              name="fastPrice"
                              placeholder="Price"
                              class="form-input pl-8"
                              (ngModelChange)="updateDuration()">
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Express Delivery -->
                    <div class="delivery-option p-4 border rounded-lg bg-white">
                      <h5 class="font-medium text-gray-700 mb-3">Express Delivery</h5>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Days</label>
                          <input
                            type="number"
                            [(ngModel)]="expressDays"
                            name="expressDays"
                            placeholder="Number of days"
                            class="form-input"
                            (ngModelChange)="updateDuration()">
                        </div>
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Price (XAF)</label>
                          <div class="price-input-container">

                            <input
                              type="number"
                              [(ngModel)]="expressPrice"
                              name="expressPrice"
                              placeholder="Price"
                              class="form-input pl-8"
                              (ngModelChange)="updateDuration()">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Materials Section -->
                <div class="materials mt-6">
                  <h4 class="text-lg font-medium text-gray-700 mb-3">Materials</h4>
                  <div class="space-y-4">
                    <div *ngFor="let material of materials; let i = index" class="material-item p-4 border rounded-lg bg-white">
                      <div class="flex justify-between items-center mb-2">
                        <h5 class="font-medium text-gray-700">Material {{i + 1}}</h5>
                        <button *ngIf="i > 0" type="button" (click)="removeMaterial(i)" class="text-red-500 hover:text-red-700">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div class="space-y-4">
                        <!-- Material Name -->
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                          <input
                            type="text"
                            [(ngModel)]="material.name"
                            [name]="'materialName' + i"
                            placeholder="Material name"
                            class="form-input">
                        </div>

                        <!-- Material Type -->
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Type</label>
                          <select
                            [(ngModel)]="material.type"
                            [name]="'materialType' + i"
                            class="form-input">
                            <option value="">Select type</option>
                            <option value="cotton">Cotton</option>
                            <option value="silk">Silk</option>
                            <option value="wool">Wool</option>
                            <option value="polyester">Polyester</option>
                            <option value="linen">Linen</option>
                            <option value="leather">Leather</option>
                            <option value="denim">Denim</option>
                          </select>
                        </div>

                        <!-- Material Color -->
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Color</label>
                          <input
                            type="text"
                            [(ngModel)]="material.color"
                            [name]="'materialColor' + i"
                            placeholder="Material color"
                            class="form-input">
                        </div>

                        <!-- Material Price -->
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Price per Meter (XAF)</label>
                          <div class="price-input-container">

                            <input
                              type="number"
                              [(ngModel)]="material.pricePerMeter"
                              [name]="'materialPrice' + i"
                              placeholder="Price per meter"
                              class="form-input pl-8"
                              (ngModelChange)="validateMaterialPrice($event, i)">
                          </div>
                        </div>

                        <!-- Material Images -->
                        <div>
                          <label class="block text-gray-700 text-sm font-bold mb-2">Images</label>
                          <div class="flex flex-wrap gap-2 mb-2">
                            <div *ngFor="let image of material.images" class="relative w-24 h-24">
                              <img [src]="image" class="w-full h-full object-cover rounded-lg">
                              <button
                                (click)="material.images.splice(material.images.indexOf(image), 1)"
                                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                              >×</button>
                            </div>
                          </div>
                          <input
                            type="file"
                            multiple
                            (change)="onMaterialImageSelect($event, i)"
                            accept="image/*"
                            class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#3734A9] file:text-white hover:file:bg-[#2d2a87]"
                          >
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      (click)="addMaterial()"
                      *ngIf="materials.length < 5"
                      class="w-full py-2 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 flex items-center justify-center"
                    >
                      <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Add Material
                    </button>
                  </div>
                </div>

                <!-- Availability Checkbox -->
                <div class="mb-6 mt-5">
                  <label class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      [(ngModel)]="newProduct.availability"
                      class="form-checkbox h-4 w-4 text-[#3734A9] rounded focus:ring-[#3734A9]"
                    >
                    <span class="text-sm font-medium text-gray-700">Available</span>
                  </label>
                </div>
              </div>
            </div>
          </form>

          <!-- Form Actions -->
          <div class="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              (click)="onClose()"
              class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              (click)="onSubmit()"
              [disabled]="!productForm.form.valid"
              class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
            >
              Create Model
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      @apply z-[1000];
    }

    .modal-container {
      @apply w-[95%] max-w-5xl max-h-[90vh] overflow-y-auto z-[1001];
    }

    .form-input {
      @apply shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500;
    }

    .form-row {
      @apply grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4;
    }

    form {
      @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
    }

    @media (max-width: 1024px) {
      .modal-container {
        @apply w-[95%] max-w-2xl;
      }
    }

    @media (max-width: 640px) {
      .modal-container {
        @apply w-[95%] max-w-xl my-4;
      }
    }

    .form-group {
      @apply mb-4;
    }

    .image-section {
      @apply mb-6;
    }

    .current-image {
      @apply relative border-2 border-dashed border-gray-300 rounded-lg overflow-hidden h-64;
    }

    .upload-placeholder {
      @apply h-full flex flex-col items-center justify-center p-8 text-center;
    }

    .product-image {
      @apply w-full h-full object-cover;
    }

    .image-overlay {
      @apply absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200;
    }

    .upload-btn {
      @apply bg-white text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100;
    }

    .price-input-container {
      @apply relative;
    }

    .currency-symbol {
      @apply absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500;

    }

    .material-item {
      @apply bg-gray-50;
    }

    .material-image-upload {
      @apply relative;
    }

    .upload-placeholder-small {
      @apply h-24 flex flex-col items-center justify-center p-4 text-center;
    }

    .material-preview {
      @apply w-full h-24 object-cover;
    }

    .material-image-overlay {
      @apply absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200;
    }

    .upload-btn-small {
      @apply bg-white text-gray-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-100;
    }
  `]
})
export class AddProductModalComponent {
  @Input() isVisible = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveProduct = new EventEmitter<Product>();

  standardDays = 14;
  standardPrice = 0;
  fastDays = 7;
  fastPrice = 0;
  expressDays = 3;
  expressPrice = 0;

  materials: any[] = [{
    name: '',
    type: '',
    color: '',
    pricePerMeter: 0,
    images: []
  }];

  newProduct: Product = {
    id: 0,
    name: '',
    gender: '',
    age: '',
    category: '',
    description: '',
    price: 0,
    pricePerMeter: 0,
    duration: '',
    color: '',
    availability: true,
    meanEvaluation: 0,
    note: 0,
    images: [],
    delivery: [{
      id: 0,
      day: 0,
      price: 0,
      type: '',
    }],
    stylist: {
      id: 0,
      name: '',
      image: ''
    },
    materials: []
  };

  onClose(): void {
    this.closeModal.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal.emit();
    }
  }

  onImageChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.images = [e.target.result];
      };
      reader.readAsDataURL(file);
    }
  }

  onMaterialImageSelect(event: any, index: number): void {
    const files = event.target.files;
    if (files) {
      if (!this.materials[index].images) {
        this.materials[index].images = [];
      }
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.materials[index].images.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  validatePrice(value: number): void {
    if (value < 0) {
      this.newProduct.price = 0;
    }
  }

  validateMaterialPrice(value: number, index: number): void {
    if (value < 0) {
      this.materials[index].pricePerMeter = 0;
    }
  }

  updateDuration(): void {
    this.newProduct.duration = JSON.stringify({
      standard: { days: this.standardDays, price: this.standardPrice },
      fast: { days: this.fastDays, price: this.fastPrice },
      express: { days: this.expressDays, price: this.expressPrice }
    });
  }

  onSubmit(): void {
    if (this.newProduct) {
      this.updateDuration();
      this.newProduct.materials = [...this.materials];
      this.saveProduct.emit(this.newProduct);
      this.closeModal.emit();

      // Reset the form
      this.materials = [{
        name: '',
        type: '',
        color: '',
        pricePerMeter: 0,
        images: []
      }];

      // Reset delivery options
      this.standardDays = 14;
      this.standardPrice = 0;
      this.fastDays = 7;
      this.fastPrice = 0;
      this.expressDays = 3;
      this.expressPrice = 0;

      this.newProduct = {
        id: 0,
        name: '',
        gender: '',
        age: '',
        category: '',
        description: '',
        price: 0,
        pricePerMeter: 0,
        duration: '',
        color: '',
        availability: true,
        meanEvaluation: 0,
        note: 0,
        images: [],
        delivery: [{
          id: 0,
          day: 0,
          price: 0,
          type: '',
        }],
        stylist: {
          id: 0,
          name: '',
          image: ''
        },
        materials: []
      };
    }
  }

  addMaterial(): void {
    if (this.materials.length < 5) {
      this.materials.push({
        name: '',
        type: '',
        color: '',
        pricePerMeter: 0,
        images: []
      });
    }
  }

  removeMaterial(index: number): void {
    this.materials.splice(index, 1);
  }
}
