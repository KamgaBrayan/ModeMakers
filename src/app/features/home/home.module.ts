import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { StylistsComponent } from '../stylists/stylists.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    component: StylistsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule
  ]
})

export class HomeModule { }
