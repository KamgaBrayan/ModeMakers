import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse, CreateNotificationRequest} from '../../shared/interfaces/apiRequest.interface';
import {HttpClient} from '@angular/common/http';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getUserNotifications(userId: number): Observable<ApiResponse<Notification[]>> {
    return this.http.get<ApiResponse<Notification[]>>(`${API_URL}/user/${userId}/notifications`);
  }

  deleteNotification(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/notification/${id}`);
  }

  createNotification(notification: CreateNotificationRequest): Observable<ApiResponse<Notification>> {
    return this.http.post<ApiResponse<Notification>>(`${API_URL}/notification`, notification);
  }

  getNotificationById(id: number): Observable<ApiResponse<Notification>> {
    return this.http.get<ApiResponse<Notification>>(`${API_URL}/notification/${id}`);
  }
}
