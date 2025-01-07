import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { HeroComponent } from "../../shared/components/hero/hero.component";
import { StylistCardComponent } from '../../shared/components/stylist-card/stylist-card.component';
import { CommonModule } from '@angular/common';
import { SidebarFilterComponent } from '../../shared/components/sidebar-filter/sidebar-filter.component';
import { SignupComponent } from '../../shared/components/signup/signup.component';
import { SelectSortComponent } from '../../shared/components/select-sort/select-sort.component';
import { Stylist } from '../../shared/models/stylist.interface';
import { Review } from '../../shared/models/review.interface';
import { Product } from '../../shared/models/product_.interface';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';


@Component({
  selector: 'app-stylists',
  imports: [
    NavbarComponent,
    CommonModule, 
    BreadcrumbComponent, 
    HeroComponent,       
    StylistCardComponent,        
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
  reviews: Review[] = [];
  products: Product[] = [];
  categories: string[] = ['Homme', 'Femme', 'Enfant'];
  specialties: string[] = ['Hair Stylist', 'Makeup Artist', 'Nail Technician'];
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
      this.fetchProducts();
      this.fetchReviews();
  }

  fetchProducts(){
    // Fetch products from the JSON file
    fetch('/datas/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        this.products = data;
        
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }
  fetchReviews() {
    fetch('/datas/reviews.json') // Adjust the path as necessary
      .then(response => response.json())
      .then((data: Review[]) => {
        this.reviews = data;
      // Assign the fetched reviews to the component's array
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }

  getRating(stylistId: number = 0) : number {
    let reviews : Review[] = [];
    let products : Product[] = [];
    products = this.products.filter(product => product.stylist.id === stylistId);
    for (let product of products){
      for(let review of this.reviews){
        if(review.product.product_id === product.id){
          reviews.push(review); // Add the review to the array=
        }
      }
    }
    return  reviews.reduce((acc, review) => acc + review.product.product_note, 0) / reviews.length;
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
      this.filteredStylists = [...this.stylists].sort((a, b) => this.getRating(b.id) - this.getRating(a.id));
    } else if (sortType === 'trending') {
      this.filteredStylists = [...this.stylists].sort((a, b) => b.views - a.views);
      
    }
  }

  // Méthode pour obtenir le texte dynamique à afficher pour le tri et les filtres
  getFilterText(): string {
    const sortText = this.selectedSort === 'popularity' ? 'Most Populars' : 'Most on trendind';
    
    const categoriesText = this.selectedFilters.categories.length === this.categories.length ? 'All categories' : 'Filtred Categories';
    const specialtiesText = this.selectedFilters.specialties.length === this.specialties.length ? 'All specialities' : 'Filtred Specialities';
    
    return `${sortText} / ${categoriesText} / ${specialtiesText}`;
  }
}
