import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrecommandsService } from '../../core/services/precommands.service';
import { Precommand } from '../../shared/models/precommand.model';

@Component({
  selector: 'app-precommands',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">Pre-Orders</h2>
      </div>

      <!-- Status Filters -->
      <div class="flex gap-4 mb-6">
        <button class="px-4 py-2 rounded-lg"
                [ngClass]="{'bg-[#3734A9] text-white': selectedStatus === 'all', 'text-gray-600 hover:bg-gray-100': selectedStatus !== 'all'}"
                (click)="filterByStatus('all')">
          All ({{precommands.length}})
        </button>
        <button class="px-4 py-2 rounded-lg"
                [ngClass]="{'bg-[#3734A9] text-white': selectedStatus === 'pending', 'text-gray-600 hover:bg-gray-100': selectedStatus !== 'pending'}"
                (click)="filterByStatus('pending')">
          Pending ({{getStatusCount('pending')}})
        </button>
        <button class="px-4 py-2 rounded-lg"
                [ngClass]="{'bg-[#3734A9] text-white': selectedStatus === 'reviewed', 'text-gray-600 hover:bg-gray-100': selectedStatus !== 'reviewed'}"
                (click)="filterByStatus('reviewed')">
          In Progress ({{getStatusCount('reviewed')}})
        </button>
        <button class="px-4 py-2 rounded-lg"
                [ngClass]="{'bg-[#3734A9] text-white': selectedStatus === 'confirmed', 'text-gray-600 hover:bg-gray-100': selectedStatus !== 'confirmed'}"
                (click)="filterByStatus('confirmed')">
          Confirmed ({{getStatusCount('confirmed')}})
        </button>
      </div>

      <!-- Precommands Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div *ngFor="let precommand of filteredPrecommands" 
             class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{precommand.productName}}</h3>
              <p class="text-sm text-gray-600">By {{precommand.customerName}}</p>
            </div>
            <span [ngClass]="getStatusClass(precommand.status)">
              {{precommand.status | titlecase}}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="flex items-center gap-2">
              <i class="bi bi-tag text-gray-400"></i>
              <span class="text-sm text-gray-600">Category</span>
              <span>{{precommand.category}}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="bi bi-person text-gray-400"></i>
              <span class="text-sm text-gray-600">Gender</span>
              <span>{{precommand.gender | titlecase}}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="bi bi-people text-gray-400"></i>
              <span class="text-sm text-gray-600">Age Range</span>
              <span>{{precommand.ageRange}}</span>
            </div>
            <div class="flex items-center gap-2">
              <i class="bi bi-calendar text-gray-400"></i>
              <span class="text-sm text-gray-600">Date</span>
              <span>{{formatDate(precommand.submittedAt)}}</span>
            </div>
          </div>

          <p class="mt-4 text-sm text-gray-700">{{precommand.description}}</p>
          
          <div class="mt-2 text-sm text-gray-600">
            <p class="font-medium">Specifications:</p>
            <p class="mt-1">{{precommand.specifications}}</p>
          </div>

          <div class="flex justify-between items-center mb-2">
            <p class="text-sm text-gray-600">Prix proposé</p>
            <p class="font-medium text-gray-900">
              <span class="text-gray-500 mr-1">FCFA</span>
              {{(precommand.proposedPrice !== undefined ? precommand.proposedPrice : 0) | number:'1.0-0'}}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-600">Prix final</p>
            <p class="font-medium text-gray-900">
              <span class="text-gray-500 mr-1">FCFA</span>
              {{(precommand.finalPrice !== undefined ? precommand.finalPrice : 0) | number:'1.0-0'}}
            </p>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <span *ngFor="let material of precommand.materials" 
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
              {{material}}
            </span>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button (click)="viewDetails(precommand.id)"
                    class="px-4 py-2 bg-[#3734A9] text-white rounded-lg hover:bg-[#2d2b8a] transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PrecommandsComponent implements OnInit {
  precommands: Precommand[] = [];
  filteredPrecommands: Precommand[] = [];
  selectedStatus: string = 'all';
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private precommandsService: PrecommandsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPrecommands();
  }

  loadPrecommands() {
    this.loading = true;
    this.precommandsService.getAllPrecommands().subscribe({
      next: (data) => {
        this.precommands = data;
        this.filterByStatus(this.selectedStatus);
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading precommands';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  filterByStatus(status: string) {
    this.selectedStatus = status;
    if (status === 'all') {
      this.filteredPrecommands = this.precommands;
    } else {
      this.filteredPrecommands = this.precommands.filter(p => p.status === status);
    }
  }

  getStatusCount(status: string): number {
    return this.precommands.filter(p => p.status === status).length;
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-3 py-1 rounded-full text-sm font-medium';
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'reviewed':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'confirmed':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return baseClasses;
    }
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/precommands', id]);
  }
}
