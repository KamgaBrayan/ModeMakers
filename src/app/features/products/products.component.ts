import { ProductService } from '../../core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Product } from '../../shared/interfaces/product.interface';
import { FormsModule } from "@angular/forms";
import { CardProductComponent } from "../../shared/components/card-product/card-product.component";
import { ApiResponse } from '../../shared/interfaces/apiRequest.interface';

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, FooterComponent, CommonModule, NgxPaginationModule, RouterModule,
    FormsModule, CardProductComponent],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  loading = false;
  error = '';

  uniqueCategories: string[] = [];
  uniqueGenders: string[] = [];
  uniqueAges: string[] = [];
  priceRange = { min: 0, max: 0 };

  selectedFilters = {
    categories: {} as { [key: string]: boolean },
    genders: {} as { [key: string]: boolean },
    ages: {} as { [key: string]: boolean },
    ratings: {} as { [key: number]: boolean },
    price: 0
  };

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (response: ApiResponse<Product[]>) => {
        if (response.data) {
          this.products = response.data;
          this.filteredProducts = response.data;
          this.loading = false;
          this.initializeFilters();
        }
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  initializeFilters(): void {
    // Extract unique values and initialize filters
    this.uniqueCategories = [...new Set(this.products.map(p => p.category))];
    this.uniqueGenders = [...new Set(this.products.map(p => p.gender))];
    this.uniqueAges = [...new Set(this.products.map(p => p.age))];

    // Initialize price range
    const prices = this.products.map(p => p.delivery[0].price);
    this.priceRange.min = Math.min(...prices);
    this.priceRange.max = Math.max(...prices);
    this.selectedFilters.price = this.priceRange.max;
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Check if any filter is selected
      const categorySelected = Object.values(this.selectedFilters.categories).some(v => v);
      const genderSelected = Object.values(this.selectedFilters.genders).some(v => v);
      const ageSelected = Object.values(this.selectedFilters.ages).some(v => v);
      const ratingSelected = Object.values(this.selectedFilters.ratings).some(v => v);

      // Apply filters only if they are selected
      const categoryMatch = !categorySelected || this.selectedFilters.categories[product.category];
      const genderMatch = !genderSelected || this.selectedFilters.genders[product.gender];
      const ageMatch = !ageSelected || this.selectedFilters.ages[product.age];
      const priceMatch = product.delivery[0].price <= this.selectedFilters.price;
      const ratingMatch = !ratingSelected || this.selectedFilters.ratings[Math.floor(product.rating)];

      return categoryMatch && genderMatch && ageMatch && priceMatch && ratingMatch;
    });

    this.currentPage = 1;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
