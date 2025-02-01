import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from '../../shared/components/navbar/navbar.component';
import {FooterComponent} from '../../shared/components/footer/footer.component';
import {ProductService} from "../../core/service/product.service";
import {Product} from "../../shared/interfaces/product.interface";
import {CardProductComponent} from "../../shared/components/card-product/card-product.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [CommonModule, FooterComponent, CardProductComponent, RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    products: Product[] = [];
    stats = [
        { number: '10K+', label: 'Clients Satisfaits' },
        { number: '5K+', label: 'Produits' },
        { number: '50+', label: 'Stylistes' },
        { number: '24/7', label: 'Support Client' }
    ];
  constructor(private ProductService: ProductService) { }

  ngOnInit(): void {
    this.ProductService.getAllProducts().subscribe((products: Product[]) => {
      this.products = products.slice(0, 6);
    });
  }
}
