import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderOutfitsComponent } from './order-outfits.component';

const routes: Routes = [
  {
    path:'',
    component: OrderOutfitsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderOutfitsRoutingModule { }
