import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StylistsComponent } from './stylists.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { HeroComponent } from './hero/hero.component';
import { CardComponent } from './card/card.component';
import { SidebarFilterComponent } from './sidebar-filter/sidebar-filter.component';
import { SelectSortComponent } from './select-sort/select-sort.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    // StylistsComponent,
    // NavbarComponent,
    // BreadcrumbComponent,
    // HeroComponent,
    // CardComponent,
    // SidebarFilterComponent,
    // SelectSortComponent
    // ,
    // FormsModule
    // SignupComponent,
    
  ],
  imports: [
    CommonModule,
    StylistsComponent,
    NavbarComponent,
    BreadcrumbComponent,
    HeroComponent,
    CardComponent,
    SidebarFilterComponent,
    SelectSortComponent,
    FormsModule,
    SignupComponent
  ],
  exports: [
    NavbarComponent,
    BreadcrumbComponent,
    HeroComponent,
    CardComponent,
    SidebarFilterComponent,
    SelectSortComponent,
    SignupComponent

  ]
})
export class StylistsModule { }
