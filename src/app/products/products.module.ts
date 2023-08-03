import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './products.component';
import { ProductRoutes } from './products.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(ProductRoutes),
    NgxPaginationModule
  ],
  exports:[
      ProductsComponent
  ]
})
export class ProductsModule { }