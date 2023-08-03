import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferComponent } from './offer.component';
import { OfferRoutes } from './offer.routing';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'app/material/material.module';
@NgModule({
  declarations: [OfferComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AngularMultiSelectModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(OfferRoutes)
  ],
  exports:[
    OfferComponent
  ]
})
export class OfferModule { }
