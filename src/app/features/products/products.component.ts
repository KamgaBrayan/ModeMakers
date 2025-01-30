import { ProductService } from '../../core/service/product.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterModule } from '@angular/router';
import {Product} from '../../shared/interfaces/product.interface';
import { ShoppingCart } from 'lucide-react';

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
  itemsPerPage: number = 9;

  constructor(private http: HttpClient, private ProductService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(): void {
    this.ProductService.getAllProducts().subscribe(
      products => this.products = products
    );
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
