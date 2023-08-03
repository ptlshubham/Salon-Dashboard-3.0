import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicescustmComponent } from './servicescustm.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ServicescustmRoutes } from './servicescustm.routing';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ServicescustmComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(ServicescustmRoutes)
  ]
})
export class ServicescustmModule { }
