import { Routes } from '@angular/router';
import { ProductsComponent } from './products.component';


export const ProductRoutes: Routes = [{
    path: '',
    children: [{
        path: 'products',
        component: ProductsComponent
    }]
}];
