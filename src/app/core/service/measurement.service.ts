import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/apiRequest.interface';
import { Measurement } from '../../shared/interfaces/measurement.interface';

const API_URL = 'http://localhost:3000/measurements';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  constructor(private http: HttpClient) {}

  getMeasurementsByUserId(userId: number): Observable<ApiResponse<Measurement[]>> {
    return this.http.get<ApiResponse<Measurement[]>>(`${API_URL}/user/${userId}`);
  }

  getMeasurementById(id: number): Observable<ApiResponse<Measurement>> {
    return this.http.get<ApiResponse<Measurement>>(`${API_URL}/${id}`);
  }

  createMeasurement(measurement: Omit<Measurement, 'id'>): Observable<ApiResponse<Measurement>> {
    return this.http.post<ApiResponse<Measurement>>(`${API_URL}`, measurement);
  }

  updateMeasurement(id: number, measurement: Partial<Measurement>): Observable<ApiResponse<Measurement>> {
    return this.http.put<ApiResponse<Measurement>>(`${API_URL}/${id}`, measurement);
  }

  deleteMeasurement(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/${id}`);
  }
}
