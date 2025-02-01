import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  ApiResponse, CreateDelivery,
  CreateMeasurementRequest, UpdateDelivery,
  UpdateMeasurementRequest
} from '../../shared/interfaces/apiRequest.interface';
import {Delivery} from '../../shared/interfaces/delivery.interface';

const API_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient) { }

  createMeasure(delivery: CreateDelivery): Observable<ApiResponse<Delivery>> {
    return this.http.post<ApiResponse<Delivery>>(`${API_URL}/delivery`, delivery);
  }

  updateMeasure(id: number, delivery: UpdateDelivery): Observable<ApiResponse<Delivery>> {
    return this.http.put<ApiResponse<Delivery>>(`${API_URL}/delivery/${id}`, delivery);
  }
}
