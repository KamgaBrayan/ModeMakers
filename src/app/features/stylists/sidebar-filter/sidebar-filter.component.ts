import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-filter',
  imports : [CommonModule],
  templateUrl: './sidebar-filter.component.html',
  styleUrls: ['./sidebar-filter.component.css']
})
export class SidebarFilterComponent {
  @Input() categories: string[] = [];
  @Input() specialties: string[] = [];

  @Output() filtersUpdated = new EventEmitter<{ categories: string[]; specialties: string[] }>();

  selectedCategories: string[] = [];
  selectedSpecialties: string[] = [];

  ngOnInit(): void {
    // Initialiser les options sélectionnées avec toutes les catégories et spécialités
    this.selectedCategories = [...this.categories];
    this.selectedSpecialties = [...this.specialties];
  }

  toggleSelection(type: 'categories' | 'specialties', value: string): void {
    if (type === 'categories') {
      this.selectedCategories = this.toggleArray(this.selectedCategories, value);
    } else if (type === 'specialties') {
      this.selectedSpecialties = this.toggleArray(this.selectedSpecialties, value);
    }

    this.emitFilters();
  }

  toggleArray(arr: string[], value: string): string[] {
    return arr.includes(value) ? arr.filter(item => item !== value) : [...arr, value];
  }

  emitFilters(): void {
    this.filtersUpdated.emit({
      categories: this.selectedCategories,
      specialties: this.selectedSpecialties
    });
  }
}
