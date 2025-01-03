import { ProductService } from './../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { Product } from '../../shared/models/product.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [NavbarComponent, FooterComponent, CommonModule, NgxPaginationModule, RouterModule ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true
})

export class ProductsComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  constructor(private http: HttpClient, private ProductService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ProductService.getProducts().subscribe(
      products => this.products = products
    );
  }

  toggleFavorite(product: Product): void {
    product.isFavorite = !product.isFavorite;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
