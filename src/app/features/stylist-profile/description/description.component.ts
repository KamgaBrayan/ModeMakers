import { CommonModule } from '@angular/common';
import { Component, input, Input } from '@angular/core';

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
  @Input() rating: number = 0; // Accept rating as input

  getStarsArray(): number[] {
    return Array(Math.round(this.rating)).fill(0);
  }
}