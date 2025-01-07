import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Stylist } from '../../models/stylist.interface';

@Component({
  selector: 'app-description-stylist',
  imports: [CommonModule, RouterModule],
  templateUrl: './description-stylist.component.html',
  styleUrls: ['./description-stylist.component.css']
})
export class DescriptionStylistComponent {
  @Input() stylist!: Stylist; // Accept stylist data as input
  @Input() rating: number = 0; // Accept rating as input

  getStarsArray(): number[] {
    return Array(Math.round(this.rating)).fill(0);
  }
}