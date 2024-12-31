import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Stylist {
  id: number;
  name: string;
  photos: string[]
  specialty: string;
  rating: number;
  category: string[];
  views: number; 
}


@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() stylist!: Stylist; // Use the stylist object as an input
  // Méthode pour générer un tableau basé sur le rating
  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}