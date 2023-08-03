import { Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';


export const CustomerRoutes: Routes = [{
    path: '',
    children: [{
        path: 'customer',
        component: CustomerComponent
    }]
}];
