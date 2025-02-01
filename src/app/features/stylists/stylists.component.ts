import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { HeroComponent } from "../../shared/components/hero/hero.component";
import { StylistCardComponent } from '../../shared/components/stylist-card/stylist-card.component';
import { CommonModule } from '@angular/common';
import { SidebarFilterComponent } from '../../shared/components/sidebar-filter/sidebar-filter.component';
import { SignupComponent } from '../../shared/components/signup/signup.component';
import { SelectSortComponent } from '../../shared/components/select-sort/select-sort.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { StylistService } from '../../core/service/stylist.service';
import { StylistUser } from '../../shared/interfaces/stylistUser.interface';
import { Product } from '../../shared/interfaces/product.interface';
import { Review } from '../../shared/interfaces/review.interface';
import { ReviewService } from '../../core/service/review.service';



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
  stylists:  StylistUser[] = []; // Initialisé avec un tableau vide
  reviews: Review[]=[];
  categories: string[] = ['Homme', 'Femme', 'Enfant'];
  specialties: string[] = [];
  filteredStylists:   StylistUser[] =  [];


  selectedSort: string = 'popularity';  // Par défaut, tri par popularité
  selectedFilters = {
    categories: this.categories, // Par défaut, toutes les catégories sont sélectionnées
    specialties: this.specialties // Par défaut, toutes les spécialités sont sélectionnées
  };
  constructor(private stylistService: StylistService, private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.stylistService.getAllStylists().subscribe(stylists => {
      this.stylists = stylists;
      this.filteredStylists=this.stylists
      let specialtiesSet = new Set<string>();
      for(let stylist of stylists){
        specialtiesSet.add(stylist.specialty);
      }
      this.specialties = Array.from(specialtiesSet);
    });
    this.reviewService.getAllReviews().subscribe(reviews => {
      this.reviews = reviews;
    });
  }
 getProductsByStylistId(stylistId: number) : Product[] {
    const stylistEntry = this.stylists.find(entry => entry.id === stylistId);
    return stylistEntry ? stylistEntry.products : []; // Retourne les produits ou un tableau vide si non trouvé
  }

  getRating(stylistId: number = 0): number {
    let products = this.getProductsByStylistId(stylistId);

    return products? products.reduce((acc, product) => acc + product.rating, 0) / products.length: 0;
  }

  getViews(stylistId: number = 0): number {
    let products = this.getProductsByStylistId(stylistId);
    let n=0;
    for(let review_count of (this.getReviewsCount(products, this.reviews))){
      n=n+review_count.reviewCount
      // console.log(review_count.productId, review_count.reviewCount)
    };
    return n;
  }
  getReviewsCount(products: Product[], reviews: Review[]): { productId: number, reviewCount: number }[] {
    return products?products.map(product => {
      // Compte le nombre de reviews pour le produit courant
      const reviewCount = reviews.filter(review => review.product.id === product.id).length;
      
      return {
        productId: product.id,
        reviewCount: reviewCount
      };
    }):[];
  }

  applyFilters(filters: { categories: string[]; specialties: string[] }): void {
    const { categories, specialties } = filters;
    this.filteredStylists= this.stylists;
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
      this.filteredStylists = [...this.stylists].sort((a, b) => this.getViews(b.id) - this.getViews(a.id));

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
