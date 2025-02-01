import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesService} from '../../../../core/service/favorites.service';
import {CardProductComponent} from "../../../../shared/components/card-product/card-product.component";
import {Product} from "../../../../shared/interfaces/product.interface";

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule, FormsModule, CardProductComponent],
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
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

              <div *ngIf="favorites.length === 0" class="text-center py-8 mt-4">
                  <h2 class="text-2xl font-semibold text-gray-600 mb-2">No Favorites Found</h2>
                  <p class="text-gray-500">Try adjusting your filters or add some products to your favorites!</p>
              </div>

              <app-card-product
                  *ngFor="let product of favorites"
                  [product]="product"
                  [productId]="product.id">
              </app-card-product>
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
  favorites: Product[] = [];
  filters = {
    gender: { male: false, female: false },
    age: { adult: false, children: false },
    price: { min: null as number | null, max: null as number | null },
    size: { small: false, medium: false, large: false }
  };

  constructor(private favoritesService: FavoritesService) {}

    ngOnInit() {
        this.loadFavorites();
    }

  loadFavorites() {
      this.favoritesService.getFavorites().subscribe(favorites => {
          this.favorites = favorites;
          this.applyFilters();
      })
  }

  applyFilters() {
    let filtered = [...this.favorites];

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

    this.favorites = filtered;
  }
}
