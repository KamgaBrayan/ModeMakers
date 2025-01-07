import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { ContactComponent } from './features/contact/contact.component';
import { AboutComponent } from './features/about/about.component';
import { CartComponent } from './features/cart/cart.component';
import { StylistsComponent } from './features/stylists/stylists.component';
import { GarmentComponent } from './features/garment/garment.component';
import { GarmentSpecialComponent } from './features/garment-special/garment-special.component';
import { StylistProfileComponent } from './features/stylist-profile/stylist-profile.component';
export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent },
  {path:'stylists', component : StylistsComponent},
  {path: 'stylists/:id',component: StylistProfileComponent},
  {path: 'garment/:id',component: GarmentComponent},
  {path: 'garment-special/:id',component: GarmentSpecialComponent},
  { path: '**', component: NotFoundComponent }
];
