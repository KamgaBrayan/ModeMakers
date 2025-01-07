import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Stylist } from '../../models/stylist.interface';


@Component({
  selector: 'app-stylist-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './stylist-card.component.html',
  styleUrls: ['./stylist-card.component.css']
}) 
export class StylistCardComponent {
  @Input() stylist!: Stylist; // Use the stylist object as an input
  @Input() rating: number = 0;
  // Méthode pour générer un tableau basé sur le rating
  getStarsArray(): number[] {
    return Array(Math.round(this.rating)).fill(0);
  }
}