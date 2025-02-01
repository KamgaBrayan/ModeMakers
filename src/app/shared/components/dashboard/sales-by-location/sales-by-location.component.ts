import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../core/service/product.service';
import { ApiResponse } from '../../../../shared/interfaces/apiRequest.interface';

interface LocationSales {
  location: string;
  sales: number;
  percentage: number;
}

@Component({
  selector: 'app-sales-by-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            Sales by Location
          </h3>
          <div class="flex items-center space-x-2">
            <button class="text-sm text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300">
              View all
            </button>
          </div>
        </div>

        <div *ngIf="loading" class="flex justify-center items-center py-8">
          <div class="text-gray-500">Loading sales data...</div>
        </div>

        <div *ngIf="error" class="text-red-500 text-center py-4">{{ error }}</div>

        <div *ngIf="!loading && !error" class="flow-root">
          <div class="sales-list">
            <div class="location-item" *ngFor="let location of salesByLocation">
              <div class="location-info">
                <div class="location-name">{{location.location}}</div>
                <div class="location-sales">{{location.sales | number}} sales</div>
              </div>
              <div class="progress-bar">
                <div class="progress" [style.width.%]="location.percentage"></div>
              </div>
              <div class="percentage">{{location.percentage}}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .sales-by-location {
      background: white;
      border-radius: 0.5rem;
      padding: 1.5rem;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }

    .title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a1a1a;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: #f3f4f6;
      border: none;
      border-radius: 0.375rem;
      color: #4b5563;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .filter-btn:hover {
      background: #e5e7eb;
    }

    .sales-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }

    .location-item {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .location-info {
      width: 150px;
    }

    .location-name {
      font-weight: 500;
      color: #1f2937;
    }

    .location-sales {
      font-size: 0.875rem;
      color: #6b7280;
    }

    .progress-bar {
      flex: 1;
      height: 0.5rem;
      background: #f3f4f6;
      border-radius: 9999px;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      background: #6366f1;
      border-radius: 9999px;
      transition: width 0.3s ease;
    }

    .percentage {
      width: 48px;
      font-size: 0.875rem;
      font-weight: 500;
      color: #1f2937;
      text-align: right;
    }
  `]
})
export class SalesByLocationComponent implements OnInit {
  salesByLocation: LocationSales[] = [];
  loading = true;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadSalesByLocation();
  }

  loadSalesByLocation() {
    this.loading = true;
    this.productService.getSalesByLocation().subscribe({
      next: (response: ApiResponse<LocationSales[]>) => {
        if (response.success) {
          this.salesByLocation = response.data;
        } else {
          this.error = response.message || 'Error loading sales by location';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading sales by location';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
}
