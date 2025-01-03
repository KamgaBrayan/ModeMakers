import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsCardComponent } from './components/dashboard/stats-card/stats-card.component';
import { StatsChartComponent } from './components/dashboard/stats-chart/stats-chart.component';
import { SalesByLocationComponent } from './components/dashboard/sales-by-location/sales-by-location.component';
import { RecentOrdersComponent } from './components/dashboard/recent-orders/recent-orders.component';
import { TopSellingModelsComponent } from './components/dashboard/top-selling-models/top-selling-models.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    StatsCardComponent,
    StatsChartComponent,
    SalesByLocationComponent,
    RecentOrdersComponent,
    TopSellingModelsComponent,
    SidebarComponent
  ],
  exports: [
    StatsCardComponent,
    StatsChartComponent,
    SalesByLocationComponent,
    RecentOrdersComponent,
    TopSellingModelsComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
