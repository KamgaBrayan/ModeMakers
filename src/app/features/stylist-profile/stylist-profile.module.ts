import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StylistProfileComponent } from './stylist-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DescriptionComponent } from './description/description.component';


@NgModule({
    declarations: [
        StylistProfileComponent,
        NavbarComponent,
        BreadcrumbComponent,
        DescriptionComponent
    ],
    imports: [
        CommonModule,
        RouterModule, // Ensure this is included
        NavbarComponent,
        BreadcrumbComponent,
        DescriptionComponent
      ], 
      exports: [
          NavbarComponent,
          BreadcrumbComponent ,
          DescriptionComponent
      ]
})

export class StylistProfileModule { }
