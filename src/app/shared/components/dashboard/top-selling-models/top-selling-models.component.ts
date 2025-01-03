import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopSellingModel } from '../../../models/top-selling-model';

@Component({
  selector: 'app-top-selling-models',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="top-selling-models">
      <div class="header">
        <h3 class="title">Top Selling models</h3>
        <div class="filters">
          <button class="filter-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
            </svg>
            Filters
          </button>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Sales</th>
              <th>Amount</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let model of models">
              <td>
                <div class="product-cell">
                  <img [src]="'assets/img/products/' + model.image" [alt]="model.name">
                  <div class="product-info">
                    <div class="product-name">{{model.name}}</div>
                    <div class="product-sku">SKU: {{model.sku}}</div>
                  </div>
                </div>
              </td>
              <td>{{model.sales}}</td>
              <td>{{model.amount | number}} FCFA</td>
              <td>{{model.price | number}} FCFA</td>
              <td>
                <span class="status-badge" [class.published]="model.status === 'Published'"
                                        [class.low-stock]="model.status === 'Low Stock'"
                                        [class.out-of-stock]="model.status === 'Out of Stock'">
                  {{model.status}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination">
        <span class="page-info">Showing 1-5 from 15</span>
        <div class="page-controls">
          <button class="page-btn prev" [disabled]="true">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
          <button class="page-btn active">1</button>
          <button class="page-btn">2</button>
          <button class="page-btn">3</button>
          <button class="page-btn next">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .top-selling-models {
      @apply bg-white p-6 rounded-lg shadow-sm;
    }

    .header {
      @apply flex justify-between items-center mb-6;
    }

    .title {
      @apply text-lg font-semibold;
    }

    .filters {
      @apply flex gap-2;
    }

    .filter-btn {
      @apply flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100;
    }

    .table-container {
      @apply overflow-x-auto;
    }

    table {
      @apply w-full text-left;
    }

    th {
      @apply py-3 text-sm font-medium text-gray-500;
    }

    td {
      @apply py-4 text-sm border-t border-gray-100;
    }

    .product-cell {
      @apply flex items-center gap-3;
    }

    .product-cell img {
      @apply w-12 h-12 rounded-lg object-cover;
    }

    .product-info {
      @apply flex flex-col;
    }

    .product-name {
      @apply font-medium;
    }

    .product-sku {
      @apply text-xs text-gray-500;
    }

    .status-badge {
      @apply px-2.5 py-1 text-xs font-medium rounded-full;
    }

    .status-badge.published {
      @apply bg-green-100 text-green-800;
    }

    .status-badge.low-stock {
      @apply bg-orange-100 text-orange-800;
    }

    .status-badge.out-of-stock {
      @apply bg-red-100 text-red-800;
    }

    .pagination {
      @apply flex justify-between items-center mt-4 text-sm;
    }

    .page-info {
      @apply text-gray-500;
    }

    .page-controls {
      @apply flex items-center gap-1;
    }

    .page-btn {
      @apply w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-50;
    }

    .page-btn.active {
      @apply bg-purple-50 text-purple-600;
    }

    .page-btn.prev,
    .page-btn.next {
      @apply text-gray-400;
    }

    .page-btn:disabled {
      @apply opacity-50 cursor-not-allowed;
    }
  `]
})
export class TopSellingModelsComponent {
  @Input() models: TopSellingModel[] = [
    {
      id: 1,
      name: 'Handmade Pouch',
      description: 'A beautiful handmade pouch perfect for everyday use',
      image: 'assets/p6.jpg',
      price: 123.00,
      stock: 5,
      category: 'Accessories',
      status: 'Low Stock',
      sales: 401,
      amount: 84811,
      sku: '302012',
      created_at: '2024-01-02T12:00:00Z',
      updated_at: '2024-01-02T12:00:00Z'
    },
    {
      id: 2,
      name: 'Designer Watch',
      description: 'Elegant designer watch with modern features',
      image: 'p2.jpg',
      price: 590.00,
      stock: 15,
      category: 'Watches',
      status: 'Published',
      sales: 301,
      amount: 177000,
      sku: '302013',
      created_at: '2024-01-02T12:00:00Z',
      updated_at: '2024-01-02T12:00:00Z'
    },
    {
      id: 3,
      name: 'Premium Watch',
      description: 'Premium watch with advanced features',
      image: 'p3.jpg',
      price: 125.00,
      stock: 3,
      category: 'Watches',
      status: 'Low Stock',
      sales: 300,
      amount: 37500,
      sku: '302014',
      created_at: '2024-01-02T12:00:00Z',
      updated_at: '2024-01-02T12:00:00Z'
    },
    {
      id: 4,
      name: 'Designer Headphones',
      description: 'High-quality designer headphones',
      image: 'p4.jpg',
      price: 348.00,
      stock: 8,
      category: 'Electronics',
      status: 'Published',
      sales: 298,
      amount: 103704,
      sku: '302015',
      created_at: '2024-01-02T12:00:00Z',
      updated_at: '2024-01-02T12:00:00Z'
    }
  ];
}
