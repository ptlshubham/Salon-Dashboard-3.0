import { Routes } from '@angular/router';
import { MembershipComponent } from './membership.component';
import { PurchsedMembershipComponent } from './purchsed-membership/purchsed-membership.component';


export const MembershipRoutes: Routes = [{
    path: '',
    children: [{
        path: 'membership',
        component: MembershipComponent
    },{
        path:'purchsed-membership',
        component:PurchsedMembershipComponent
    }]
}];
