import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ApiResponse} from '../../shared/interfaces/apiRequest.interface';
import {Observable} from 'rxjs';
import {Preferences} from '../../shared/interfaces/preference.interface';

const API_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  constructor(private http: HttpClient) {}

  addToFavorites(productId: number): Observable<void> {
    return this.http.post<void>(`${API_URL}/product/${productId}/favorite`, {});
  }

  removeFromFavorites(productId: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/product/${productId}/favorite`);
  }

  getUserFavorites(userId: number): Observable<Preferences> {
    return this.http.get<Preferences>(`${API_URL}/user/${userId}/favorites`);
  }
}
