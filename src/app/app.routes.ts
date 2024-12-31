import { Routes } from '@angular/router';
import { StylistsComponent } from './features/stylists/stylists.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'stylists',
    component : StylistsComponent,
  }
];
