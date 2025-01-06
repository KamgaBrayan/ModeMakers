import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Material, Product, Review, Stylist } from './garment-special';
import { NavbarComponent } from '../stylists/navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductSlideComponent } from './product-slide/product-slide.component';
import { MaterialsComponent } from './materials/materials.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
// import { MensurationsComponent } from './mensurations/mensurations.component';
import { UserReviewsComponent } from './user-reviews/user-reviews.component';

@Component({
  selector: 'app-garment',
  imports: [
    CommonModule,
    NavbarComponent,
    BreadcrumbComponent,
    ProductSlideComponent,
    MaterialsComponent,
    PersonalInfoComponent,
    UserReviewsComponent,
    // MensurationsComponent
],
  templateUrl: './garment-special.component.html',
  styleUrls: ['./garment-special.component.css']
}) 
export class GarmentSpecialComponent {
  stylist!: Stylist;
  product!: Product; // Initialize the product
  materials: Material[] = [];
  reviews: Review[] = [];
  rating: number = 0;
  images: string[] = [];
 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.fetchProductById(id)
      .then(() => {
        // Appeler fetchMaterials après avoir récupéré le produit
        this.fetchMaterials();
      })
      .catch(error => {
        console.error("Initialization failed:", error);
      });
      
      this.fetchReviews();
    
  }
  

  fetchProductById(id: string | null): Promise<void> {
    return fetch('/datas/products.json')
      .then(response => response.json())
      .then((products: Product[]) => {
        const product = products.find(product => product.id === Number(id));
        if (product) {
          this.product = product;
          this.images = product.photos;
          this.fetchStylist(product.stylist.id);
          return; // Résoudre la promesse après l'assignation
        } else {
          console.error("Product not found");
          throw new Error("Product not found");
        }
      })
      .catch(error => {
        console.error("Error fetching product:", error);
        throw error;
      });
  }
  

  fetchStylist(stylistId: number) {
    fetch('/datas/stylists.json')
      .then(response => response.json())
      .then((stylists: Stylist[]) => {
        const stylist = stylists.find(s => s.id === stylistId);
        if (stylist) {
          this.stylist = stylist;
        } else {
          console.error("Stylist not found");
        }
      })
      .catch(error => {
        console.error("Error fetching stylist:", error);
      });
  }

  fetchMaterials() {
    if (!this.product) {
      console.error("Product not loaded, cannot fetch materials.");
      return;
    } 
  
    fetch('/datas/materials.json')
      .then(response => response.json())
      .then((materials: Material[]) => {
        this.materials = materials.filter(material =>
          this.product.material.some(prodMaterial => prodMaterial.id === material.id)
        );
        // console.log(this.materials); // Log to confirm the filtered materials
      })
      .catch(error => {
        console.error("Error fetching materials:", error);
      });
  }

  fetchReviews() {
    let reviews_data = [];
    fetch('/datas/reviews.json') // Adjust the path as necessary
      .then(response => response.json())
      .then((data: Review[]) => {
        reviews_data = data;
          for (let review of reviews_data){
            if(review.product.product_id === this.product.id){
              this.reviews.push(review); // Add the review to the array=
            }
          }
          this.rating = this.reviews.reduce((acc, review) => acc + review.product.product_note, 0) / this.reviews.length;
          // console.log(this.reviews);
        
         // Assign the fetched reviews to the component's array
      })
      .catch(error => {
        console.error("Error fetching reviews:", error);
      });
  }
  
}
