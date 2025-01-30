import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse, CreateMaterial, UpdateMaterial} from '../../shared/interfaces/apiRequest.interface';
import {HttpClient} from '@angular/common/http';
import {Material} from '../../shared/interfaces/material.interface';

const API_URL = 'http://localhost:3000/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) {}

  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${API_URL}`);
  }

  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${API_URL}/${id}`);
  }
  createMaterial(id: number, material: CreateMaterial): Observable<ApiResponse<Material>> {
    return this.http.put<ApiResponse<Material>>(`${API_URL}/${id}`, material);
  }

  updateMaterial(id: number, material: UpdateMaterial): Observable<ApiResponse<Material>> {
    return this.http.put<ApiResponse<Material>>(`${API_URL}/${id}`, material);
  }

  deleteMaterial(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
