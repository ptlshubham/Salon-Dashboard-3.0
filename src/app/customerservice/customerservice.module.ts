import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerserviceComponent } from './customerservice.component';
import { CustomerserviceRoutes } from './customerservice.routing';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [CustomerserviceComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(CustomerserviceRoutes)
  ],
  exports:[
    CustomerserviceComponent
  ]
})
export class CustomerserviceModule { }
