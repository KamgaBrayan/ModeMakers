import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { StylistsComponent } from '../stylists/stylists.component';
import { FormsModule } from '@angular/forms';
import { StylistProfileComponent } from '../stylist-profile/stylist-profile.component';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

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
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule
  ],
  exports: [RouterModule]
})

export class HomeModule { }
