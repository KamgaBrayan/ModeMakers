import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../shared/interfaces/apiRequest.interface';

const API_URL = 'http://localhost:3000/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  getStylistPayments(stylistId: number): Observable<ApiResponse<Payment[]>> {
    return this.http.get<ApiResponse<Payment[]>>(`${API_URL}/stylist/${stylistId}`);
  }

  getUserPayments(userId: number): Observable<ApiResponse<Payment[]>> {
    return this.http.get<ApiResponse<Payment[]>>(`${API_URL}/user/${userId}`);
  }

  createPayment(payment: Omit<Payment, 'id' | 'createdAt'>): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(`${API_URL}`, payment);
  }
}
