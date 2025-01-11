import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../shared/interfaces/apiRequest.interface';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) {}

  addToFavorites(productId: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${API_URL}/product/${productId}/favorite`, {});
  }

  removeFromFavorites(productId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/product/${productId}/favorite`);
  }

  getUserFavorites(userId: number): Observable<ApiResponse<Preferences>> {
    return this.http.get<ApiResponse<Preferences>>(`${API_URL}/user/${userId}/favorites`);
  }
}
