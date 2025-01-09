import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StylistService } from '../../core/services/stylist.service';
import { Stylist } from '../../shared/models/stylist.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Profile Header -->
        <div class="relative h-48 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div class="absolute -bottom-16 left-8">
            <div class="relative group">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white">
                <img [src]="getProfilePhoto()"
                     [alt]="profileForm.get('name')?.value"
                     class="w-full h-full object-cover">
                <div class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label class="cursor-pointer">
                    <input type="file" 
                           (change)="onImageChange($event)"
                           class="hidden"
                           accept="image/*">
                    <i class="bi bi-camera text-white text-2xl"></i>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="pt-20 px-8 pb-8">
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
            <!-- Basic Info Section -->
            <div class="mb-8">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-800">Basic Information</h2>
                <button type="submit" 
                        [disabled]="!profileForm.valid || !profileForm.dirty"
                        class="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg
                               hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 transition-all">
                  Save Changes
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input type="text" 
                         formControlName="name"
                         class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" 
                         formControlName="phone"
                         class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input type="text" 
                         formControlName="localisation"
                         class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                  <input type="text" 
                         formControlName="experience"
                         class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                </div>
              </div>
            </div>

            <!-- Biography Section -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Biography</h2>
              <textarea formControlName="biography"
                        rows="4"
                        class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
            </div>

            <!-- Categories Section -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Categories</h2>
              <div class="flex flex-wrap gap-4">
                <div *ngFor="let cat of availableCategories" 
                     class="flex items-center">
                  <input type="checkbox"
                         [checked]="isSelectedCategory(cat)"
                         (change)="toggleCategory(cat)"
                         class="form-checkbox text-purple-600 rounded">
                  <span class="ml-2">{{cat}}</span>
                </div>
              </div>
            </div>

            <!-- Specialty Section -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-6">Specialty</h2>
              <textarea formControlName="specialty"
                        rows="3"
                        class="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  `
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  availableCategories = ['Men', 'Women', 'Children', 'Accessories', 'Traditional', 'Modern'];
  selectedCategories: string[] = [];
  selectedImage: File | null = null;

  constructor(
    private fb: FormBuilder,
    private stylistService: StylistService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      localisation: ['', Validators.required],
      experience: [''],
      biography: [''],
      specialty: [''],
      category: [[]]
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.stylistService.getCurrentUser().subscribe({
      next: (stylist: Stylist) => {
        this.profileForm.patchValue({
          name: stylist.name,
          phone: stylist.phone,
          localisation: stylist.localisation,
          experience: stylist.experience,
          biography: stylist.biography,
          specialty: stylist.specialty
        });
        this.selectedCategories = stylist.category || [];
      },
      error: (error: Error) => {
        console.error('Error loading profile:', error);
      }
    });
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const formData = {
        ...this.profileForm.value,
        category: this.selectedCategories
      };
      
      this.stylistService.updateProfile(formData).subscribe({
        next: () => {
          // Show success message
          console.log('Profile updated successfully');
        },
        error: (error: Error) => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  getProfilePhoto(): string {
    return 'assets/p2.jpg'; // Replace with actual profile photo logic
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      // Handle image upload logic here
    }
  }

  isSelectedCategory(category: string): boolean {
    return this.selectedCategories.includes(category);
  }

  toggleCategory(category: string) {
    const index = this.selectedCategories.indexOf(category);
    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }
}
