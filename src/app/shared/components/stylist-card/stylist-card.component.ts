import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StylistUser } from '../../interfaces/stylistUser.interface';
import { ReviewService } from '../../../core/service/review.service';
import { ProductService } from '../../../core/service/product.service';
import { Product } from '../../interfaces/product.interface';
import { Review } from '../../interfaces/review.interface';


@Component({
  selector: 'app-stylist-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './stylist-card.component.html',
  styleUrls: ['./stylist-card.component.css']
}) 
export class StylistCardComponent {
  @Input() stylist!: StylistUser; // Use the stylist object as an input
  @Input() rating: number = 0;
  
  // Méthode pour générer un tableau basé sur le rating
  getStarsArray(): number[] {
    return Array(Math.round(this.rating)).fill(0);
  }
}