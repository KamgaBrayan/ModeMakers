import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderDetailsSectionComponent } from 'app/shared/components/order-details-section/order-details-section.component';
import { OrderOutfitsImageSectionComponent } from 'app/shared/components/order-outfits-image-section/order-outfits-image-section.component';

@Component({
  selector: 'app-order-outfits',
  standalone:true,
  imports: [
    CommonModule,
    OrderOutfitsImageSectionComponent,
    OrderDetailsSectionComponent
  ],
  templateUrl: './order-outfits.component.html',
  styleUrl: './order-outfits.component.css'
})
export class OrderOutfitsComponent {

}
