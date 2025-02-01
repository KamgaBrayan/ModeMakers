import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {Product} from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3001/products';

  // get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // create product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // get product by id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  // update product
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  // delete product
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${id}`);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?category=${category}`);
  }

  // Get products by gender
  getProductsByGender(gender: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?gender=${gender}`);
  }

  // Get products by stylist
  getProductsByStyliste(stylisteId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?stylisteId=${stylisteId}`);
  }

  // Get featured products
  getFeaturedProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?featured=true`);
  }

  // Search products
  searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/?q=${query}`);
  }

}
