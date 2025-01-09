import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../../../core/services/dashboard.service';

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
      <div class="rounded-t mb-0 px-0 border-0">
        <div class="flex flex-wrap items-center px-4 py-2">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">Recent Orders</h3>
          </div>
          <div class="flex space-x-2">
            <select [(ngModel)]="statusFilter" (change)="applyFilter()" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="canceled">Canceled</option>
            </select>
            <select [(ngModel)]="paymentMethodFilter" (change)="applyFilter()" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
              <option value="all">All Payment Methods</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </select>
          </div>
        </div>
        <div class="block w-full overflow-x-auto">
          <table class="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Order ID</th>
                <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Customer</th>
                <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Amount</th>
                <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Payment Method</th>
                <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Status</th>
                <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let order of orders" class="text-gray-700 dark:text-gray-100">
                <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">#{{ order.id }}</td>
                <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img class="w-10 h-10 rounded-full" [src]="order.payment.preOrder.photos[0]" alt="Product image">
                    </div>
                    <div class="ml-3">
                      <p class="text-gray-900 dark:text-white whitespace-no-wrap">
                        {{ order.payment.preOrder.user.user_name }}
                      </p>
                      <p class="text-gray-600 dark:text-gray-400 whitespace-no-wrap">
                        {{ order.payment.preOrder.specification }}
                      </p>
                    </div>
                  </div>
                </td>
                <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  XAF {{ order.payment.account }}
                </td>
                <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {{ order.payment.paymentMethod }}
                </td>
                <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <span [class]="getStatusClass(order.payment.status)">
                    {{ order.payment.status }}
                  </span>
                </td>
                <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {{ order.payment.createdAt | date:'mediumDate' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- Pagination -->
      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-1 justify-between sm:hidden">
          <button (click)="previousPage()" [disabled]="currentPage === 1" class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">Previous</button>
          <button (click)="nextPage()" class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600">Next</button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              Showing <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> to <span class="font-medium">{{ Math.min(currentPage * pageSize, totalItems) }}</span> of <span class="font-medium">{{ totalItems }}</span> results
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button (click)="previousPage()" [disabled]="currentPage === 1" class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-600">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
              </button>
              <button (click)="nextPage()" class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-gray-600 dark:hover:bg-gray-600">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .relative {
      position: relative;
    }

    .flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .min-w-0 {
      min-width: 0;
    }

    .break-words {
      word-wrap: break-word;
    }

    .bg-gray-50 {
      background-color: #f9fafb;
    }

    .dark\:bg-gray-800 {
      background-color: #2f365f;
    }

    .w-full {
      width: 100%;
    }

    .shadow-lg {
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    .rounded {
      border-radius: 0.5rem;
    }

    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .font-semibold {
      font-weight: 600;
    }

    .text-base {
      font-size: 1rem;
    }

    .text-gray-900 {
      color: #1a1a1a;
    }

    .dark\:text-gray-50 {
      color: #f9fafb;
    }

    .space-x-2 > :not([hidden]) ~ :not([hidden]) {
      margin-left: 0.5rem;
    }

    .bg-gray-50 {
      background-color: #f9fafb;
    }

    .border {
      border-width: 1px;
    }

    .border-gray-300 {
      border-color: #d1d5db;
    }

    .text-gray-900 {
      color: #1a1a1a;
    }

    .text-sm {
      font-size: 0.875rem;
    }

    .rounded-lg {
      border-radius: 0.5rem;
    }

    .focus\:ring-blue-500 {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }

    .focus\:border-blue-500 {
      border-color: #3b82f6;
    }

    .dark\:bg-gray-700 {
      background-color: #2f365f;
    }

    .dark\:border-gray-600 {
      border-color: #4b5563;
    }

    .dark\:placeholder-gray-400 {
      color: #9ca3af;
    }

    .dark\:text-white {
      color: #ffffff;
    }

    .dark\:focus\:ring-blue-500 {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }

    .dark\:focus\:border-blue-500 {
      border-color: #3b82f6;
    }

    .dark\:hover\:bg-gray-600 {
      background-color: #4b5563;
    }

    .block {
      display: block;
    }

    .w-full {
      width: 100%;
    }

    .overflow-x-auto {
      overflow-x: auto;
    }

    .items-center {
      align-items: center;
    }

    .bg-transparent {
      background-color: transparent;
    }

    .border-collapse {
      border-collapse: collapse;
    }

    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .bg-gray-100 {
      background-color: #f7fafc;
    }

    .dark\:bg-gray-600 {
      background-color: #4b5563;
    }

    .text-gray-500 {
      color: #6b7280;
    }

    .dark\:text-gray-100 {
      color: #f9fafb;
    }

    .align-middle {
      vertical-align: middle;
    }

    .border {
      border-width: 1px;
    }

    .border-solid {
      border-style: solid;
    }

    .border-gray-200 {
      border-color: #edf2f7;
    }

    .dark\:border-gray-500 {
      border-color: #6b7280;
    }

    .py-3 {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }

    .text-xs {
      font-size: 0.75rem;
    }

    .uppercase {
      text-transform: uppercase;
    }

    .border-l-0 {
      border-left-width: 0;
    }

    .border-r-0 {
      border-right-width: 0;
    }

    .whitespace-nowrap {
      white-space: nowrap;
    }

    .font-semibold {
      font-weight: 600;
    }

    .text-left {
      text-align: left;
    }

    .text-gray-700 {
      color: #4b5563;
    }

    .dark\:text-gray-100 {
      color: #f9fafb;
    }

    .border-t-0 {
      border-top-width: 0;
    }

    .flex {
      display: flex;
    }

    .items-center {
      align-items: center;
    }

    .flex-shrink-0 {
      flex-shrink: 0;
    }

    .w-10 {
      width: 2.5rem;
    }

    .h-10 {
      height: 2.5rem;
    }

    .rounded-full {
      border-radius: 50%;
    }

    .ml-3 {
      margin-left: 0.75rem;
    }

    .text-gray-900 {
      color: #1a1a1a;
    }

    .dark\:text-white {
      color: #ffffff;
    }

    .whitespace-no-wrap {
      white-space: nowrap;
    }

    .text-gray-600 {
      color: #6b7280;
    }

    .dark\:text-gray-400 {
      color: #9ca3af;
    }

    .text-xs {
      font-size: 0.75rem;
    }

    .border-t-0 {
      border-top-width: 0;
    }

    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .align-middle {
      vertical-align: middle;
    }

    .border-l-0 {
      border-left-width: 0;
    }

    .border-r-0 {
      border-right-width: 0;
    }

    .whitespace-nowrap {
      white-space: nowrap;
    }

    .p-4 {
      padding: 1rem;
    }

    .flex {
      display: flex;
    }

    .items-center {
      align-items: center;
    }

    .justify-between {
      justify-content: space-between;
    }

    .border-t {
      border-top-width: 1px;
    }

    .border-gray-200 {
      border-color: #edf2f7;
    }

    .dark\:border-gray-700 {
      border-color: #4b5563;
    }

    .bg-white {
      background-color: #ffffff;
    }

    .dark\:bg-gray-800 {
      background-color: #2f365f;
    }

    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .py-3 {
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
    }

    .sm\:px-6 {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }

    .flex-1 {
      flex: 1;
    }

    .justify-between {
      justify-content: space-between;
    }

    .hidden {
      display: none;
    }

    .sm\:flex {
      display: flex;
    }

    .sm\:flex-1 {
      flex: 1;
    }

    .sm\:items-center {
      align-items: center;
    }

    .sm\:justify-between {
      justify-content: space-between;
    }

    .text-sm {
      font-size: 0.875rem;
    }

    .text-gray-700 {
      color: #4b5563;
    }

    .dark\:text-gray-300 {
      color: #9ca3af;
    }

    .font-medium {
      font-weight: 500;
    }

    .isolate {
      isolation: isolate;
    }

    .inline-flex {
      display: inline-flex;
    }

    .-space-x-px > :not([hidden]) ~ :not([hidden]) {
      margin-left: -1px;
    }

    .rounded-md {
      border-radius: 0.375rem;
    }

    .shadow-sm {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }

    .relative {
      position: relative;
    }

    .inline-flex {
      display: inline-flex;
    }

    .items-center {
      align-items: center;
    }

    .rounded-l-md {
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;
    }

    .px-2 {
      padding-left: 0.5rem;
      padding-right: 0.5rem;
    }

    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    .text-gray-400 {
      color: #9ca3af;
    }

    .ring-1 {
      --tw-ring-offset-width: 0;
      --tw-ring-offset-color: #fff;
      --tw-ring-color: #fff;
      --tw-ring-offset-shadow: 0 0 transparent;
      --tw-ring-shadow: 0 0 transparent;
      box-shadow: 0 0 transparent, 0 0 transparent, inset 0 0 transparent, 0 0 transparent;
    }

    .ring-inset {
      --tw-ring-inset: inset;
    }

    .ring-gray-300 {
      --tw-ring-color: #d1d5db;
    }

    .hover\:bg-gray-50 {
      background-color: #f9fafb;
    }

    .focus\:z-20 {
      z-index: 20;
    }

    .focus\:outline-offset-0 {
      outline-offset: 0;
    }

    .dark\:ring-gray-600 {
      --tw-ring-color: #4b5563;
    }

    .dark\:hover\:bg-gray-600 {
      background-color: #4b5563;
    }

    .rounded-r-md {
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
    }
  `]
})
export class RecentOrdersComponent implements OnInit {
  orders: any[] = [];
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;
  statusFilter = 'all';
  paymentMethodFilter = 'all';
  Math = Math;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.dashboardService.getRecentOrdersWithPagination(this.currentPage, this.pageSize).subscribe(
      orders => {
        this.orders = orders;
        // For demo purposes, set total items to a reasonable number
        this.totalItems = 20;
      }
    );
  }

  getStatusClass(status: string): string {
    const baseClasses = 'text-xs font-medium mr-2 px-2.5 py-0.5 rounded';
    switch (status.toLowerCase()) {
      case 'confirmed':
        return `bg-green-100 text-green-800 ${baseClasses} dark:bg-green-900 dark:text-green-300`;
      case 'pending':
        return `bg-yellow-100 text-yellow-800 ${baseClasses} dark:bg-yellow-900 dark:text-yellow-300`;
      case 'canceled':
        return `bg-red-100 text-red-800 ${baseClasses} dark:bg-red-900 dark:text-red-300`;
      default:
        return `bg-gray-100 text-gray-800 ${baseClasses} dark:bg-gray-700 dark:text-gray-300`;
    }
  }

  applyFilter() {
    this.currentPage = 1;
    this.loadOrders();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadOrders();
    }
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.totalItems) {
      this.currentPage++;
      this.loadOrders();
    }
  }
}
