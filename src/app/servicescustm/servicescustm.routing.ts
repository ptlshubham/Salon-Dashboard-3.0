import { Routes } from '@angular/router';
import { ServicescustmComponent } from './servicescustm.component';


export const ServicescustmRoutes: Routes = [{
    path: '',
    children: [{
        path: 'servicescustm',
        component: ServicescustmComponent
    }]
}];
