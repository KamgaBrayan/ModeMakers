import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { StylistsComponent } from '../stylists/stylists.component';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { StylistProfileComponent } from '../stylist-profile/stylist-profile.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { GarmentComponent } from '../garment/garment.component';
 
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'stylists',
    component: StylistsComponent
  },
  { 
    path: 'stylists/:id', 
    component: StylistProfileComponent 
  }, // Route for stylist profile
  { 
    path: 'products/:id', 
    component: ProductDetailComponent
  },
  { 
    path: 'garment/:id', 
    component: GarmentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    // FormBuilder,
    // FormGroup
  ],
  exports: [
    RouterModule,
    // FormsModule,
    // FormBuilder,
    // FormGroup
  ]
}) 

export class HomeModule { }
