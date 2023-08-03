import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AgmCoreModule
} from '@agm/core';
import { DashboardComponent } from './dashboard.component';

import { DashboardRoutes } from './dashboard.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'app/material/material.module';
import { CustomerModule } from 'app/customer/customer.module';
import { CustomerComponent } from 'app/customer/customer.component';
import { OfferComponent } from 'app/offer/offer.component';
import { OfferModule } from 'app/offer/offer.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    FormsModule,
    MaterialModule,
    NgxPaginationModule,
    OfferModule,
    CustomerModule,
    MaterialModule,
    NgbModule,
    NgxStarRatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [DashboardComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    CustomerComponent,
    OfferComponent
  ]
})

export class DashboardModule { }
