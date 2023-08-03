import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { RouterModule } from '@angular/router';
import { EmployeeRoutes } from './employee.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'app/material.module';



@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NgxPaginationModule,
    MaterialModule,
    AngularMultiSelectModule,
    ReactiveFormsModule,
    RouterModule.forChild(EmployeeRoutes)
  ]
})
export class EmployeeModule { }
