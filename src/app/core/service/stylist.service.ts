import { Injectable } from '@angular/core';
import {ApiResponse} from '../../shared/interfaces/apiRequest.interface';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StylistUser} from '../../shared/interfaces/stylistUser.interface';
import { Product } from '../../shared/interfaces/product.interface';

const API_URL = 'http://localhost:3000/stylists';

@Injectable({
  providedIn: 'root'
})
export class StylistService {

  constructor(private http: HttpClient) {}

  getAllStylists(): Observable<StylistUser[]> {
    return this.http.get<StylistUser[]>(`${API_URL}`);
  }

  getStylistById(id: number): Observable<StylistUser> {
    return this.http.get<StylistUser>(`${API_URL}/${id}`);
  }

  updateStylist(id: number, stylist: Partial<StylistUser>): Observable<ApiResponse<StylistUser>> {
    return this.http.put<ApiResponse<StylistUser>>(`${API_URL}/${id}`, stylist);
  }

  registerStylist(stylist: Omit<StylistUser, 'id'>): Observable<ApiResponse<StylistUser>> {
    return this.http.post<ApiResponse<StylistUser>>(`${API_URL}/register`, stylist);
  }

  // getStylistProducts(stylistId: number): Observable<Product[]> {
  //   return this.http.get<Product[]>(`${API_URL}/${stylistId}`).pipe(
  //     map((stylist: StylistUser)  => stylist.products)
  //   );
  // }

}
