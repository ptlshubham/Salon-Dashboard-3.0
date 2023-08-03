import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'app/material/material.module';
import { NavbarRoutes } from './navbar.routing';
@NgModule({
    imports: [ 
        RouterModule,
        CommonModule,  
        FormsModule,
        RouterModule.forChild(NavbarRoutes),
        MaterialModule
    ],
    declarations: [ NavbarComponent ],
    exports: [ NavbarComponent ]
})

export class NavbarModule {}
