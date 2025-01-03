import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar.component';
import { TopSellingModelsComponent } from '../../shared/components/dashboard/top-selling-models/top-selling-models.component';
import { RecentOrdersComponent } from '../../shared/components/dashboard/recent-orders/recent-orders.component';
import { CircularProgressComponent } from '../../shared/components/dashboard/circular-progress/circular-progress.component';
import { StatsChartComponent } from '../../shared/components/dashboard/stats-chart/stats-chart.component';
import { SalesByLocationComponent } from '../../shared/components/dashboard/sales-by-location/sales-by-location.component';
import { TopSellingModel } from '../../shared/models/top-selling-model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopSellingModelsComponent,
    RecentOrdersComponent,
    CircularProgressComponent,
    StatsChartComponent,
    SalesByLocationComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sidebarExpanded = true;
  salesProgress = 75.5;
  totalRevenue = 75500;
  totalSales = 31500;
  totalModels = 247;
  balance = 24500;

  topSellingModels: TopSellingModel[] = [
    {
      id: 1,
      name: 'Handmade Pouch',
      description: 'Beautiful handmade pouch',
      sales: 401,
      amount: 84811,
      price: 123.00,
      status: 'Low Stock',
      image: 'images/products/pouch.jpg',
      stock: 5,
      category: 'Accessories',
      sku: 'SKU-001',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Smartwatch E2',
      description: 'Latest smartwatch model',
      sales: 301,
      amount: 177000,
      price: 590.00,
      status: 'Published',
      image: 'images/products/smartwatch.jpg',
      stock: 15,
      category: 'Electronics',
      sku: 'SKU-002',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      name: 'Smartwatch E1',
      description: 'Classic smartwatch model',
      sales: 300,
      amount: 37500,
      price: 125.00,
      status: 'Low Stock',
      image: 'images/products/smartwatch2.jpg',
      stock: 3,
      category: 'Electronics',
      sku: 'SKU-003',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 4,
      name: 'Headphone G1 Pro',
      description: 'Professional headphones',
      sales: 298,
      amount: 103704,
      price: 348.00,
      status: 'Published',
      image: 'images/products/headphone.jpg',
      stock: 20,
      category: 'Electronics',
      sku: 'SKU-004',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 5,
      name: 'iPhone X',
      description: 'Latest iPhone model',
      sales: 256,
      amount: 155000,
      price: 607.00,
      status: 'Published',
      image: 'images/products/iphone.jpg',
      stock: 12,
      category: 'Electronics',
      sku: 'SKU-005',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSidebarStateChange(expanded: boolean): void {
    this.sidebarExpanded = expanded;
  }
}
