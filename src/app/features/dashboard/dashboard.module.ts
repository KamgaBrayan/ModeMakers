import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import {StatsChartComponent} from '../../shared/components/dashboard/stats-chart/stats-chart.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardComponent
  ],
  declarations: [StatsChartComponent],
  exports: [StatsChartComponent]
})
export class DashboardModule { }
