// favoris.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-favoris',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-bold">Mes Favoris</h1>
        <div class="relative">
          <select class="bg-white border rounded-md px-4 py-2 appearance-none pr-8">
            <option>Sort by: Popular</option>
            <option>Prix: Croissant</option>
            <option>Prix: Décroissant</option>
          </select>
          <div class="absolute right-2 top-1/2 -translate-y-1/2">
            <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Filtres -->
        <div class="w-full lg:w-1/4 h-fit">
          <div class="bg-white rounded-lg shadow-sm p-6 sticky top-6">
            <h2 class="font-semibold text-lg mb-6">Filter</h2>

            <!-- Genre -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Gender</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" checked class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Male</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" checked class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Female</span>
                </label>
              </div>
            </div>

            <!-- Age group -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Age group</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" checked class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Adult</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" checked class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Children</span>
                </label>
              </div>
            </div>

            <!-- Prix -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Price</h3>
              <div class="flex gap-4">
                <div class="flex-1">
                  <input type="number" placeholder="Min" class="w-full px-3 py-2 border rounded-md">
                </div>
                <div class="flex-1">
                  <input type="number" placeholder="Max" class="w-full px-3 py-2 border rounded-md">
                </div>
              </div>
            </div>

            <!-- Taille -->
            <div class="mb-6">
              <h3 class="font-medium mb-3">Size</h3>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Small</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Medium</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox text-indigo-600 rounded">
                  <span class="ml-2">Large</span>
                </label>
              </div>
            </div>

            <button class="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Appliquer les filtres
            </button>
          </div>
        </div>

        <!-- Grille de produits -->
        <div class="flex-1">
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div *ngFor="let i of [1,2,3,4]" class="bg-white rounded-lg shadow-sm overflow-hidden group">
              <div class="relative aspect-square overflow-hidden">
                <img
                  src="assets/images/blouse-skirt.jpg"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt="Blouse and belted skirt">
                <button class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>

              <div class="p-4">
                <h3 class="font-semibold text-lg">Blouse and belted skirt</h3>
                <div class="flex gap-2 text-sm text-gray-600 mt-1">
                  <span>Female</span>
                  <span>•</span>
                  <span>Ranges</span>
                </div>
                <div class="mt-2 flex items-center justify-between">
                  <span class="font-bold text-lg">N₦ 900,000</span>
                  <button class="text-indigo-600 hover:text-indigo-800">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class FavorisComponent {}
