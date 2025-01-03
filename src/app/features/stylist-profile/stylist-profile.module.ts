import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StylistProfileComponent } from './stylist-profile.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DescriptionComponent } from './description/description.component';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from './calendar/calendar.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { SignupComponent } from '../stylists/signup/signup.component';


@NgModule({
    declarations: [
        // StylistProfileComponent,
        // BreadcrumbComponent,
        // DescriptionComponent,
        // FormsModule,
        // CalendarComponent,
        // ReviewsComponent 
    ],
    imports: [
        CommonModule,
        RouterModule, // Ensure this is included
        BreadcrumbComponent,
        DescriptionComponent,
        FormsModule,
        CalendarComponent,
        ReviewsComponent,
        SignupComponent
      ], 
      exports: [
          BreadcrumbComponent ,
          DescriptionComponent,
          CalendarComponent,
          ReviewsComponent,
          SignupComponent 
      ]
})

export class StylistProfileModule { }
