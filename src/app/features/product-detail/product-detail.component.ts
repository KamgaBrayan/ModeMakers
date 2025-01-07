import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { NavbarComponent } from "../../shared/components/navbar/navbar.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})

export class ProductDetailComponent implements OnInit {
  product!: Product;
  selectedImage: string = '';
  currentImageIndex: number = 0;
  isLoading: boolean = true;
  currentWeek: string[] = ['LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.', 'DIM.'];
  selectedMaterial: number = 0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.loadProductData();
    console.log('Produit chargé:', this.product);
  }

  loadProductData(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(Number(id)).subscribe(product => {
        this.product = product;
        this.selectedImage = this.product.images[0];
        this.currentImageIndex = 0;
        this.isLoading = false;
      }, error => {
        console.error('Erreur lors de la récupération des données du produit:', error);
        this.isLoading = false;
      });
    }
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    this.selectedImage = this.product.images[this.currentImageIndex];
  }

  previousImage() {
    this.currentImageIndex = this.currentImageIndex === 0 ?
      this.product.images.length - 1 : this.currentImageIndex - 1;
    this.selectedImage = this.product.images[this.currentImageIndex];
  }

  selectImage(image: string, index: number) {
    this.selectedImage = image;
    this.currentImageIndex = index;
  }


  getPlanningData() {
    const weeks = 4;
    const days = this.currentWeek.length;
    return Array(weeks).fill(null).map(() =>
      Array(days).fill(null).map((_, index) => index === days - 1 ? 'unavailable' : 'available')
    );
  }

  nextMaterial() {
    this.selectedMaterial = (this.selectedMaterial + 1) % this.product.materials.length;
  }

  previousMaterial() {
    this.selectedMaterial = this.selectedMaterial === 0 ?
      this.product.materials.length - 1 : this.selectedMaterial - 1;
  }
}
