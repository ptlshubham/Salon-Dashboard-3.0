import { Routes } from '@angular/router';
import { SalaryComponent } from './salary.component';


export const SalaryRoutes: Routes = [{
    path: '',
    children: [{
        path: 'salary',
        component: SalaryComponent
    }]
}];
