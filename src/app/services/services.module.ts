import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicesComponent } from './services.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicesRoutes } from './services.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(ServicesRoutes)
  ]
})
export class ServicesModule { }
