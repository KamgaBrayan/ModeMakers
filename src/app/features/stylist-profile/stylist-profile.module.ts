import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StylistProfileComponent } from './stylist-profile.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DescriptionComponent } from './description/description.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { ReviewsComponent } from './reviews/reviews.component';


@NgModule({
    declarations: [
        StylistProfileComponent,
        NavbarComponent,
        BreadcrumbComponent,
        DescriptionComponent,
        FormsModule,
        CalendarComponent,
        ReviewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule, // Ensure this is included
        NavbarComponent,
        BreadcrumbComponent,
        DescriptionComponent,
        FormsModule,
        CalendarComponent,
        ReviewsComponent
      ], 
      exports: [
          NavbarComponent,
          BreadcrumbComponent ,
          DescriptionComponent,
          CalendarComponent,
          ReviewsComponent
      ]
})

export class StylistProfileModule { }
