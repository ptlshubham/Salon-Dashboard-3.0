import { Routes } from '@angular/router';
import { ExpensesComponent } from './expenses.component';


export const ExpensesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'expenses',
        component: ExpensesComponent
    }]
}];
