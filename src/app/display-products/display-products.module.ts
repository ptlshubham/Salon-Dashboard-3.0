import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayProductsComponent } from './display-products.component';
import { RouterModule } from '@angular/router';
import { DisplayProductRoutes } from './display-products.routing';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { OrderslistComponent } from './orderslist/orderslist.component';


@NgModule({
  declarations: [DisplayProductsComponent, OrderslistComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild(DisplayProductRoutes),
    NgbModule,
    FormsModule
  ]
})
export class DisplayProductsModule { }
