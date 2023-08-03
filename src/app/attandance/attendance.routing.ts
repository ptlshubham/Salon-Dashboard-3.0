import { Routes } from '@angular/router';
import { AttandanceComponent } from './attandance.component';


export const AttandanceRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'attandance',
      component: AttandanceComponent
  }]
}];