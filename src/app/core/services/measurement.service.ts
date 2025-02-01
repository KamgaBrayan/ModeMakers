import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Measurement {
  id: number;
  title: string;
  user: {
    user_id: number;
    user_name: string;
    roles: string[];
  };
  stature: number;
  shoulder_circumference: number;
  chest_circumference: number;
  waist_circumference: number;
  hip_circumference: number;
  shoulder_height: number;
  hip_height: number;
  knee_height: number;
  chest_spacing: number;
  breast_height: number;
  pelvis_height: number;
  front_waist_length: number;
  shoulder_length: number;
  back_waist_length: number;
  arm_length: number;
  total_arm_length_bent: number;
  wrist_circumference: number;
  ankle_height: number;
  seated_height: number;
  crotch_length: number;
  date_measure: string;
}

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {
  private apiUrl = 'http://localhost:3000';  // JSON Server default URL

  constructor(private http: HttpClient) {}

  getMeasurementsByUserId(userId: number): Observable<Measurement[]> {
    return this.http.get<Measurement[]>(`${this.apiUrl}/measurements`)
      .pipe(
        map(measurements => measurements.filter(m => m.user.user_id === userId))
      );
  }

  getMeasurementById(id: number): Observable<Measurement> {
    return this.http.get<Measurement>(`${this.apiUrl}/measurements/${id}`);
  }

  createMeasurement(measurement: Omit<Measurement, 'id'>): Observable<Measurement> {
    return this.http.post<Measurement>(`${this.apiUrl}/measurements`, measurement);
  }

  updateMeasurement(id: number, measurement: Partial<Measurement>): Observable<Measurement> {
    return this.http.put<Measurement>(`${this.apiUrl}/measurements/${id}`, measurement);
  }

  deleteMeasurement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/measurements/${id}`);
  }
}
