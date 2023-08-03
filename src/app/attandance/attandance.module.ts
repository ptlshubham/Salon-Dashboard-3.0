import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttandanceComponent } from './attandance.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AttandanceRoutes } from './attendance.routing';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [AttandanceComponent],
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    NgxPaginationModule,
    RouterModule.forChild(AttandanceRoutes),
  ]
})
export class AttandanceModule { }
