import { RouterModule,Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path:'explore-outfits',
    loadChildren: () =>import('./features/explore-outfits/explore-outfits.module').then(m => m.ExploreOutfitsModule)
  },
  {
    path:'outfits-details',
    loadChildren: () =>import('./features/outfits-details/outfits-details.module').then(m => m.OutfitsDetailsModule)
  },
  {
    path:'order-outfits',
    loadChildren: () =>import('./features/order-outfits/order-outfits.module').then(m => m.OrderOutfitsModule)
  },

];
