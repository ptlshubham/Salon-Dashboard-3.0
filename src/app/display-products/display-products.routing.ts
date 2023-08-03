import { Routes } from '@angular/router';
import { DisplayProductsComponent } from './display-products.component';
import { OrderslistComponent } from './orderslist/orderslist.component';


export const DisplayProductRoutes: Routes = [{
    path: '',
    children: [{
        path: 'display-products',
        component: DisplayProductsComponent
    },
    {
        path: 'orderslist',
        component: OrderslistComponent
    }
]
}];