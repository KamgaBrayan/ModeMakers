import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterSectionComponent } from 'app/shared/components/filter-section/filter-section.component';
import { BannerSectionComponent } from 'app/shared/components/banner-section/banner-section.component';
import { ProductCardComponent } from 'app/shared/components/product-card/product-card.component';
import { NewsletterSectionComponent } from 'app/shared/components/newsletter-section/newsletter-section.component';

@Component({
  selector: 'app-explore-outfits',
  standalone:true,
  imports: [
    CommonModule,
    FilterSectionComponent,
    BannerSectionComponent,
    ProductCardComponent,
    NewsletterSectionComponent
  ],
  templateUrl: './explore-outfits.component.html',
  styleUrl: './explore-outfits.component.css'
})
export class ExploreOutfitsComponent {
  title = 'Filter'
}
