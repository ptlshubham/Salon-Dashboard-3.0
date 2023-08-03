import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { FormsModule } from '@angular/forms';
import { ReportsRoutes } from './reports.routing';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ReportsComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ReportsRoutes),
    NgxPaginationModule,
    NgbModule
  ]
})
export class ReportsModule { }
