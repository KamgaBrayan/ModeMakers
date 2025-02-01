import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/service/product.service';
import { OrderService } from '../../core/service/order.service';
import { ApiResponse } from '../../shared/interfaces/apiRequest.interface';
import { TopSellingModelsComponent } from '../../shared/components/dashboard/top-selling-models/top-selling-models.component';
import { RecentOrdersComponent } from '../../shared/components/dashboard/recent-orders/recent-orders.component';
import { StatsChartComponent } from '../../shared/components/dashboard/stats-chart/stats-chart.component';
import { SalesByLocationComponent } from '../../shared/components/dashboard/sales-by-location/sales-by-location.component';

interface DashboardStats {
  totalRevenue: number;
  totalSales: number;
  totalModels: number;
  salesProgress: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    TopSellingModelsComponent,
    RecentOrdersComponent,
    StatsChartComponent,
    SalesByLocationComponent
  ],
  template: `
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Stats Cards -->
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900">Total Revenue</h3>
          <p class="text-3xl font-bold text-indigo-600">{{ stats.totalRevenue | number }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900">Total Sales</h3>
          <p class="text-3xl font-bold text-green-600">{{ stats.totalSales }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900">Total Models</h3>
          <p class="text-3xl font-bold text-blue-600">{{ stats.totalModels }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <h3 class="text-lg font-semibold text-gray-900">Sales Progress</h3>
          <p class="text-3xl font-bold text-purple-600">{{ stats.salesProgress }}%</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Charts and Tables -->
        <app-stats-chart></app-stats-chart>
        <app-top-selling-models></app-top-selling-models>
        <app-sales-by-location></app-sales-by-location>
        <app-recent-orders></app-recent-orders>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalRevenue: 0,
    totalSales: 0,
    totalModels: 0,
    salesProgress: 0
  };

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.productService.getDashboardStats().subscribe({
      next: (response: ApiResponse<DashboardStats>) => {
        if (response.success) {
          this.stats = response.data;
        } else {
          console.error('Error loading dashboard stats:', response.message);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}
