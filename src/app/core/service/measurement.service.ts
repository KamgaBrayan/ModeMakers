import { Injectable } from '@angular/core';
import {
  ApiResponse,
  CreateMeasurementRequest,
  UpdateMeasurementRequest
} from '../../shared/interfaces/apiRequest.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) {}

  getUserMeasures(userId: number): Observable<ApiResponse<Measurement[]>> {
    return this.http.get<ApiResponse<Measurement[]>>(`${API_URL}/user/${userId}/measures`);
  }

  deleteMeasure(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/measure/${id}`);
  }

  createMeasure(measure: CreateMeasurementRequest): Observable<ApiResponse<Measurement>> {
    return this.http.post<ApiResponse<Measurement>>(`${API_URL}/measure`, measure);
  }

  getMeasureById(id: number): Observable<ApiResponse<Measurement>> {
    return this.http.get<ApiResponse<Measurement>>(`${API_URL}/measure/${id}`);
  }

  updateMeasure(id: number, measure: UpdateMeasurementRequest): Observable<ApiResponse<Measurement>> {
    return this.http.put<ApiResponse<Measurement>>(`${API_URL}/measure/${id}`, measure);
  }
}
