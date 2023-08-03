import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { VendorRoutes } from './vendor.routing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [VendorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(VendorRoutes),   
    FormsModule,
    NgxPaginationModule,
  ]
})
export class VendorModule { }
