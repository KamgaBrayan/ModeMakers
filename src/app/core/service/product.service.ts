import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiResponse, CreateProductRequest, UpdateProductRequest } from '../../shared/interfaces/apiRequest.interface';
import { Product } from '../../shared/interfaces/product.interface';

const API_URL = 'http://localhost:3000/products';

export interface ProductStats {
  totalRevenue: number;
  totalSales: number;
  totalModels: number;
  salesProgress: number;
}

export interface ProductFilter {
  category?: string;
  stock?: 'all' | 'inStock' | 'outOfStock';
  priceRange?: string;
}

export interface TopSellingModel {
  id: number;
  name: string;
  image: string;
  sales: number;
  amount: number;
  price: number;
  status: 'In Stock' | 'Out of Stock';
}

export interface LocationSales {
  location: string;
  sales: number;
  percentage: number;
}

export interface DashboardStats {
  totalRevenue: number;
  totalSales: number;
  totalModels: number;
  salesProgress: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}`);
  }

  createProduct(product: CreateProductRequest): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${API_URL}`, product);
  }

  updateProduct(id: number, product: UpdateProductRequest): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${API_URL}/${id}`, product);
  }

  getProductById(id: number): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${API_URL}/${id}`);
  }

  deleteProduct(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/${id}`);
  }

  getStylistProducts(stylistId: number): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}/stylists/${stylistId}`);
  }

  getProductsByCategory(category: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}`, {
      params: { category }
    });
  }

  getProductsByGender(gender: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}`, {
      params: { gender }
    });
  }

  getTopSellingProducts(limit: number = 5): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}/top-selling`, {
      params: { limit: limit.toString() }
    });
  }

  getProductsWithPagination(page: number = 1, pageSize: number = 10): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  getFavoriteProducts(userId: number): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}/favorites/${userId}`);
  }

  addToFavorites(userId: number, productId: number): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${API_URL}/favorites/${userId}/${productId}`, {});
  }

  removeFromFavorites(userId: number, productId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${API_URL}/favorites/${userId}/${productId}`);
  }

  getProductStats(): Observable<ApiResponse<ProductStats>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}`).pipe(
      map(response => {
        const products = response.data;
        return {
          success: true,
          status: 200,
          message: 'Product stats retrieved successfully',
          data: {
            totalRevenue: products.reduce((sum, product) => sum + (product.delivery[0].price || 0), 0),
            totalSales: products.length,
            totalModels: products.length,
            salesProgress: Math.min(
              (products.filter(p => p.isAvailable).length / products.length) * 100,
              100
            )
          }
        };
      })
    );
  }

  filterProducts(products: Product[], filters: ProductFilter): Product[] {
    return products.filter(product => {
      let matches = true;
      if (filters.category && filters.category !== 'all') {
        matches = matches && product.category === filters.category;
      }
      if (filters.stock && filters.stock !== 'all') {
        matches = matches && product.isAvailable === (filters.stock === 'inStock');
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        matches = matches && product.delivery[0].price >= min && product.delivery[0].price <= max;
      }
      return matches;
    });
  }

  getTopSellingModels(page: number = 1, pageSize: number = 5): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}/top-selling`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    });
  }

  getSalesByLocation(): Observable<ApiResponse<LocationSales[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}/stats/location`).pipe(
      map(response => {
        const products = response.data;
        const locations = ['North', 'South', 'East', 'West', 'Central'];
        const totalSales = products.reduce((sum, p) => sum + (p.rating || 0), 0);
        
        const locationSales = locations.map(location => {
          const sales = Math.floor(Math.random() * 1000); // In real app, this would come from the backend
          return {
            location,
            sales,
            percentage: Math.round((sales / totalSales) * 100)
          };
        });

        return {
          success: true,
          status: 200,
          message: 'Sales by location retrieved successfully',
          data: locationSales
        };
      })
    );
  }

  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<Product[]>>(`${API_URL}/stats`).pipe(
      map(response => {
        const products = response.data;
        return {
          success: true,
          status: 200,
          message: 'Dashboard stats retrieved successfully',
          data: {
            totalRevenue: products.reduce((sum, product) => sum + (product.delivery[0].price || 0), 0),
            totalSales: products.length,
            totalModels: products.length,
            salesProgress: Math.min(
              (products.filter(p => p.isAvailable).length / products.length) * 100,
              100
            )
          }
        };
      })
    );
  }

  filterTopSellingModels(products: TopSellingModel[], filters: ProductFilter): TopSellingModel[] {
    return products.filter(product => {
      let matches = true;
      if (filters.category && filters.category !== 'all') {
        matches = matches && product.status === filters.category;
      }
      if (filters.stock && filters.stock !== 'all') {
        matches = matches && product.status === (filters.stock === 'inStock' ? 'In Stock' : 'Out of Stock');
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        matches = matches && product.price >= min && product.price <= max;
      }
      return matches;
    });
  }
}
