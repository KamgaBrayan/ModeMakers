import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterSectionComponent } from 'app/shared/components/filter-section/filter-section.component';

@Component({
  selector: 'app-explore-outfits',
  standalone:true,
  imports: [
    CommonModule,
    FilterSectionComponent
  ],
  templateUrl: './explore-outfits.component.html',
  styleUrl: './explore-outfits.component.css'
})
export class ExploreOutfitsComponent {
  title = 'Filter'
}
