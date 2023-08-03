import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryComponent } from './salary.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SalaryRoutes } from './salary.routing';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [SalaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(SalaryRoutes),
    NgxPaginationModule,
  ]
})
export class SalaryModule { }
