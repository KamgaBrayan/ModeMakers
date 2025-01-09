import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-sales-by-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sales-by-location">
      <div class="header">
        <h3 class="title">Sales by Location</h3>
        <div class="filters">
          <button class="filter-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      <div class="sales-list" *ngIf="!loading; else loadingTemplate">
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

      <ng-template #loadingTemplate>
        <div class="loading">Loading sales data...</div>
      </ng-template>

      <div class="error-message" *ngIf="error">{{error}}</div>
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

    .loading {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .error-message {
      text-align: center;
      padding: 1rem;
      color: #dc2626;
      background: #fee2e2;
      border-radius: 0.375rem;
      margin-top: 1rem;
    }
  `]
})
export class SalesByLocationComponent implements OnInit {
  salesByLocation: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadSalesByLocation();
  }

  loadSalesByLocation() {
    this.loading = true;
    this.dashboardService.getSalesByLocation().subscribe({
      next: (data) => {
        this.salesByLocation = data;
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
