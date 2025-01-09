import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService, Product } from '../../../../core/services/favorites.service';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold">My Favorites</h1>
        <div class="relative">
          <select [(ngModel)]="sortBy" class="bg-white border rounded-md px-4 py-2 appearance-none pr-8">
            <option value="popular">Sort by: Popular</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
          <div class="absolute right-2 top-1/2 -translate-y-1/2">
            <i class="bi bi-chevron-down text-gray-600"></i>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filters -->
        <div class="w-full lg:w-1/4 h-fit">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 class="font-semibold text-lg mb-6">Filters</h2>

            <!-- Gender -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Gender</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.gender.male" 
                         class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Male</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.gender.female" 
                         class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Female</span>
                </label>
              </div>
            </div>

            <!-- Age group -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Age group</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.age.adult" 
                         class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Adult</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.age.children" 
                         class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Children</span>
                </label>
              </div>
            </div>

            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Price Range</h3>
              <div class="flex gap-4">
                <div class="flex-1">
                  <input type="number" [(ngModel)]="filters.price.min" 
                         placeholder="Min" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div class="flex-1">
                  <input type="number" [(ngModel)]="filters.price.max" 
                         placeholder="Max" class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Size -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Size</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.size.small" 
                         class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Small</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.size.medium" 
                         class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Medium</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" [(ngModel)]="filters.size.large" 
                         class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Large</span>
                </label>
              </div>
            </div>

            <button (click)="applyFilters()" 
                    class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div *ngFor="let product of filteredProducts" 
                 class="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div class="relative aspect-square overflow-hidden">
                <img [src]="product.images[0]"
                     [alt]="product.name"
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
                <button (click)="removeFromFavorites(product.id)" 
                        class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                  <i class="bi bi-heart-fill text-red-500"></i>
                </button>
              </div>

              <div class="p-4">
                <h3 class="font-semibold text-lg">{{product.name}}</h3>
                <div class="flex gap-2 text-sm text-gray-600 mt-1">
                  <span>{{product.gender}}</span>
                  <span>•</span>
                  <span>{{product.age}}</span>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <div class="flex items-center">
                    <i class="bi bi-star-fill text-yellow-400 mr-1"></i>
                    <span class="font-medium">{{product.rating}}</span>
                  </div>
                  <span [class]="product.isAvailable ? 
                                'bg-green-100 text-green-800' : 
                                'bg-red-100 text-red-800'" 
                        class="px-2 py-1 rounded-full text-xs font-medium">
                    {{product.isAvailable ? 'In Stock' : 'Out of Stock'}}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div *ngIf="filteredProducts.length === 0" 
               class="text-center py-12">
            <i class="bi bi-heart text-6xl text-gray-300 mb-4"></i>
            <h2 class="text-2xl font-semibold text-gray-600 mb-2">No Favorites Found</h2>
            <p class="text-gray-500">Try adjusting your filters or add some products to your favorites!</p>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FavorisComponent implements OnInit {
  favoriteProducts: Product[] = [];
  filteredProducts: Product[] = [];
  sortBy = 'popular';
  filters = {
    gender: { male: false, female: false },
    age: { adult: false, children: false },
    price: { min: null as number | null, max: null as number | null },
    size: { small: false, medium: false, large: false }
  };

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    const userId = 2; // In a real app, get from auth service
    this.loadFavorites(userId);
  }

  loadFavorites(userId: number) {
    this.favoritesService.getFavoritesByUserId(userId)
      .subscribe(favorites => {
        if (favorites) {
          this.favoriteProducts = favorites.product;
          this.applyFilters();
        }
      });
  }

  applyFilters() {
    let filtered = [...this.favoriteProducts];

    // Apply gender filter
    if (this.filters.gender.male || this.filters.gender.female) {
      filtered = filtered.filter(p => 
        (this.filters.gender.male && p.gender.toLowerCase() === 'male') ||
        (this.filters.gender.female && p.gender.toLowerCase() === 'female')
      );
    }

    // Apply age filter
    if (this.filters.age.adult || this.filters.age.children) {
      filtered = filtered.filter(p => 
        (this.filters.age.adult && p.age.toLowerCase().includes('adult')) ||
        (this.filters.age.children && p.age.toLowerCase().includes('children'))
      );
    }

    // Apply price filter
    if (this.filters.price.min !== null || this.filters.price.max !== null) {
      filtered = filtered.filter(p => {
        const price = p.delivery[0].price; // Using first delivery option price
        const min = this.filters.price.min ?? -Infinity;
        const max = this.filters.price.max ?? Infinity;
        return price >= min && price <= max;
      });
    }

    // Apply sorting
    switch (this.sortBy) {
      case 'priceAsc':
        filtered.sort((a, b) => a.delivery[0].price - b.delivery[0].price);
        break;
      case 'priceDesc':
        filtered.sort((a, b) => b.delivery[0].price - a.delivery[0].price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    this.filteredProducts = filtered;
  }

  removeFromFavorites(productId: number) {
    const userId = 2; // In a real app, get from auth service
    this.favoritesService.removeFromFavorites(userId, productId)
      .subscribe(() => {
        this.favoriteProducts = this.favoriteProducts.filter(p => p.id !== productId);
        this.applyFilters();
      });
  }
}
