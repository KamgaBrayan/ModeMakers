import { Component } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { HeroComponent } from "./hero/hero.component";
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { SelectSortComponent } from './select-sort/select-sort.component';

interface Stylist {
  name: string;
  specialty: string;
  image: string;
  rating: number;
  category: string[];
  views: number; 
}

@Component({
  selector: 'app-stylists',
  imports: [CommonModule,NavbarComponent, BreadcrumbComponent, HeroComponent, CardComponent, SidebarFilterComponent, SelectSortComponent],
  templateUrl: './stylists.component.html',
  styleUrl: './stylists.component.css',
  // standalone: true // This line indicates it's a standalone component
})

export class StylistsComponent {
  categories: string[] = ['Homme', 'Femme', 'Enfant'];
  specialties: string[] = ['Hair Stylist', 'Makeup Artist', 'Nail Technician'];

  stylists: Stylist[] = [
    { 
      name: 'John Doe', 
      specialty: 'Hair Stylist', 
      rating: 4.5, 
      image: '/images/stylists/stylist_1.jpg', 
      category: ['Homme', 'Femme'] ,
      views: 120
    },
    { 
      name: 'Jane Smith', 
      specialty: 'Makeup Artist', 
      rating: 4.8, 
      image: '/images/stylists/stylist_1.jpg', 
      category: ['Femme', 'Enfant'],
      views: 320 
    },
    { 
      name: 'Emily Johnson', 
      specialty: 'Nail Technician', 
      rating: 4.7, 
      image: '/images/stylists/stylist_1.jpg', 
      category: ['Homme', 'Femme', 'Enfant'],
      views: 220 
    }
  ];

  filteredStylists: Stylist[] = [...this.stylists];
  
  selectedSort: string = 'popularity';  // Par défaut, tri par popularité
  selectedFilters = {
    categories: this.categories, // Par défaut, toutes les catégories sont sélectionnées
    specialties: this.specialties // Par défaut, toutes les spécialités sont sélectionnées
  };

  applyFilters(filters: { categories: string[]; specialties: string[] }): void {
    const { categories, specialties } = filters;

    this.filteredStylists = this.stylists.filter(stylist =>
      stylist.category.some(cat => categories.includes(cat)) &&
      specialties.includes(stylist.specialty)
    );
  }
  applySort(sortType: string) {
    this.selectedSort = sortType;
    if (sortType === 'popularity') {
      this.filteredStylists = [...this.stylists].sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'trending') {
      this.filteredStylists = [...this.stylists].sort((a, b) => b.views - a.views);
    }
  }
  // Méthode pour obtenir le texte dynamique à afficher pour le tri et les filtres
  getFilterText(): string {
    const sortText = this.selectedSort === 'popularity' ? 'Les plus populaires' : 'Les plus tendances';
    
    const categoriesText = this.selectedFilters.categories.length === this.categories.length ? 'Toute catégorie' : 'Catégories filtrées';
    const specialtiesText = this.selectedFilters.specialties.length === this.specialties.length ? 'Toutes les spécialités' : 'Spécialités filtrées';
    
    return `${sortText} / ${categoriesText} / ${specialtiesText}`;
  }

  
}
