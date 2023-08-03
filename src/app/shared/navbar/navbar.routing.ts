import { Routes } from '@angular/router';
import { NavbarComponent } from './navbar.component';


export const NavbarRoutes: Routes = [{
    path: '',
    children: [{
        path: 'navbar-cart',
        component: NavbarComponent
    }]
}];