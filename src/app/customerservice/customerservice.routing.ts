import { Routes } from '@angular/router';
import { CustomerserviceComponent } from './customerservice.component';


export const CustomerserviceRoutes: Routes = [{
    path: '',
    children: [{
        path: 'customerservice',
        component: CustomerserviceComponent
    }]
}];
