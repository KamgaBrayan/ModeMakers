import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import favoritesData from '../../utils/db.json';

export interface Delivery {
  id: number;
  day: number;
  price: number;
  type: 'standard' | 'advanced' | 'express';
}

export interface Product {
  id: number;
  name: string;
  gender: string;
  age: string;
  publishedDate: string;
  createdAt: string;
  description: string;
  category: string;
  rating: number;
  isAvailable: boolean;
  images: string[];
  delivery: Delivery[];
}

export interface Favorite {
  id: number;
  user: {
    user_id: number;
    user_name: string;
    roles: string[];
  };
  product: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  constructor(private http: HttpClient) {}

  getFavoritesByUserId(userId: number): Observable<Favorite | undefined> {
    return of(favoritesData.favorites.find(f => f.user.user_id === userId)).pipe(
      map(favorite => {
        if (!favorite) return undefined;
        return {
          ...favorite,
          product: favorite.product.map(p => ({
            ...p,
            delivery: p.delivery.map(d => ({
              ...d,
              type: d.type as 'standard' | 'advanced' | 'express'
            }))
          }))
        };
      })
    );
  }

  addToFavorites(userId: number, productId: number): Observable<void> {
    return of(void 0);
  }

  removeFromFavorites(userId: number, productId: number): Observable<void> {
    return of(void 0);
  }
}
