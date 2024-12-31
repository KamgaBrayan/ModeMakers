import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

interface Stylist {
  name: string;
  rating: number;
  localisation: string;
  phone: string;
  biography: string;
  category: string[];
  specialty: string;
  photos: string[];
}
 
@Component({
  selector: 'app-description',
  imports: [CommonModule],
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent {
  @Input() stylist!: Stylist; // Accept stylist data as input
  getStarsArray(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}