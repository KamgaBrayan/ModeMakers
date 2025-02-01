import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js/auto';
import { OrderService } from '../../../../core/service/order.service';
import { ApiResponse } from '../../../../shared/interfaces/apiRequest.interface';

interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  completionRate: number;
  monthlyStats: Array<{
    month: string;
    revenue: number;
    orders: number;
  }>;
}

interface OrderStatsResponse {
  data: OrderStats;
  success: boolean;
  message: string;
}

@Component({
  selector: 'app-stats-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold">Statistics</h3>
        <div class="flex items-center space-x-2">
          <span class="flex items-center">
            <span class="w-3 h-3 rounded-full bg-purple-500 mr-1"></span>
            <span class="text-sm text-gray-600">Revenue</span>
          </span>
          <span class="flex items-center">
            <span class="w-3 h-3 rounded-full bg-orange-500 mr-1"></span>
            <span class="text-sm text-gray-600">Orders</span>
          </span>
        </div>
      </div>
      <div *ngIf="loading" class="flex justify-center items-center h-64">
        <div class="text-gray-500">Loading statistics...</div>
      </div>
      <div *ngIf="error" class="text-red-500 text-center p-4">{{ error }}</div>
      <canvas *ngIf="!loading && !error" id="statsChart"></canvas>
    </div>
  `
})
export class StatsChartComponent implements AfterViewInit, OnInit {
  loading = true;
  error: string | null = null;
  private chart: Chart | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    //this.loadStatistics();
  }

  ngAfterViewInit() {
    // Chart will be created after data is loaded
  }
/*
  loadStatistics() {
    this.loading = true;
    this.orderService.getOrderStats().subscribe({
      next: (response: OrderStatsResponse) => {
        if (response.success) {
          this.createChart(response.data);
        } else {
          this.error = response.message || 'Error loading statistics';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error loading statistics';
        this.loading = false;
        console.error('Error:', error);
      }
    });
  }
*/

  createChart(data: OrderStats) {
    if (typeof window !== 'undefined') {
      const ctx = document.getElementById('statsChart') as HTMLCanvasElement;
      if (this.chart) {
        this.chart.destroy();
      }

      const months = data.monthlyStats.map(stat => stat.month);
      const revenue = data.monthlyStats.map(stat => stat.revenue);
      const orders = data.monthlyStats.map(stat => stat.orders);

      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: months,
          datasets: [
            {
              label: 'Revenue',
              data: revenue,
              borderColor: 'rgb(147, 51, 234)',
              tension: 0.4,
              fill: false
            },
            {
              label: 'Orders',
              data: orders,
              borderColor: 'rgb(249, 115, 22)',
              tension: 0.4,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }
      });
    }
  }
}