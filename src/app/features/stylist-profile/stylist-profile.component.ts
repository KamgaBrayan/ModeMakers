import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { SelectSortComponent } from '../../shared/components/select-sort/select-sort.component';
import { AvailabilityComponent } from '../../shared/components/availability/availability.component';
import { ReviewsComponent } from '../../shared/components/reviews/reviews.component'
import { SignupComponent } from "../../shared/components/signup/signup.component";
import { DescriptionStylistComponent } from '../../shared/components/description-stylist/description-stylist.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { StylistService } from '../../core/service/stylist.service';
import { ReviewService } from '../../core/service/review.service';
import { StylistUser } from '../../shared/interfaces/stylistUser.interface';
import { Product } from '../../shared/interfaces/product.interface';
import { Review } from '../../shared/interfaces/review.interface';

@Component({
  selector: 'app-stylist-profile',
  imports: [
    NavbarComponent,
    CommonModule,
    BreadcrumbComponent,
    DescriptionStylistComponent,
    ProductCardComponent,
    SelectSortComponent,
    AvailabilityComponent,
    ReviewsComponent,
    SignupComponent
  ],
  templateUrl: './stylist-profile.component.html',
  styleUrls: ['./stylist-profile.component.css']
})
export class StylistProfileComponent implements OnInit {
  stylist!: StylistUser;
  products: Product[] = []; // Initialize the products array
  selectedSort: string = 'popularity';  // Par défaut, tri par popularité
  filteredProducts: Product[] = [];
  reviews: Review[] = [];
  stylistReviews: Review[] = [];
  rating: number = 0;

  constructor(private route: ActivatedRoute,
    private stylistService: StylistService,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.stylistService.getStylistById(Number(id)).subscribe(stylist => {
    this.stylist = stylist;
    this.filteredProducts = stylist.products;
    this.products = this.stylist.products;
      console.log(this.products)

    for (let product of this.stylist.products) {
      for (let review of this.getProductReviews(product.id)) {
        this.stylistReviews.push(review);
      }
    }

    this.rating = this.products ? this.products.reduce((acc, product) => acc + product.rating, 0) / this.products.length : 0;
    });
    this.reviewService.getAllReviews().subscribe(reviews => {
      this.reviews = reviews;
    });

    
  }
  getProductRating(productId: number): number {
    let productReviews = this.getProductReviews(productId);
    if (productReviews.length > 0) {
      return (
        productReviews.reduce((acc, review) => acc + review.product.rating, 0) /
        productReviews.length
      );
    }
    return 0; // Aucun avis pour ce produit
  }
  getProductReviews(productId: number): Review[] {
    let reviews: Review[] = [];
    for (let review of this.reviews) {
      if (review.product.id === productId) {
        reviews.push(review)
      }
    }
    return reviews
  }

  applySort(sortType: string): void {
    this.selectedSort = sortType;
    if (sortType === 'popularity') {
      this.filteredProducts = [...this.products].sort(
        (a, b) => this.getProductRating(b.id) - this.getProductRating(a.id)
      );
    } else if (sortType === 'trending') {
      this.filteredProducts = [...this.products].sort((a, b) => this.getProductReviews(b.id).length - this.getProductReviews(a.id).length);
    }
    console.log(this.filteredProducts)
  }


  // Méthode pour obtenir le texte dynamique à afficher pour le tri et les filtres
  getFilterText(): string {
    const sortText = this.selectedSort === 'popularity' ? 'Most popular' : 'Must on trending';

    return `${sortText}`;
  }
}
