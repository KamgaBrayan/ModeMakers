import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Stylist } from './card.model';
import { Review } from '../../garment/garment.model';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() stylist!: Stylist; // Use the stylist object as an input
  @Input() rating: number = 0;
  // Méthode pour générer un tableau basé sur le rating
  getStarsArray(): number[] {
    return Array(Math.round(this.rating)).fill(0);
  }
}