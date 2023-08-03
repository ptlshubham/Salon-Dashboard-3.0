import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from './expenses.component';
import { ExpensesRoutes } from './expenses.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [ExpensesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ExpensesRoutes),
    NgxPaginationModule,
    NgbModule,
  ]
})
export class ExpensesModule { }
