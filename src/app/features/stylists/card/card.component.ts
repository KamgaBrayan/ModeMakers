import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Stylist {
  name: string;
  image: string;
  specialty: string;
  rating: number;
}


@Component({
  selector: 'app-card',
  imports: [CommonModule],
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