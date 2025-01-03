import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar.component';

interface Customer {
  id: number;
  name: string;
  company: string;
  phoneNumber: string;
  email: string;
  country: string;
  status: 'Active' | 'Inactive';
  profileImage: string;
}

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, SidebarComponent],
  template: `
    <div class="customers-container">
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
            <div class="stat-icon customers">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Total Customers</span>
              <span class="stat-value">5,423</span>
              <span class="stat-change positive">+16% this month</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon members">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Members</span>
              <span class="stat-value">1,893</span>
              <span class="stat-change negative">-1% this month</span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon active">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div class="stat-info">
              <span class="stat-label">Active Now</span>
              <span class="stat-value">189</span>
              <div class="active-users">
                <img src="assets/avatar1.jpg" alt="User 1" class="w-6 h-6 rounded-full">
                <img src="assets/avatar2.jpg" alt="User 2" class="w-6 h-6 rounded-full -ml-2">
                <img src="assets/avatar3.jpg" alt="User 3" class="w-6 h-6 rounded-full -ml-2">
                <img src="assets/avatar4.jpg" alt="User 4" class="w-6 h-6 rounded-full -ml-2">
              </div>
            </div>
          </div>
        </div>

        <!-- Customers Table -->
        <div class="customers-table-container">
          <div class="table-header">
            <h2>All Customers</h2>
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
                  <th>Company</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let customer of customers">
                  <td>
                    <div class="customer-info">
                      <img [src]="customer.profileImage" [alt]="customer.name" class="customer-image">
                      <span>{{customer.name}}</span>
                    </div>
                  </td>
                  <td>{{customer.company}}</td>
                  <td>{{customer.phoneNumber}}</td>
                  <td>{{customer.email}}</td>
                  <td>{{customer.country}}</td>
                  <td>
                    <span [class]="getStatusClass(customer.status)">
                      {{customer.status}}
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
    .customers-container {
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

    .stat-icon.customers {
      @apply bg-purple-50 text-purple-600;
    }

    .stat-icon.members {
      @apply bg-blue-50 text-blue-600;
    }

    .stat-icon.active {
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

    .active-users {
      @apply flex -space-x-2 mt-2;
    }

    /* Customers Table */
    .customers-table-container {
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

    .customer-info {
      @apply flex items-center gap-3;
    }

    .customer-image {
      @apply w-10 h-10 rounded-full object-cover;
    }

    .status-badge {
      @apply px-3 py-1 rounded-full text-xs font-medium;
    }

    .status-badge.active {
      @apply bg-green-100 text-green-800;
    }

    .status-badge.inactive {
      @apply bg-red-100 text-red-800;
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
export class CustomersComponent implements OnInit {
  sidebarExpanded = true;
  currentPage = 1;

  customers: Customer[] = [
    {
      id: 1,
      name: 'Jane Cooper',
      company: 'Microsoft',
      phoneNumber: '(225) 555-0118',
      email: 'jane@microsoft.com',
      country: 'United States',
      status: 'Active',
      profileImage: 'assets/user/user-1.jpg'
    },
    {
      id: 2,
      name: 'Floyd Miles',
      company: 'Yahoo',
      phoneNumber: '(205) 555-0100',
      email: 'floyd@yahoo.com',
      country: 'Kiribati',
      status: 'Inactive',
      profileImage: 'assets/user/user-2.jpg'
    },
    {
      id: 3,
      name: 'Ronald Richards',
      company: 'Adobe',
      phoneNumber: '(302) 555-0107',
      email: 'ronald@adobe.com',
      country: 'Israel',
      status: 'Inactive',
      profileImage: 'assets/user/user-3.jpg'
    },
    {
      id: 4,
      name: 'Marvin McKinney',
      company: 'Tesla',
      phoneNumber: '(252) 555-0126',
      email: 'marvin@tesla.com',
      country: 'Iran',
      status: 'Active',
      profileImage: 'assets/user/user-4.jpg'
    },
    {
      id: 5,
      name: 'Jerome Bell',
      company: 'Google',
      phoneNumber: '(629) 555-0129',
      email: 'jerome@google.com',
      country: 'Réunion',
      status: 'Active',
      profileImage: 'assets/user/user-5.jpg'
    },
    {
      id: 6,
      name: 'Kathryn Murphy',
      company: 'Microsoft',
      phoneNumber: '(406) 555-0120',
      email: 'kathryn@microsoft.com',
      country: 'Curaçao',
      status: 'Active',
      profileImage: 'assets/user/user-6.jpg'
    },
    {
      id: 7,
      name: 'Jacob Jones',
      company: 'Yahoo',
      phoneNumber: '(208) 555-0112',
      email: 'jacob@yahoo.com',
      country: 'Brazil',
      status: 'Active',
      profileImage: 'assets/user/user-7.jpg'
    },
    {
      id: 8,
      name: 'Kristin Watson',
      company: 'Facebook',
      phoneNumber: '(704) 555-0127',
      email: 'kristin@facebook.com',
      country: 'Åland Islands',
      status: 'Inactive',
      profileImage: 'assets/user/user-8.jpg'
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
