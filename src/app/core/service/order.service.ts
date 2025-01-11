import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse, CreateOrderRequest} from '../../shared/interfaces/apiRequest.interface';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:3000/order';

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
}
