import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Order {
  id: string;
  product: {
    name: string;
    image: string;
    additionalInfo: string;
  };
  date: string;
  customer: {
    name: string;
    email: string;
  };
  total: number;
  payment: string;
  status: string;
  trackingNo: string;
  productName: string;
  price: number;
  totalOrder: number;
  totalAmount: number;
}

@Component({
  selector: 'app-recent-orders',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-xl shadow-sm">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Recent Orders</h3>
        <div class="flex gap-2">
          <button class="text-sm text-gray-500 hover:text-gray-700">Today</button>
          <button class="text-sm text-gray-500 hover:text-gray-700">Weekly</button>
          <button class="text-sm text-gray-500 hover:text-gray-700">Monthly</button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="text-left text-sm text-gray-500">
              <th class="pb-4">Tracking No.</th>
              <th class="pb-4">Product Name</th>
              <th class="pb-4">Price</th>
              <th class="pb-4">Total Order</th>
              <th class="pb-4">Total Amount</th>
              <th class="pb-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of recentOrders" class="border-t border-gray-100">
              <td class="py-4 text-sm">{{order.trackingNo}}</td>
              <td class="py-4 text-sm">{{order.productName}}</td>
              <td class="py-4 text-sm">{{order.price | currency:'FCFA '}}</td>
              <td class="py-4 text-sm">{{order.totalOrder}}</td>
              <td class="py-4 text-sm">{{order.totalAmount | currency:'FCFA '}}</td>
              <td class="py-4">
                <span [class]="getStatusClass(order.status)">
                  {{order.status}}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Navigation Menu -->
      <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <div class="text-sm text-gray-500">
          Showing {{currentPage * itemsPerPage + 1}} to {{Math.min((currentPage + 1) * itemsPerPage, recentOrders.length)}} of {{recentOrders.length}} entries
        </div>
        <div class="flex gap-2">
          <button 
            [disabled]="currentPage === 0"
            (click)="previousPage()"
            class="px-3 py-1 rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            [disabled]="(currentPage + 1) * itemsPerPage >= recentOrders.length"
            (click)="nextPage()"
            class="px-3 py-1 rounded border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class RecentOrdersComponent implements OnInit {
  recentOrders: Order[] = [
    {
      id: '302012',
      product: {
        name: 'Handmade Pouch',
        image: 'p1.jpg',
        additionalInfo: '+3 other products'
      },
      date: '1 min ago',
      customer: {
        name: 'John Bushnell',
        email: 'john@gmail.com'
      },
      total: 123.00,
      payment: 'Mastercard',
      status: 'Processing',
      trackingNo: '#TR-0123',
      productName: 'Traditional Dress',
      price: 59.99,
      totalOrder: 2,
      totalAmount: 119.98
    },
    {
      id: '302011',
      product: {
        name: 'Designer Watch',
        image: 'p2.jpg',
        additionalInfo: '+1 other product'
      },
      date: '1 min ago',
      customer: {
        name: 'Ilham Budi A',
        email: 'ilham@gmail.com'
      },
      total: 599.00,
      payment: 'Visa',
      status: 'Processing',
      trackingNo: '#TR-0124',
      productName: 'Modern Suit',
      price: 89.99,
      totalOrder: 1,
      totalAmount: 89.99
    },
    {
      id: '302002',
      product: {
        name: 'Premium Watch',
        image: 'p3.jpg',
        additionalInfo: ''
      },
      date: '5 hour ago',
      customer: {
        name: 'Muhammad Karim',
        email: 'karim@gmail.com'
      },
      total: 125.00,
      payment: 'Transfer',
      status: 'Shipped',
      trackingNo: '#TR-0125',
      productName: 'Summer Collection',
      price: 45.99,
      totalOrder: 3,
      totalAmount: 137.97
    },
    {
      id: '301901',
      product: {
        name: 'Designer Headphones',
        image: 'p4.jpg',
        additionalInfo: '+1 other product'
      },
      date: '1 day ago',
      customer: {
        name: 'Linda Blair',
        email: 'linda@gmail.com'
      },
      total: 348.00,
      payment: 'Paypal',
      status: 'Shipped',
      trackingNo: '#TR-0126',
      productName: 'Winter Jacket',
      price: 129.99,
      totalOrder: 1,
      totalAmount: 129.99
    }
  ];

  currentPage = 0;
  itemsPerPage = 5;
  Math = Math;

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 text-xs rounded-full';
    switch (status.toLowerCase()) {
      case 'processing':
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'shipped':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'delivered':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if ((this.currentPage + 1) * this.itemsPerPage < this.recentOrders.length) {
      this.currentPage++;
    }
  }
}
