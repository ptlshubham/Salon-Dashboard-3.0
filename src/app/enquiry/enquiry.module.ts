import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnquiryComponent } from './enquiry.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EnquiryRoutes } from './enquiry.routing';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [EnquiryComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(EnquiryRoutes),
    NgxPaginationModule,
  ]
})
export class EnquiryModule { }
