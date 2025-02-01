import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TopSellingModel } from '../../shared/models/top-selling-model';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3001';
  private productsUrl = 'http://localhost:3001/products';
  private ordersUrl = 'http://localhost:3001/orders';

  constructor(private http: HttpClient) { }

  getTopSellingProducts(): Observable<TopSellingModel[]> {
    return this.http.get<Product[]>(this.apiUrl + '/products')
      .pipe(
        map(products => {
          return products
            .sort((a, b) => (b.numberReviews || 0) - (a.numberReviews || 0))
            .slice(0, 5)
            .map(product => ({
              id: product.id,
              name: product.name,
              image: product.images?.[0] || '',
              sales: product.numberReviews || 0,
              amount: (product.numberReviews || 0) * (product.price || 0),
              price: product.price || 0,
              status: product.inStock ? 'In Stock' : 'Out of Stock'
            }));
        })
      );
  }

  getTopSellingModels(page: number = 1, pageSize: number = 5): Observable<any[]> {
    return this.http.get<any[]>(this.productsUrl).pipe(
      map(products => {
        // Generate random sales numbers for demonstration
        return products.map(product => ({
          ...product,
          sales: Math.floor(Math.random() * 1000) + 100,
          stockStatus: product.inStock ? 'In Stock' : 'Out of Stock'
        }));
      }),
      map(products => {
        // Implement pagination
        const start = (page - 1) * pageSize;
        return products.slice(start, start + pageSize);
      })
    );
  }

  getRecentOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/preOrders')
      .pipe(
        map(precommands =>
          precommands
            .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
            .slice(0, 5)
            .map(order => ({
              ...order,
              status: order.status || 'Pending'
            }))
        )
      );
  }

  getRecentOrdersWithPagination(page: number = 1, pageSize: number = 5): Observable<any[]> {
    return this.http.get<any[]>(this.ordersUrl).pipe(
      map(orders => {
        // Sort orders by date (most recent first)
        return orders.sort((a: any, b: any) =>
          new Date(b.payment.createdAt).getTime() - new Date(a.payment.createdAt).getTime()
        );
      }),
      map(orders => {
        // Implement pagination
        const start = (page - 1) * pageSize;
        return orders.slice(start, start + pageSize);
      })
    );
  }

  getSalesByLocation(): Observable<any[]> {
    return this.http.get<Product[]>(this.apiUrl + '/products')
      .pipe(
        map(products => {
          const locations = ['North', 'South', 'East', 'West', 'Central'];
          const totalSales = products.reduce((sum, p) => sum + (p.numberReviews || 0), 0);

          return locations.map(location => {
            const sales = Math.floor(Math.random() * 1000);
            return {
              location,
              sales,
              percentage: Math.round((sales / totalSales) * 100)
            };
          });
        })
      );
  }

  getDashboardStats(): Observable<any> {
    return this.http.get<Product[]>(this.apiUrl + '/products')
      .pipe(
        map(products => ({
          totalRevenue: products.reduce((sum, product) => sum + (product.price || 0), 0),
          totalSales: products.length,
          totalModels: products.length,
          salesProgress: Math.min(
            (products.filter(p => p.inStock).length / products.length) * 100,
            100
          )
        }))
      );
  }

  filterTopSellingModels(products: any[], filters: any): any[] {
    return products.filter(product => {
      let matches = true;
      if (filters.category && filters.category !== 'all') {
        matches = matches && product.category === filters.category;
      }
      if (filters.stock && filters.stock !== 'all') {
        matches = matches && product.inStock === (filters.stock === 'inStock');
      }
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        matches = matches && product.price >= min && product.price <= max;
      }
      return matches;
    });
  }

  filterRecentOrders(orders: any[], filters: any): any[] {
    return orders.filter(order => {
      let matches = true;
      if (filters.status && filters.status !== 'all') {
        matches = matches && order.payment.status === filters.status;
      }
      if (filters.paymentMethod && filters.paymentMethod !== 'all') {
        matches = matches && order.payment.paymentMethod === filters.paymentMethod;
      }
      if (filters.dateRange) {
        const orderDate = new Date(order.payment.createdAt);
        matches = matches && orderDate >= filters.dateRange.start && orderDate <= filters.dateRange.end;
      }
      return matches;
    });
  }
}
