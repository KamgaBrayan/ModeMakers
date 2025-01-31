import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../shared/interfaces/apiRequest.interface';
import {Payment} from '../../shared/interfaces/payment.interface';

const API_URL = 'http://localhost:3001/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  getStylistPayments(stylistId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${API_URL}/stylist/${stylistId}`);
  }

  getUserPayments(userId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${API_URL}/user/${userId}`);
  }

  createPayment(payment: Omit<Payment, 'id' | 'createdAt'>): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(`${API_URL}`, payment);
  }
}
