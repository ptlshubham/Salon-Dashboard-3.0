import { Routes } from '@angular/router';
import { OfferComponent } from './offer.component';


export const OfferRoutes: Routes = [{
    path: '',
    children: [{
        path: 'offer',
        component: OfferComponent
    }]
}];
