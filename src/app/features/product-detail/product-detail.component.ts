import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Stylist } from '../stylists/stylist.model';
import { Product } from './product-detail.model';
import { NavbarComponent } from '../stylists/navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductSlideComponent } from './product-slide/product-slide.component';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, NavbarComponent, BreadcrumbComponent, ProductSlideComponent],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  stylist!: Stylist | undefined;
  product!: Product; // Initialize the product
  
  currentImageIndex: number = 0;
  images: string[] = [];


  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchProductById(id);
      // Supposons que les images soient chargées depuis un modèle ou un service
      this.images = this.product.photos; // Remplacez par votre source d'images
  }
 
  fetchProductById(id: string | null) {
    // Fetch products from the JSON file
    fetch('/datas/products.json')
      .then(response => response.json())
      .then((products: Product[]) => {
        // Find the product by its ID
        const product = products.find(product => product.id === Number(id));
        if (product) {
          this.product = product;
          console.log(product)
          this.fetchStylist(product.stylist.id); // Fetch stylist using the product's stylist ID
        } else {
          console.error("Product not found");
        }
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }

  fetchStylist(stylistId: number) {
    // Fetch stylists from the JSON file
    fetch('/datas/stylists.json')
      .then(response => response.json())
      .then((stylists: Stylist[]) => {
        // Find the stylist by their ID
        this.stylist = stylists.find(stylist => stylist.id === stylistId);
        if (!this.stylist) {
          console.error("Stylist not found");
        }
        console.log(this.stylist)
      })
      .catch(error => {
        console.error("Error fetching stylist:", error);
      });
  }
}