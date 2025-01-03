import { Routes } from '@angular/router';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { TestComponent } from './features/test/test.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'test', component: TestComponent}
];
