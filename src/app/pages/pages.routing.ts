import { Routes } from '@angular/router';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { LandingSelectionComponent } from './landing-selection/landing-selection.component';
import { LoginComponent } from './login/login.component';



export const PagesRoutes: Routes = [{
    path: '',
    children: [{
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'forgotpwd',
        component: ForgotPwdComponent
    },
    {
        path: 'customer-register',
        component: CustomerRegisterComponent
        
    },
    {
        path: 'landing-selection',
        component: LandingSelectionComponent
        
    },
   
    ]
}];
