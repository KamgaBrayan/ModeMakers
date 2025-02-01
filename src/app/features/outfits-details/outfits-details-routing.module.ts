import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutfitsDetailsComponent } from './outfits-details.component';

const routes: Routes = [
  {
    path:'',
    component: OutfitsDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutfitsDetailsRoutingModule { }
