import { Routes } from '@angular/router';
import { EnquiryComponent } from './enquiry.component';


export const EnquiryRoutes: Routes = [{
    path: '',
    children: [{
        path: 'enquiry',
        component: EnquiryComponent
    }]
}];
