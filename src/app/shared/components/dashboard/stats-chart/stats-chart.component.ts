import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-stats-chart',
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
            <span class="text-sm text-gray-600">Sales</span>
          </span>
        </div>
      </div>
      <canvas id="statsChart"></canvas>
    </div>
  `
})
export class StatsChartComponent implements AfterViewInit {
  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    if (typeof window !== 'undefined') {
      const ctx = document.getElementById('statsChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Revenue',
              data: [1000, 1200, 900, 1600, 1200, 1500, 1300, 1800, 1400, 1100, 1700, 1500],
              borderColor: 'rgb(147, 51, 234)',
              tension: 0.4,
              fill: false
            },
            {
              label: 'Sales',
              data: [800, 1000, 1100, 1300, 1000, 1200, 1100, 1400, 1200, 900, 1500, 1300],
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
                display: true,
                color: '#f3f4f6'
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