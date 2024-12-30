import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreOutfitsComponent } from './explore-outfits.component';

const routes: Routes = [
  {
    path:'',
    component: ExploreOutfitsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExploreOutfitsRoutingModule { }
