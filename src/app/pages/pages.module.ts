import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';


import { LoginComponent } from './login/login.component';
import { ForgotPwdComponent } from './forgot-pwd/forgot-pwd.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { LandingSelectionComponent } from './landing-selection/landing-selection.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PagesRoutes),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        LoginComponent,
        ForgotPwdComponent,
        CustomerRegisterComponent,
        LandingSelectionComponent,
       

    ]
})

export class PagesModule { }
