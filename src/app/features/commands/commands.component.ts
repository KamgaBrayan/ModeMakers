import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar.component';

interface Command {
  id: number;
  customerName: string;
  product: string;
  productImage: string;
  quantity: number;
  deadline: string;
  status: 'Payé' | 'Accepté' | 'Livré';
}

@Component({
  selector: 'app-commands',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="commands-container">
      <!-- Sidebar -->
      <app-sidebar (sidebarStateChange)="onSidebarStateChange($event)"></app-sidebar>

      <!-- Main Content -->
      <div class="main-content" [ngClass]="{'sidebar-expanded': sidebarExpanded, 'sidebar-collapsed': !sidebarExpanded}">
        <!-- Header -->
        <div class="header">
          <h1 class="greeting">Hello Evano 👋</h1>
          <div class="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
            <input type="text" placeholder="Search">
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon total-orders">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Total Orders</span>
              <span class="stat-value">5,423</span>
              <span class="stat-change positive">+16% this month</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon pending">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Pending Orders</span>
              <span class="stat-value">1,893</span>
              <span class="stat-change negative">-1% this month</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon completed">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Completed</span>
              <span class="stat-value">189</span>
              <div class="completed-today text-sm text-gray-500">12 Today</div>
            </div>
          </div>
        </div>

        <!-- Commands Table -->
        <div class="commands-table-container">
          <div class="table-header">
            <h2>All Commands</h2>
            <div class="table-actions">
              <div class="search-field">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
                <input type="text" placeholder="Search">
              </div>
              <div class="sort-by">
                <span>Sort by:</span>
                <select>
                  <option>Newest</option>
                  <option>Oldest</option>
                  <option>A-Z</option>
                  <option>Z-A</option>
                </select>
              </div>
            </div>
          </div>

          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Deadline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let command of commands">
                  <td>
                    <div class="customer-info">
                      <span>{{command.customerName}}</span>
                    </div>
                  </td>
                  <td>
                    <div class="product-info">
                      <img [src]="command.productImage" [alt]="command.product" class="product-image">
                      <span>{{command.product}}</span>
                    </div>
                  </td>
                  <td>{{command.quantity}}</td>
                  <td>{{command.deadline}}</td>
                  <td>
                    <span [class]="getStatusClass(command.status)">
                      {{command.status}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div class="pagination">
            <div class="pagination-info">
              Showing 1 to 8 of 256K entries
            </div>
            <div class="pagination-controls">
              <button class="pagination-btn" [disabled]="currentPage === 1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <div class="pagination-pages">
                <button class="page-btn active">1</button>
                <button class="page-btn">2</button>
                <button class="page-btn">3</button>
                <button class="page-btn">4</button>
                <span>...</span>
                <button class="page-btn">40</button>
              </div>
              <button class="pagination-btn">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .commands-container {
      @apply flex min-h-screen bg-gray-50;
    }

    .main-content {
      @apply flex-1 p-8 transition-all duration-300;
    }

    .main-content.sidebar-expanded {
      @apply ml-60;
    }

    .main-content.sidebar-collapsed {
      @apply ml-20;
    }

    /* Header Styles */
    .header {
      @apply flex justify-between items-center mb-8;
    }

    .greeting {
      @apply text-2xl font-semibold;
    }

    .search-bar {
      @apply flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm;
    }

    .search-bar svg {
      @apply text-gray-400;
    }

    .search-bar input {
      @apply border-none outline-none bg-transparent;
    }

    /* Stats Grid */
    .stats-grid {
      @apply grid grid-cols-1 md:grid-cols-3 gap-6 mb-8;
    }

    .stat-card {
      @apply bg-white p-6 rounded-lg shadow-sm flex items-start gap-4;
    }

    .stat-icon {
      @apply p-3 rounded-lg;
    }

    .stat-icon.total-orders {
      @apply bg-purple-50 text-purple-600;
    }

    .stat-icon.pending {
      @apply bg-orange-50 text-orange-600;
    }

    .stat-icon.completed {
      @apply bg-green-50 text-green-600;
    }

    .stat-info {
      @apply flex flex-col;
    }

    .stat-label {
      @apply text-sm text-gray-500;
    }

    .stat-value {
      @apply text-xl font-semibold mt-1;
    }

    .stat-change {
      @apply text-sm mt-1;
    }

    .stat-change.positive {
      @apply text-green-600;
    }

    .stat-change.negative {
      @apply text-red-600;
    }

    /* Commands Table */
    .commands-table-container {
      @apply bg-white rounded-lg shadow-sm p-6;
    }

    .table-header {
      @apply flex justify-between items-center mb-6;
    }

    .table-header h2 {
      @apply text-lg font-semibold;
    }

    .table-actions {
      @apply flex items-center gap-4;
    }

    .search-field {
      @apply flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg;
    }

    .search-field input {
      @apply border-none outline-none bg-transparent;
    }

    .sort-by {
      @apply flex items-center gap-2;
    }

    .sort-by select {
      @apply bg-transparent border-none outline-none text-gray-600;
    }

    /* Table Styles */
    table {
      @apply w-full;
    }

    th {
      @apply py-4 px-6 text-left text-sm font-medium text-gray-500;
    }

    td {
      @apply py-4 px-6 text-sm text-gray-600 border-t border-gray-100;
    }

    .customer-info, .product-info {
      @apply flex items-center gap-3;
    }

    .customer-image, .product-image {
      @apply w-10 h-10 rounded-lg object-cover;
    }

    .status-badge {
      @apply px-3 py-1 rounded-full text-xs font-medium;
    }

    .status-badge.payé {
      @apply bg-green-100 text-green-800;
    }

    .status-badge.accepté {
      @apply bg-orange-100 text-orange-800;
    }

    .status-badge.livré {
      @apply bg-gray-100 text-gray-800;
    }

    /* Pagination */
    .pagination {
      @apply flex justify-between items-center mt-6 pt-4 border-t border-gray-100;
    }

    .pagination-info {
      @apply text-sm text-gray-500;
    }

    .pagination-controls {
      @apply flex items-center gap-2;
    }

    .pagination-btn {
      @apply p-2 rounded border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed;
    }

    .pagination-pages {
      @apply flex items-center gap-1;
    }

    .page-btn {
      @apply px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-50;
    }

    .page-btn.active {
      @apply bg-purple-600 text-white hover:bg-purple-700;
    }
  `]
})
export class CommandsComponent implements OnInit {
  sidebarExpanded = true;
  currentPage = 1;

  commands: Command[] = [
    {
      id: 1,
      customerName: 'Jane Cooper',
      product: 'Robe de soirée',
      productImage: 'assets/products/robe-1.jpg',
      quantity: 4,
      deadline: '12/12/2024',
      status: 'Payé'
    },
    {
      id: 2,
      customerName: 'Floyd Miles',
      product: 'Costume sur mesure',
      productImage: 'assets/products/costume-1.jpg',
      quantity: 2,
      deadline: '12/12/2024',
      status: 'Accepté'
    },
    {
      id: 3,
      customerName: 'Ronald Richards',
      product: 'Ensemble tailleur',
      productImage: 'assets/products/tailleur-1.jpg',
      quantity: 7,
      deadline: '12/12/2024',
      status: 'Accepté'
    },
    {
      id: 4,
      customerName: 'Marvin McKinney',
      product: 'Robe de mariée',
      productImage: 'assets/products/robe-mariee-1.jpg',
      quantity: 1,
      deadline: '12/12/2024',
      status: 'Livré'
    },
    {
      id: 5,
      customerName: 'Jerome Bell',
      product: 'Chemise sur mesure',
      productImage: 'assets/products/chemise-1.jpg',
      quantity: 3,
      deadline: '12/12/2024',
      status: 'Payé'
    },
    {
      id: 6,
      customerName: 'Kathryn Murphy',
      product: 'Veste de costume',
      productImage: 'assets/products/veste-1.jpg',
      quantity: 1,
      deadline: '12/12/2024',
      status: 'Payé'
    },
    {
      id: 7,
      customerName: 'Jacob Jones',
      product: 'Pantalon sur mesure',
      productImage: 'assets/products/pantalon-1.jpg',
      quantity: 7,
      deadline: '12/12/2024',
      status: 'Payé'
    },
    {
      id: 8,
      customerName: 'Kristin Watson',
      product: 'Robe cocktail',
      productImage: 'assets/products/robe-cocktail-1.jpg',
      quantity: 7,
      deadline: '12/12/2024',
      status: 'Accepté'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSidebarStateChange(expanded: boolean): void {
    this.sidebarExpanded = expanded;
  }

  getStatusClass(status: string): string {
    return `status-badge ${status.toLowerCase()}`;
  }
}
