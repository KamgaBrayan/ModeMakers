import { Injectable } from '@angular/core';
import {
  ApiResponse,
  CreateMeasurementRequest,
  UpdateMeasurementRequest
} from '../../shared/interfaces/apiRequest.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Measurement} from '../../shared/interfaces/measurement.interface';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  constructor(private http: HttpClient) {}

  getUserMeasures(userId: number): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${API_URL}/user/${userId}/measures`);
  }

  deleteMeasure(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/measure/${id}`);
  }

  createMeasure(measure: CreateMeasurementRequest): Observable<ApiResponse<Measurement>> {
    return this.http.post<ApiResponse<Measurement>>(`${API_URL}/measure`, measure);
  }

  getMeasureById(id: number): Observable<Measurement> {
    return this.http.get<Measurement>(`${API_URL}/measure/${id}`);
  }

  updateMeasure(id: number, measure: UpdateMeasurementRequest): Observable<ApiResponse<Measurement>> {
    return this.http.put<ApiResponse<Measurement>>(`${API_URL}/measure/${id}`, measure);
  }
}
