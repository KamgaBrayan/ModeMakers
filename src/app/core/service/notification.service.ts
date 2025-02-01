import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse, CreateNotificationRequest} from '../../shared/interfaces/apiRequest.interface';
import {HttpClient} from '@angular/common/http';
import { Notification } from '../../shared/interfaces/notification.interface.js';

const API_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) {}

  getUserNotifications(userId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${API_URL}/notifications`);
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/notification/${id}`);
  }

  createNotification(notification: CreateNotificationRequest): Observable<ApiResponse<Notification>> {
    return this.http.post<ApiResponse<Notification>>(`${API_URL}/notification`, notification);
  }

  getNotificationById(id: number): Observable<Notification> {
    return this.http.get<Notification>(`${API_URL}/notification/${id}`);
  }
}
