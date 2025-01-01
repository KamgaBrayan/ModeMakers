import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filter-section',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './filter-section.component.html',
  styleUrl: './filter-section.component.css'
})
export class FilterSectionComponent {
  @Input() title : string = 'Filter';
}
