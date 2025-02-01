import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/apiRequest.interface';
import { PreOrder } from '../../shared/interfaces/preOrder.interface';

const API_URL = 'http://localhost:3000/pre-orders';

export interface PreOrderStats {
  totalPreOrders: number;
  pendingPreOrders: number;
  completedPreOrders: number;
  averageProcessingTime: number;
}

export interface PreOrderFilter {
  status?: 'pending' | 'approved' | 'rejected' | 'completed';
  dateRange?: {
    start: Date;
    end: Date;
  };
  stylistId?: number;
  userId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PreOrderService {
  constructor(private http: HttpClient) {}

  getAllPreOrders(): Observable<ApiResponse<PreOrder[]>> {
    return this.http.get<ApiResponse<PreOrder[]>>(`${API_URL}`);
  }

  getPreOrderById(id: number): Observable<ApiResponse<PreOrder>> {
    return this.http.get<ApiResponse<PreOrder>>(`${API_URL}/${id}`);
  }

  getUserPreOrders(userId: number): Observable<ApiResponse<PreOrder[]>> {
    return this.http.get<ApiResponse<PreOrder[]>>(`${API_URL}/user/${userId}`);
  }

  getStylistPreOrders(stylistId: number): Observable<ApiResponse<PreOrder[]>> {
    return this.http.get<ApiResponse<PreOrder[]>>(`${API_URL}/stylist/${stylistId}`);
  }

  createPreOrder(preOrder: Omit<PreOrder, 'id'>): Observable<ApiResponse<PreOrder>> {
    return this.http.post<ApiResponse<PreOrder>>(`${API_URL}`, preOrder);
  }

  updatePreOrder(id: number, preOrder: Partial<PreOrder>): Observable<ApiResponse<PreOrder>> {
    return this.http.put<ApiResponse<PreOrder>>(`${API_URL}/${id}`, preOrder);
  }

  deletePreOrder(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/${id}`);
  }

  approvePreOrder(id: number): Observable<ApiResponse<PreOrder>> {
    return this.http.post<ApiResponse<PreOrder>>(`${API_URL}/${id}/approve`, {});
  }

  rejectPreOrder(id: number, reason: string): Observable<ApiResponse<PreOrder>> {
    return this.http.post<ApiResponse<PreOrder>>(`${API_URL}/${id}/reject`, { reason });
  }

  getPreOrderStats(stylistId?: number): Observable<ApiResponse<PreOrderStats>> {
    const url = stylistId ? `${API_URL}/stats/${stylistId}` : `${API_URL}/stats`;
    return this.http.get<ApiResponse<PreOrderStats>>(url);
  }

  filterPreOrders(preOrders: PreOrder[], filters: PreOrderFilter): PreOrder[] {
    return preOrders.filter(preOrder => {
      let matches = true;

      if (filters.status) {
        matches = matches && preOrder.status === filters.status;
      }

      if (filters.dateRange) {
        const orderDate = new Date(preOrder.createdAt);
        matches = matches && orderDate >= filters.dateRange.start && orderDate <= filters.dateRange.end;
      }

      if (filters.stylistId) {
        matches = matches && preOrder.stylistId === filters.stylistId;
      }

      if (filters.userId) {
        matches = matches && preOrder.userId === filters.userId;
      }

      return matches;
    });
  }

  convertToOrder(preOrderId: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${API_URL}/${preOrderId}/convert`, {});
  }
}
