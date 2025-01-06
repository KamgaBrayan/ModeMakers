import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Stylist } from '../stylist-profile.model';

@Component({
  selector: 'app-description',
  imports: [CommonModule, RouterModule],
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