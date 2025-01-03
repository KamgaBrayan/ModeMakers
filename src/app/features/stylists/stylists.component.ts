import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "./navbar/navbar.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { HeroComponent } from "./hero/hero.component";
import { CardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { SelectSortComponent } from './select-sort/select-sort.component';
import { Stylist } from './stylist.model';
import { SignupComponent } from './signup/signup.component';


@Component({
  selector: 'app-stylists',
  imports: [
    CommonModule, 
    NavbarComponent, 
    BreadcrumbComponent, 
    HeroComponent, 
    CardComponent, 
    SidebarFilterComponent, 
    SelectSortComponent,
    SignupComponent, 
  ],
  templateUrl: './stylists.component.html',
  styleUrls: ['./stylists.component.css'],
  // standalone: true // This line indicates it's a standalone component
})
export class StylistsComponent implements OnInit {
  categories: string[] = ['Homme', 'Femme', 'Enfant'];
  specialties: string[] = ['Hair Stylist', 'Makeup Artist', 'Nail Technician'];

  stylists: Stylist[] = []; // Initialisé avec un tableau vide
  filteredStylists: Stylist[] = [];

  selectedSort: string = 'popularity';  // Par défaut, tri par popularité
  selectedFilters = {
    categories: this.categories, // Par défaut, toutes les catégories sont sélectionnées
    specialties: this.specialties // Par défaut, toutes les spécialités sont sélectionnées
  };

  ngOnInit(): void {
    // Chargez les stylistes depuis le fichier JSON à l'initialisation du composant
    fetch('/datas/stylists.json')
      .then(response => response.json())
      .then((data: Stylist[]) => {
        this.stylists = data; // Assurez-vous que les données sont bien récupérées et assignées à la variable stylists
        this.filteredStylists = [...this.stylists]; // Initialiser le tableau des stylistes filtrés
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des stylistes :", error);
      });
  }

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
