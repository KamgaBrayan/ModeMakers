import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/interfaces/apiRequest.interface';
import { StylistUser } from '../../shared/interfaces/stylistUser.interface';

const API_URL = 'http://localhost:3000/stylists';

@Injectable({
  providedIn: 'root'
})
export class StylistService {
  constructor(private http: HttpClient) {}

  getAllStylists(): Observable<ApiResponse<StylistUser[]>> {
    return this.http.get<ApiResponse<StylistUser[]>>(`${API_URL}`);
  }

  getStylistById(id: number): Observable<ApiResponse<StylistUser>> {
    return this.http.get<ApiResponse<StylistUser>>(`${API_URL}/${id}`);
  }

  getStylistsByCategory(category: string): Observable<ApiResponse<StylistUser[]>> {
    return this.http.get<ApiResponse<StylistUser[]>>(`${API_URL}`, {
      params: { category }
    });
  }

  getStylistsByLocation(location: string): Observable<ApiResponse<StylistUser[]>> {
    return this.http.get<ApiResponse<StylistUser[]>>(`${API_URL}`, {
      params: { location }
    });
  }

  createStylist(stylist: Omit<StylistUser, 'id'>): Observable<ApiResponse<StylistUser>> {
    return this.http.post<ApiResponse<StylistUser>>(`${API_URL}`, stylist);
  }

  updateStylist(id: number, stylist: Partial<StylistUser>): Observable<ApiResponse<StylistUser>> {
    return this.http.put<ApiResponse<StylistUser>>(`${API_URL}/${id}`, stylist);
  }

  deleteStylist(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/${id}`);
  }

  getStylistStats(id: number): Observable<ApiResponse<{
    totalOrders: number;
    completedOrders: number;
    totalRevenue: number;
    averageRating: number;
  }>> {
    return this.http.get<ApiResponse<{
      totalOrders: number;
      completedOrders: number;
      totalRevenue: number;
      averageRating: number;
    }>>(`${API_URL}/${id}/stats`);
  }

  getStylistAvailability(id: number): Observable<ApiResponse<{
    availableDates: Date[];
    bookedDates: Date[];
  }>> {
    return this.http.get<ApiResponse<{
      availableDates: Date[];
      bookedDates: Date[];
    }>>(`${API_URL}/${id}/availability`);
  }

  updateStylistAvailability(id: number, dates: { 
    availableDates: Date[];
    bookedDates: Date[];
  }): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${API_URL}/${id}/availability`, dates);
  }

  getStylistPortfolio(id: number): Observable<ApiResponse<{
    images: string[];
    description: string;
    categories: string[];
  }>> {
    return this.http.get<ApiResponse<{
      images: string[];
      description: string;
      categories: string[];
    }>>(`${API_URL}/${id}/portfolio`);
  }

  updateStylistPortfolio(id: number, portfolio: {
    images: string[];
    description: string;
    categories: string[];
  }): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${API_URL}/${id}/portfolio`, portfolio);
  }
}
