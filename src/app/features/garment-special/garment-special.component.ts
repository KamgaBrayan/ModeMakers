import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductSlideSpecialComponent } from './product-slide-garment/product-slide-garment.component';
import { SignupComponent } from "../../shared/components/signup/signup.component";
import { UserReviewsComponent } from "../../shared/components/user-reviews/user-reviews.component";
import { MaterialsComponent } from '../../shared/components/materials/materials.component';
import { Stylist } from '../../shared/models/stylist.interface';
import { Precommand } from '../../shared/models/precommand.interface';
import { Material, ReduceMaterial } from '../../shared/models/material.interface';
import { Measure } from '../../shared/models/measure.interface';
import { PersonalInfoComponent } from '../../shared/components/personal-info/personal-info.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-garment',
  imports: [
    NavbarComponent,
    CommonModule,
    BreadcrumbComponent,
    ProductSlideSpecialComponent,
    MaterialsComponent,
    PersonalInfoComponent, 
    SignupComponent,
    UserReviewsComponent
],
  templateUrl: './garment-special.component.html',
  styleUrls: ['./garment-special.component.css']
}) 
export class GarmentSpecialComponent {
  stylist!: Stylist;
  precommand: Precommand = { photos: [], name: '' };
  materials: Material[] = [];
  rating: number = 0;
  images: string[] = [];
  measures: Measure[] = [];

  receivedPersonnalInfo: any = null;
  selectedMaterials: ReduceMaterial[] = [];
  
 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const stylist_id = this.route.snapshot.paramMap.get('id')
    this.fetchStylist(stylist_id ? parseInt(stylist_id) : 0);
    this.fetchMaterials();
    this.fetchMeasures();
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
    fetch('/datas/materials.json')
      .then(response => response.json())
      .then((materials: Material[]) => {
        this.materials = materials;
      })
      .catch(error => {
        console.error("Error fetching materials:", error);
      });
  }
  fetchMeasures() {
    fetch('/datas/measures.json')
      .then(response => response.json())
      .then((measures: Measure[]) => {
          this.measures = measures;
      })
      .catch(error => {
        console.error("Error fetching stylist:", error);
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
  handlePrecommandChange(updatedPrecommand: Precommand): void {
    console.log('Received precommand from child:', updatedPrecommand);
    this.precommand = updatedPrecommand;
  }
  
  
}
