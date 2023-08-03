import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';


export const EmployeeRoutes: Routes = [{
    path: '',
    children: [{
        path: 'employee',
        component: EmployeeComponent
    }]
}];
