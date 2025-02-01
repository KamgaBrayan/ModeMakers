import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {
    private favorites: Product[] = [];
    private favoritesSubject = new BehaviorSubject<Product[]>([]);

    constructor() {
        // Load favorites from localStorage on service initialization
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            this.favorites = JSON.parse(savedFavorites);
            this.favoritesSubject.next(this.favorites);
        }
    }

    getFavorites(): Observable<Product[]> {
        return this.favoritesSubject.asObservable();
    }

    toggleFavorite(product: Product): boolean {
        const index = this.favorites.findIndex(p => p.id === product.id);

        if (index === -1) {
            // Add to favorites
            this.favorites.push(product);
        } else {
            // Remove from favorites
            this.favorites.splice(index, 1);
        }

        // Save to localStorage and update subscribers
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.favoritesSubject.next(this.favorites);

        return index === -1; // Return true if added, false if removed
    }

    isFavorite(productId: number): boolean {
        return this.favorites.some(p => p.id === productId);
    }
}
