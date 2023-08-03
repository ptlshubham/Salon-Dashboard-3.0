import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerRoutes } from './customer.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'app/material/material.module';



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(CustomerRoutes)
  ],
  exports:[
    CustomerComponent
  ]
})
export class CustomerModule { }
