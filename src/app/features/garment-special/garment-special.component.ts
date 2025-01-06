import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Material, Precommand, Product, Review, Stylist } from './garment-special';
import { NavbarComponent } from '../stylists/navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProductSlideComponent } from './product-slide/product-slide.component';
import { MaterialsComponent } from './materials/materials.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';

@Component({
  selector: 'app-garment',
  imports: [
    CommonModule,
    NavbarComponent,
    BreadcrumbComponent,
    ProductSlideComponent,
    MaterialsComponent,
    PersonalInfoComponent,
    // MensurationsComponent
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
 
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const stylist_id = this.route.snapshot.paramMap.get('id')
    this.fetchStylist(stylist_id ? parseInt(stylist_id) : 0);
    this.fetchMaterials();
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
  
}
