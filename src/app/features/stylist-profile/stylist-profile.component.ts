import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DescriptionComponent } from './description/description.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { SelectSortComponent } from './select-sort/select-sort.component';
import { AvailabilityComponent } from './availability/availability.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { Product, Stylist } from './stylist-profile.model';
import { NavbarComponent } from '../stylists/navbar/navbar.component';
import { SignupComponent } from "../stylists/signup/signup.component";

@Component({
  selector: 'app-stylist-profile',
  imports: [
    CommonModule,
    NavbarComponent,
    BreadcrumbComponent,
    DescriptionComponent,
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
  stylist!: Stylist;
  products: Product[] = []; // Initialize the products array
  
  selectedSort: string = 'popularity';  // Par défaut, tri par popularité
  filteredProducts: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchStylistById(id);
    this.fetchProducts();
  }

  fetchStylistById(id: string | null) {
    // Charge les stylistes depuis le fichier JSON
    fetch('/datas/stylists.json')
      .then(response => response.json())
      .then((stylists: Stylist[]) => {
        // Trouver le styliste par son ID
        const stylist = stylists.find(stylist => stylist.id === Number(id));
        if (stylist) {
          this.stylist = stylist;
        } else {
          console.error("Stylist not found");
        }
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du styliste :", error);
      });
  }

  fetchProducts() {
    // Fetch products from the JSON file
    fetch('/datas/products.json')
      .then(response => response.json())
      .then((data: Product[]) => {
        // Filter products by stylist ID
        // console.log(data);
        this.products = data.filter(product => product.stylist.id === this.stylist.id);
        console.log(this.products[1].photos[0])
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }
  
  applySort(sortType: string) {
    this.selectedSort = sortType;
    if (sortType === 'popularity') {
      this.filteredProducts = [...this.products].sort((a, b) => b.rating - a.rating);
      console.log(this.filteredProducts)
    } else if (sortType === 'trending') {
      this.filteredProducts = [...this.products].sort((a, b) => b.views - a.views);
      console.log(this.filteredProducts)
    }
  }

  // Méthode pour obtenir le texte dynamique à afficher pour le tri et les filtres
  getFilterText(): string {
    const sortText = this.selectedSort === 'popularity' ? 'Les plus populaires' : 'Les plus tendances';

    return `${sortText}`;
  }
}
