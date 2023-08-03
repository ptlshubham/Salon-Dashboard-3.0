import { Routes } from '@angular/router';


import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { PasswordModule } from './password/password.module';
import { UserModule } from './userpage/user.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { ServicesModule } from './services/services.module';
import { ServicescustmModule } from './servicescustm/servicescustm.module';
import { EnquiryModule } from './enquiry/enquiry.module';
import { OfferModule } from './offer/offer.module';
import { ProductsModule } from './products/products.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ReportsModule } from './reports/reports.module';
import { DisplayProductsModule } from './display-products/display-products.module';
import { VendorModule } from './vendor/vendor.module';
import { AttandanceModule } from './attandance/attandance.module';
import { CustomerserviceModule } from './customerservice/customerservice.module';
import { MembershipModule } from './membership/membership.module';
import { BannersModule } from './banners/banners.module';
import { AuthGuard } from './guard/auth.guard';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full',
}, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
        path: '',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'password',

        loadChildren: () => import('./password/password.module').then(m => PasswordModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./userpage/user.module').then(m=>UserModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./employee/employee.module').then(m=>EmployeeModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./customer/customer.module').then(m=>CustomerModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./services/services.module').then(m=>ServicesModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./servicescustm/servicescustm.module').then(m=>ServicescustmModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./enquiry/enquiry.module').then(m=>EnquiryModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./offer/offer.module').then(m=>OfferModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./products/products.module').then(m=>ProductsModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./expenses/expenses.module').then(m=>ExpensesModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./reports/reports.module').then(m=>ReportsModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./display-products/display-products.module').then(m=>DisplayProductsModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./vendor/vendor.module').then(m=>VendorModule),
        canActivate: [AuthGuard]
    },
    {
        path:'',
        loadChildren:() => import('./attandance/attandance.module').then(m=>AttandanceModule),
        canActivate:[AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./customerservice/customerservice.module').then(m=>CustomerserviceModule),
        canActivate: [AuthGuard]
    },
    {
        path: '',
        loadChildren:() => import('./membership/membership.module').then(m=>MembershipModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'banners',
        loadChildren:() => import('./banners/banners.module').then(m=>BannersModule),
        canActivate: [AuthGuard]
    },
    ]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    }]
}
];