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
import {HomeComponent} from './features/home/home.component';
import {DashproductsComponent} from './features/Dashproducts/Dashproducts.component';
import {CartsComponent} from "./features/carts/carts.component";
import {OutfitsDetailsComponent} from "./features/outfits-details/outfits-details.component";
import {RegisterComponent} from "./features/register/register.component";
import {LoginComponent} from "./features/login/login.component";
export const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: OutfitsDetailsComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartsComponent },
  {path:'stylists', component : StylistsComponent},
  {path: 'stylists/:id',component: StylistProfileComponent},
  {path: 'garment/:id',component: GarmentComponent},
  {path: 'Dashproducts',component: DashproductsComponent},
  {path: 'garment-special/:id',component: GarmentSpecialComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'login',component: LoginComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
  },
  {
    path: 'precommands',
    loadChildren: () => import('./features/precommands/precommands.routes').then(m => m.PRECOMMANDS_ROUTES)
  },
  {
    path: 'precommands/:id',
    loadComponent: () => import('./features/precommands/precommand-detail/precommand-detail.component')
      .then(m => m.PrecommandDetailComponent),
  },
  {
    path: 'products',
    loadChildren: () => import('./features/Dashproducts/products.routes').then(m => m.PRODUCTS_ROUTES)
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.routes').then(m => m.CUSTOMERS_ROUTES)
  },
  {
    path: 'commands',
    loadChildren: () => import('./features/commands/commands.routes').then(m => m.COMMANDS_ROUTES)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./features/user-dashboard/user-dashboard.module').then(m => m.UserDashboardModule)
  },
  {
    path: 'settings',
    loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent),
  },
  { path: '**', component: NotFoundComponent }
];
