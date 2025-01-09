import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar.component';
import { TopSellingModelsComponent } from '../../shared/components/dashboard/top-selling-models/top-selling-models.component';
import { RecentOrdersComponent } from '../../shared/components/dashboard/recent-orders/recent-orders.component';
import { CircularProgressComponent } from '../../shared/components/dashboard/circular-progress/circular-progress.component';
import { StatsChartComponent } from '../../shared/components/dashboard/stats-chart/stats-chart.component';
import { SalesByLocationComponent } from '../../shared/components/dashboard/sales-by-location/sales-by-location.component';
import { DashboardService } from '../../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
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
  salesProgress = 0;
  totalRevenue = 0;
  totalSales = 0;
  totalModels = 0;
  loading = true;
  error: string | null = null;

  constructor(
    private dashboardService: DashboardService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.salesProgress = data.salesProgress;
        this.totalRevenue = data.totalRevenue;
        this.totalSales = data.totalSales;
        this.totalModels = data.totalModels;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading dashboard data';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }

  onSidebarStateChange(expanded: boolean): void {
    this.sidebarExpanded = expanded;
  }
}
