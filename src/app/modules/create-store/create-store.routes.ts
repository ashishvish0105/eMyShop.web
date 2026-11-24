import { Routes } from '@angular/router';
import { CreateStoreLeadingComponent } from './components/create-store-leading/create-store-leading.component';
import { CreateStoreComponent } from './create-store.component';
import { RegistrationModalComponent } from './components/registration-modal/registration-modal.component';
import { AddProductInStoreComponent } from './components/add-product-in-store/add-product-in-store.component';
import { StorePaymentIntegrateComponent } from './components/store-payment-integrate/store-payment-integrate.component';
import { ReviewStoreComponent } from './components/review-store/review-store.component';
import { PreviewStoreComponent } from './components/preview-store/preview-store.component';

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
      },
      {
        path:'create',
        component:RegistrationModalComponent
      },
      {
        path:'add-product',
        component:AddProductInStoreComponent
      },
      {
        path:'add-payment',
        component:StorePaymentIntegrateComponent
      },
      {
        path:'review-store',
        component:ReviewStoreComponent
      },
      {
        path:'preview-store',
        component:PreviewStoreComponent
      }

    ]
  }
];
