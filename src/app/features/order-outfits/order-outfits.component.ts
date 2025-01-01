import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ImageViewSectionComponent } from 'app/shared/components/image-view-section/image-view-section.component';

@Component({
  selector: 'app-order-outfits',
  standalone:true,
  imports: [
    CommonModule,
    ImageViewSectionComponent
  ],
  templateUrl: './order-outfits.component.html',
  styleUrl: './order-outfits.component.css'
})
export class OrderOutfitsComponent {

}
