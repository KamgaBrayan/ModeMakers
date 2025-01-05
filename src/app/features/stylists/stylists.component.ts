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
import { Product, Review } from '../garment/garment.model';


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
  stylists: Stylist[] = []; // Initialisé avec un tableau vide

  categories: string[] = ['Homme', 'Femme', 'Enfant'];
  specialties: string[] = ['Hair Stylist', 'Makeup Artist', 'Nail Technician'];
  filteredStylists: Stylist[] = [];
  
  selectedSort: string = 'popularity';  // Par défaut, tri par popularité
  selectedFilters = {
    categories: this.categories, // Par défaut, toutes les catégories sont sélectionnées
    specialties: this.specialties // Par défaut, toutes les spécialités sont sélectionnées
  };

  ngOnInit(): void {
    fetch('/datas/stylists.json')
      .then(response => response.json())
      .then((data: Stylist[]) => {
        this.stylists = data;
        this.filteredStylists = [...this.stylists];
        
        // Précharger les notes
        // this.stylists.forEach(async stylist => {
        //   stylist.rating = await this.getRating(stylist.id);
        // });
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des stylistes :", error);
      });
  }
  

  async fetchProducts(stylistId: number): Promise<Product[]> {
    try {
      const response = await fetch('/datas/products.json');
      const data: Product[] = await response.json();
      return data.filter(product => product.stylist.id === stylistId);
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }
  
  async fetchReviews(stylistId: number): Promise<Review[]> {
    try {
      const products = await this.fetchProducts(stylistId);
      const response = await fetch('/datas/reviews.json');
      const data: Review[] = await response.json();
      return data.filter(review =>
        products.some(product => review.product.product_id === product.id)
      );
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  }
  
  async getRating(stylistId: number): Promise<number> {
    try {
      const reviews = await this.fetchReviews(stylistId);
      console.log(reviews);
      if (reviews.length === 0) return 0; // Avoid division by zero
      return reviews.reduce((acc, review) => acc + review.product.product_note, 0) / reviews.length;
    } catch (error) {
      console.error("Error calculating rating:", error);
      return 0;
    }
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