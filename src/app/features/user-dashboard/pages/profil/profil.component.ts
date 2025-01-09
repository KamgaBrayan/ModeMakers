import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StylistService } from '../../../../core/services/stylist.service';
import { Stylist } from '../../../../shared/models/stylist.model';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8" *ngIf="stylist">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <!-- Profile Header -->
        <div class="relative h-48 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div class="absolute -bottom-16 left-8">
            <div class="relative group">
              <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-white bg-white">
                <img [src]="stylist.photos[0] || 'assets/default-avatar.png'"
                     [alt]="stylist.name"
                     class="w-full h-full object-cover">
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Content -->
        <div class="pt-20 px-8 pb-8">
          <div class="mb-8">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-4">
                <h2 class="text-2xl font-bold text-gray-800" *ngIf="!isEditing">{{stylist.name}}</h2>
                <input *ngIf="isEditing" 
                       [(ngModel)]="editedStylist.name" 
                       class="text-2xl font-bold text-gray-800 border-b border-gray-300 focus:border-purple-500 focus:outline-none">
                <span class="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  {{stylist.roles.includes('ROLE_STYLIST') ? 'Stylist' : 'User'}}
                </span>
              </div>
              <button 
                (click)="toggleEdit()" 
                class="px-4 py-2 text-sm font-medium rounded-full"
                [ngClass]="{'bg-purple-600 text-white': !isEditing, 'bg-green-600 text-white': isEditing}">
                {{isEditing ? 'Save Changes' : 'Edit Profile'}}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <p *ngIf="!isEditing" class="text-gray-900">{{stylist.phone}}</p>
                <input *ngIf="isEditing" 
                       [(ngModel)]="editedStylist.phone"
                       class="w-full p-2 border rounded focus:border-purple-500 focus:outline-none">
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <p *ngIf="!isEditing" class="text-gray-900">{{stylist.localisation}}</p>
                <input *ngIf="isEditing" 
                       [(ngModel)]="editedStylist.localisation"
                       class="w-full p-2 border rounded focus:border-purple-500 focus:outline-none">
              </div>

              <div *ngIf="stylist.roles.includes('ROLE_STYLIST')">
                <label class="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                <p *ngIf="!isEditing" class="text-gray-900">{{stylist.experience}}</p>
                <input *ngIf="isEditing" 
                       [(ngModel)]="editedStylist.experience"
                       class="w-full p-2 border rounded focus:border-purple-500 focus:outline-none">
              </div>

              <div *ngIf="stylist.roles.includes('ROLE_STYLIST')">
                <label class="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <p *ngIf="!isEditing" class="text-gray-900">{{stylist.specialty}}</p>
                <input *ngIf="isEditing" 
                       [(ngModel)]="editedStylist.specialty"
                       class="w-full p-2 border rounded focus:border-purple-500 focus:outline-none">
              </div>
            </div>
          </div>

          <!-- Biography Section -->
          <div class="mb-8" *ngIf="stylist.roles.includes('ROLE_STYLIST')">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Biography</h2>
            <p *ngIf="!isEditing" class="text-gray-700">{{stylist.biography}}</p>
            <textarea *ngIf="isEditing" 
                     [(ngModel)]="editedStylist.biography"
                     class="w-full p-2 border rounded focus:border-purple-500 focus:outline-none"
                     rows="4"></textarea>
          </div>

          <!-- Categories Section -->
          <div class="mb-8" *ngIf="stylist.roles.includes('ROLE_STYLIST')">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Categories</h2>
            <div class="flex flex-wrap gap-2">
              <span *ngFor="let cat of stylist.category"
                    class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                {{cat}}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfilComponent implements OnInit {
  stylist!: Stylist;
  editedStylist!: Stylist;
  isEditing = false;

  constructor(private stylistService: StylistService) {}

  ngOnInit() {
    this.stylistService.getCurrentUser().subscribe(stylist => {
      this.stylist = stylist;
      this.editedStylist = { ...stylist };
    });
  }

  toggleEdit() {
    if (this.isEditing) {
      // Save changes
      this.stylistService.updateProfile(this.editedStylist).subscribe(
        updatedStylist => {
          this.stylist = updatedStylist;
          this.isEditing = false;
        }
      );
    } else {
      // Enter edit mode
      this.editedStylist = { ...this.stylist };
      this.isEditing = true;
    }
  }
}
