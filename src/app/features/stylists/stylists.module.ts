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

@NgModule({
  declarations: [
    StylistsComponent,
    NavbarComponent,
    BreadcrumbComponent,
    HeroComponent,
    CardComponent,
    SidebarFilterComponent,
    SelectSortComponent,
    FormsModule
    
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
    FormsModule
    
  ],
  exports: [
    NavbarComponent,
    BreadcrumbComponent,
    HeroComponent,
    CardComponent,
    SidebarFilterComponent,
    SelectSortComponent

  ]
})
export class StylistsModule { }
