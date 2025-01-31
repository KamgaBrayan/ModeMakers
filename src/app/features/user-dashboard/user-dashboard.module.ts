import { NgModule } from '@angular/core';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule

  ]

})
export class UserDashboardModule { }

