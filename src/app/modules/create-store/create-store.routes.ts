import { Routes } from '@angular/router';
import { CreateStoreLeadingComponent } from './components/create-store-leading/create-store-leading.component';
import { CreateStoreComponent } from './create-store.component';

export const createStoreRoutes: Routes = [
  {
    path:'',
    component:CreateStoreComponent,
    children:[
      {
        path:'',
        redirectTo:'leading',
        pathMatch:'full'
      },
      {
        path:'leading',
        component:CreateStoreLeadingComponent
      }
    ]
  }
];
