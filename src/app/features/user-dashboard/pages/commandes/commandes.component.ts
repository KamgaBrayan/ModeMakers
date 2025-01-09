// commandes.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';


interface Order {
  id: number;
  name: string;
  stylist: string;
  price: number;
  status: 'en-attente' | 'termine' | 'en-cours' | 'accepte';
  image: string;
  description: string;
}

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  imports: [
    NgFor // Import any necessary modules or components
   ]
})
export class CommandesComponent {
  sortBy: 'popular' | 'recent' = 'popular';
  orders: Order[] = [
    {
      id: 1,
      name: 'Robe d\'été',
      stylist: 'Marie Couture',
      price: 159.99,
      status: 'en-attente',
      image: 'assets/dress-1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliq'
    },
    // Add more orders...
  ];

  getStatusClass(status: Order['status']): string {
    const classes = {
      'en-attente': 'bg-orange-100 text-orange-800',
      'termine': 'bg-green-100 text-green-800',
      'en-cours': 'bg-blue-100 text-blue-800',
      'accepte': 'bg-pink-100 text-pink-800'
    };
    return classes[status];
  }
}
