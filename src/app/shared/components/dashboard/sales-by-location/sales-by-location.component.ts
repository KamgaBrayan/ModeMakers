import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales-by-location',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-semibold">Sales by Location</h3>
        <button class="text-gray-400 hover:text-gray-600">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
      
      <div class="space-y-4">
        <div *ngFor="let location of salesByLocation" class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <img [src]="'assets/flags/' + location.country.toLowerCase() + '.svg'" 
                 [alt]="location.country"
                 class="w-6 h-6 rounded-full">
            <div>
              <p class="font-medium">{{location.country}}</p>
              <p class="text-sm text-gray-500">{{location.city}}</p>
            </div>
          </div>
          <p class="font-medium">{{location.sales | number}}</p>
        </div>
      </div>
    </div>
  `
})
export class SalesByLocationComponent {
  salesByLocation = [
    {
      country: 'United States',
      city: 'New York',
      sales: 45000
    },
    {
      country: 'France',
      city: 'Paris',
      sales: 35000
    },
    {
      country: 'Japan',
      city: 'Tokyo',
      sales: 25000
    },
    {
      country: 'Brazil',
      city: 'São Paulo',
      sales: 15000
    }
  ];
}
