import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, CreateReviewRequest } from '../../shared/interfaces/apiRequest.interface';
import { Review } from '../../shared/interfaces/review.interface';

const API_URL = 'http://localhost:3001';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  getProductReviews(productId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${API_URL}/product/${productId}/reviews`);
  }

  getAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${API_URL}/reviews`);
  }

  createReview(review: CreateReviewRequest): Observable<ApiResponse<Review>> {
    return this.http.post<ApiResponse<Review>>(`${API_URL}/review`, review);
  }
}
