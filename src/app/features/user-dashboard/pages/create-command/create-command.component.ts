import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-command',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Create Custom Order</h1>

      <form [formGroup]="commandForm" (ngSubmit)="onSubmit()" class="space-y-6">
        <!-- Basic Information -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">Basic Information</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select formControlName="productType" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#3734A9] focus:border-transparent">
                <option value="">Select a product type</option>
                <option value="dress">Dress</option>
                <option value="suit">Suit</option>
                <option value="pantsuit">Pantsuit</option>
                <option value="shirt">Shirt</option>
                <option value="pants">Pants</option>
                <option value="skirt">Skirt</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select formControlName="category" 
                      class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#3734A9] focus:border-transparent">
                <option value="">Select a category</option>
                <option value="casual">Casual</option>
                <option value="formal">Formal</option>
                <option value="wedding">Wedding</option>
                <option value="business">Business</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Design Specifications -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">Design Specifications</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea formControlName="description" 
                        rows="4"
                        placeholder="Describe your desired design..."
                        class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-[#3734A9] focus:border-transparent"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Preferred Materials</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div *ngFor="let material of availableMaterials" class="flex items-center">
                  <input type="checkbox" 
                         [value]="material"
                         (change)="onMaterialChange($event)"
                         class="rounded border-gray-300 text-[#3734A9] focus:ring-[#3734A9]">
                  <label class="ml-2 text-sm text-gray-700">{{material}}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reference Images -->
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">Reference Images</h2>
          <div class="space-y-4">
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" 
                     multiple
                     accept="image/*"
                     class="hidden"
                     #fileInput
                     (change)="onFileSelected($event)">
              <button type="button" 
                      (click)="fileInput.click()"
                      class="px-4 py-2 text-sm font-medium text-[#3734A9] hover:bg-[#3734A9]/10 rounded-lg transition-colors">
                Upload Images
              </button>
              <p class="mt-2 text-sm text-gray-600">or drag and drop your images here</p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4" *ngIf="selectedFiles.length">
              <div *ngFor="let file of selectedFiles" class="relative">
                <img [src]="file.preview" class="w-full h-32 object-cover rounded-lg">
                <button type="button"
                        (click)="removeFile(file)"
                        class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button type="submit" 
                  [disabled]="!commandForm.valid"
                  class="px-6 py-3 bg-[#3734A9] text-white rounded-lg hover:bg-[#2d2a87] transition-colors disabled:opacity-50">
            Submit Custom Order
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CreateCommandComponent {
  commandForm: FormGroup;
  selectedFiles: Array<{file: File, preview: string}> = [];
  availableMaterials = [
    'Cotton', 'Silk', 'Wool', 'Linen', 'Polyester', 'Lace',
    'Velvet', 'Satin', 'Denim', 'Leather', 'Chiffon', 'Cashmere'
  ];

  constructor(private fb: FormBuilder) {
    this.commandForm = this.fb.group({
      productType: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(20)]],
      materials: [[]],
    });
  }

  onMaterialChange(event: any) {
    const materials = this.commandForm.get('materials')?.value || [];
    if (event.target.checked) {
      materials.push(event.target.value);
    } else {
      const index = materials.indexOf(event.target.value);
      if (index > -1) {
        materials.splice(index, 1);
      }
    }
    this.commandForm.patchValue({ materials });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file: any) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.selectedFiles.push({
              file,
              preview: e.target.result
            });
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  removeFile(fileToRemove: {file: File, preview: string}) {
    this.selectedFiles = this.selectedFiles.filter(f => f !== fileToRemove);
  }

  onSubmit() {
    if (this.commandForm.valid) {
      const formData = new FormData();
      Object.keys(this.commandForm.value).forEach(key => {
        formData.append(key, this.commandForm.value[key]);
      });
      this.selectedFiles.forEach(({file}) => {
        formData.append('images[]', file);
      });
      
      // TODO: Send the formData to your backend service
      console.log('Form submitted:', this.commandForm.value);
      console.log('Files:', this.selectedFiles);
    }
  }
}
