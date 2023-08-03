import { Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';


export const VendorRoutes: Routes = [{
    path: '',
    children: [{
        path: 'vendor',
        component: VendorComponent
    }]
}];
