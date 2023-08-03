import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BannersComponent } from './banners.component';
import { BannersRoutes } from './banners.routing';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(BannersRoutes),   
    FormsModule,
    NgxPaginationModule,
  ]
})
export class BannersModule { }
