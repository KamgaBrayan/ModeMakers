import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponse, CreateOrderRequest } from '../../shared/interfaces/apiRequest.interface';
import { HttpClient } from '@angular/common/http';
import { Order } from '../../shared/interfaces/order.interface';

const API_URL = 'http://localhost:3000/order';

export interface OrderFilter {
  status?: string;
  paymentMethod?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getUserOrders(userId: number): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${API_URL}/user/${userId}`);
  }

  getStylistOrders(stylistId: number): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${API_URL}/stylist/${stylistId}`);
  }

  createOrder(order: CreateOrderRequest): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${API_URL}`, order);
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${API_URL}/${id}`);
  }

  printOrder(id: number): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${API_URL}/${id}/print`);
  }

  getRecentOrders(limit: number = 5): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${API_URL}/recent`, {
      params: { limit: limit.toString() }
    });
  }

  getOrdersWithPagination(page: number = 1, pageSize: number = 5): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${API_URL}`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString(),
        sort: 'createdAt:desc'
      }
    });
  }

  getOrderStatsByLocation(): Observable<ApiResponse<Array<{
    location: string;
    sales: number;
    percentage: number;
  }>>> {
    return this.http.get<ApiResponse<Array<{
      location: string;
      sales: number;
      percentage: number;
    }>>>(`${API_URL}/stats/location`);
  }

  getOrderStats(): Observable<ApiResponse<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    completionRate: number;
  }>> {
    return this.http.get<ApiResponse<{
      totalOrders: number;
      totalRevenue: number;
      averageOrderValue: number;
      completionRate: number;
    }>>(`${API_URL}/stats`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${API_URL}/${orderId}/status`, { status });
  }

  cancelOrder(orderId: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${API_URL}/${orderId}/cancel`, {});
  }

  filterOrders(orders: Order[], filters: OrderFilter): Order[] {
    return orders.filter(order => {
      let matches = true;
      if (filters.paymentMethod && filters.paymentMethod !== 'all') {
        matches = matches && order.payment.method === filters.paymentMethod;
      }
      if (filters.dateRange) {
        const orderDate = new Date(order.createdAt);
        matches = matches && orderDate >= filters.dateRange.start && orderDate <= filters.dateRange.end;
      }
      return matches;
    });
  }
}
