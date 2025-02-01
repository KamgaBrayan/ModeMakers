import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PersonalInfoComponent } from '../../shared/components/personal-info/personal-info.component';
import { UserReviewsComponent } from '../../shared/components/user-reviews/user-reviews.component';
import { SignupComponent } from "../../shared/components/signup/signup.component";
import { ReduceMaterial } from '../../shared/models/material.interface';
import { MaterialsComponent } from '../../shared/components/materials/materials.component';
import { ProductSlideCommandComponent } from './product-slide-command/product-slide-command.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { StylistUser } from '../../shared/interfaces/stylistUser.interface';
import { Product } from '../../shared/interfaces/product.interface';
import { Review } from '../../shared/interfaces/review.interface';
import { Measurement } from '../../shared/interfaces/measurement.interface';
import { ProductService } from '../../core/service/product.service';
import { ReviewService } from '../../core/service/review.service';
import { Material } from '../../shared/interfaces/material.interface';
import { Measure } from '../../shared/models/measure.interface';

@Component({
  selector: 'app-garment',
  imports: [
    NavbarComponent, 
    CommonModule,
    BreadcrumbComponent,
    ProductSlideCommandComponent,
    MaterialsComponent,
    PersonalInfoComponent,
    UserReviewsComponent,
    SignupComponent
],
  templateUrl: './garment.component.html',
  styleUrls: ['./garment.component.css']
}) 
export class GarmentComponent {
  stylist!: StylistUser;
  product!: Product; // Initialize the product
  materials: Material[] = [];
  reviews: Review[] = [];
  rating: number = 0;
  images: string[] = [];
  measures: Measure[] = [];
  receivedPersonnalInfo: any = null;
  selectedMaterials: ReduceMaterial[] = [];
 

   constructor(private route: ActivatedRoute, 
              private productService: ProductService, 
              private reviewService: ReviewService) { }
  
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(Number(id)).subscribe(product => {
      this.product = product;
      this.stylist= product.user;
      this.images= product.images;
      // console.log(this.images)
      this.materials = product.materials;
      this.reviewService.getAllReviews().subscribe(reviews => {
        for(let review of reviews){
          if(review.product.id === this.product.id){
            this.reviews.push(review)
          }
        }
      });
    });
 
  }
  handleFormSubmit(data: any) {
    console.log('Données reçues du formulaire enfant :', data);
    this.receivedPersonnalInfo= data;
  }

  onSelectedMaterialsChange(selected: ReduceMaterial[]): void {
    this.selectedMaterials = selected;
    console.log('Materials selected:', selected);
  }
  
}
