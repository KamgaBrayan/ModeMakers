import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse, CreatePreOrderRequest, UpdatePreOrderRequest} from '../../shared/interfaces/apiRequest.interface';
import {HttpClient} from '@angular/common/http';
import {PreOrder} from '../../shared/interfaces/preOrder.interface';


const API_URL = 'http://localhost:3000/preorder';

@Injectable({
  providedIn: 'root'
})

export class PreOrderService {

  constructor(private http: HttpClient) {}

  getUserPreOrders(userId: number): Observable<PreOrder[]> {
    return this.http.get<PreOrder[]>(`${API_URL}/user/${userId}`);
  }

  getStylistPreOrders(stylistId: number): Observable<PreOrder[]> {
    return this.http.get<PreOrder[]>(`${API_URL}/stylist/${stylistId}`);
  }

  createPreOrder(preOrder: CreatePreOrderRequest): Observable<ApiResponse<PreOrder>> {
    return this.http.post<ApiResponse<PreOrder>>(`${API_URL}`, preOrder);
  }

  getPreOrderById(id: number): Observable<PreOrder> {
    return this.http.get<PreOrder>(`${API_URL}/${id}`);
  }

  updatePreOrder(id: number, preOrder: UpdatePreOrderRequest): Observable<ApiResponse<PreOrder>> {
    return this.http.patch<ApiResponse<PreOrder>>(`${API_URL}/${id}`, preOrder);
  }

  deletePreOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

}
